import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      tag: true,
      lang: true,
      readMinutes: true,
      publishedAt: true,
    },
  });
  if (!post) return fail("not_found", 404);
  return ok({ post });
}
export const dynamic = "force-dynamic";
