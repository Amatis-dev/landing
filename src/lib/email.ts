import nodemailer from "nodemailer";
import { getSetting } from "@/lib/settings";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
};

async function loadSmtpConfig(): Promise<SmtpConfig | null> {
  const host = (await getSetting("smtp_host")) || process.env.SMTP_HOST;
  const port = (await getSetting("smtp_port")) || process.env.SMTP_PORT;
  if (!host || !port) return null;
  const user = (await getSetting("smtp_user")) || process.env.SMTP_USER;
  const pass = (await getSetting("smtp_pass")) || process.env.SMTP_PASS;
  const secureRaw = (await getSetting("smtp_secure")) || process.env.SMTP_SECURE || "";
  const from =
    (await getSetting("mail_from")) ||
    process.env.MAIL_FROM ||
    user ||
    "hello@amatisberry.ir";
  const portNum = Number(port);
  return {
    host,
    port: portNum,
    secure: secureRaw === "true" || portNum === 465,
    user: user || undefined,
    pass: pass || undefined,
    from,
  };
}

async function loadResendConfig(): Promise<{ apiKey: string; from: string } | null> {
  const apiKey = (await getSetting("resend_api_key")) || process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const from =
    (await getSetting("mail_from")) ||
    process.env.MAIL_FROM ||
    process.env.RESEND_FROM ||
    "onboarding@resend.dev";
  return { apiKey, from };
}

export async function isEmailConfigured(): Promise<boolean> {
  return (await loadResendConfig()) !== null || (await loadSmtpConfig()) !== null;
}

async function sendViaResend(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend API error ${res.status}: ${detail}`);
  }
}

function getSmtpTransporter(cfg: SmtpConfig) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.user && cfg.pass ? { user: cfg.user, pass: cfg.pass } : undefined,
  });
}

export async function sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
  const resendCfg = await loadResendConfig();
  if (resendCfg) {
    await sendViaResend(resendCfg.apiKey, resendCfg.from, to, subject, text, html);
    return;
  }

  const smtpCfg = await loadSmtpConfig();
  if (smtpCfg) {
    const transporter = getSmtpTransporter(smtpCfg);
    await transporter.sendMail({
      from: smtpCfg.from,
      to,
      subject,
      text,
      html,
    });
    return;
  }

  throw new Error(
    "Email transport is not configured (set RESEND_API_KEY / resend_api_key in admin panel, or smtp_host / smtp_port in admin settings or SMTP_* env vars)",
  );
}

function wrapHtml(bodyHtml: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;background:#0B1120;font-family:Inter,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:28px">
    <div style="background:#ffffff;border-radius:16px;padding:32px 28px;box-shadow:0 12px 36px rgba(20,45,90,.12)">
      <div style="font-size:20px;font-weight:900;color:#12223D">Amatis</div>
      <div style="margin-top:16px;font-size:14px;color:#334155;line-height:1.9">${bodyHtml}</div>
    </div>
    <p style="margin:18px 0 0;font-size:12px;color:#94a3b8;text-align:center">© ${new Date().getFullYear()} Amatis. All rights reserved.</p>
  </div>
</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Notifies the owner inbox about a new contact form submission.
 */
export async function sendContactNotification(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const to = (await getSetting("contact_email")) || process.env.CONTACT_EMAIL || process.env.MAIL_FROM;
  if (!to) return;

  const subject = `New message from Amatis contact form — ${msg.subject || msg.name}`;
  const text =
    `Name: ${msg.name}\n` +
    `Email: ${msg.email}\n` +
    `Subject: ${msg.subject || "-"}\n\n` +
    `Message:\n${msg.message}`;

  const html =
    `<div style="font-size:18px;font-weight:900;color:#12223D">New contact form message</div>` +
    `<table style="margin-top:14px;font-size:13.5px;color:#334155;line-height:1.9">` +
    `<tr><td style="font-weight:900;color:#12223D;padding-right:12px">Name</td><td>${escapeHtml(msg.name)}</td></tr>` +
    `<tr><td style="font-weight:900;color:#12223D;padding-right:12px">Email</td><td dir="ltr">${escapeHtml(msg.email)}</td></tr>` +
    `<tr><td style="font-weight:900;color:#12223D;padding-right:12px">Subject</td><td>${escapeHtml(msg.subject || "-")}</td></tr>` +
    `</table>` +
    `<div style="margin-top:14px;padding:14px;background:#f8fafc;border-radius:10px;font-size:13.5px;color:#0f172a;line-height:1.9;white-space:pre-wrap">${escapeHtml(msg.message)}</div>`;

  await sendEmail(to, subject, text, wrapHtml(html));
}

/**
 * Sends a plain administrative / reply email (used by the admin panel).
 */
export async function sendAdminEmail(to: string, subject: string, body: string): Promise<void> {
  const html = body
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 12px;white-space:pre-wrap">${escapeHtml(p)}</p>`)
    .join("");
  await sendEmail(to, subject, body, wrapHtml(html));
}