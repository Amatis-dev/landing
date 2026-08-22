import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang");
  const posts = await prisma.blogPost.findMany({
    where: { published: true, ...(lang ? { lang } : {}) },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      tag: true,
      lang: true,
      readMinutes: true,
      publishedAt: true,
    },
  });
  return ok({ posts });
}
export const dynamic = "force-dynamic";

export async function POST() {
  return fail("not_found", 404);
}
