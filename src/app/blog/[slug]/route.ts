import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { renderPostPage } from "@/lib/blog-page";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: { slug, published: true },
  });
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(renderPostPage(post), {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
export const dynamic = "force-dynamic";
