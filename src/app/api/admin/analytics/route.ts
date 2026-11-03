import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail } from "@/lib/api";

// Plausible API integration
export async function GET(req: NextRequest) {
  try {
    // Check if Plausible is enabled
    const plausibleEnabled = await prisma.setting.findUnique({ where: { key: "plausible_enabled" } });
    const plausibleApiUrl = await prisma.setting.findUnique({ where: { key: "plausible_api_url" } });

    if (!plausibleEnabled || plausibleEnabled.value !== "true") {
      return ok({ enabled: false, stats: null });
    }

    const apiUrl = plausibleApiUrl?.value || "https://plausible.io";
    const searchParams = new URLSearchParams(req.url);
    const startDate = searchParams.get("start") || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const endDate = searchParams.get("end") || new Date().toISOString().split("T")[0];
    const event = searchParams.get("event");

    let url = `${apiUrl}/api/v1/stats`;
    const params: string[] = [];
    if (startDate) params.push(`start=${startDate}`);
    if (endDate) params.push(`end=${endDate}`);
    if (event) params.push(`event=${event}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const res = await fetch(url, {
      headers: {
        "X-Plausible-Domain": "amatisberry.ir",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Plausible API error:", res.status, text);
      return ok({ enabled: true, stats: null, error: "Plausible API error" });
    }

    const data = await res.json();

    // Transform Plausible data into nice format
    const stats = {
      enabled: true,
      pageviews: data.pageviews || 0,
      unique_visitors: data.unique_visitors || 0,
      sessions: data.sessions || 0,
      avg_time_on_site: data.avg_time_on_site || 0,
      top_pages: data.top_pages || [],
      events: data.events || [],
      bounce_rate: data.bounce_rate || 0,
      countries: data.countries || [],
      browsers: data.browsers || [],
      os: data.os || [],
    };

    return ok({ enabled: true, stats });
  } catch (error) {
    console.error("Analytics error:", error);
    return ok({ enabled: false, stats: null, error: "Failed to fetch analytics" });
  }
}