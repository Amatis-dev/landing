import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { ok, fail } from "@/lib/api";

export async function GET(req: NextRequest) {
  const requestedLang = req.nextUrl.searchParams.get("lang") || "en";
  const fallbackLangs = [requestedLang, "en", "fa", "de", "ar"].filter((l, i, a) => a.indexOf(l) === i);

  const allPosts = await prisma.blogPost.findMany({
    where: { published: true, lang: { in: fallbackLangs } },
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
      groupId: true,
    },
  });

  const postsByGroup = new Map<string, typeof allPosts[0][]>();
  for (const post of allPosts) {
    const group = post.groupId || post.slug;
    if (!postsByGroup.has(group)) postsByGroup.set(group, []);
    postsByGroup.get(group)!.push(post);
  }

  const resultPosts: typeof allPosts = [];
  for (const [, groupPosts] of postsByGroup) {
    let selectedPost: typeof groupPosts[0] | null = null;
    for (const lang of fallbackLangs) {
      const found = groupPosts.find((p) => p.lang === lang);
      if (found) {
        selectedPost = found;
        break;
      }
    }
    if (!selectedPost) selectedPost = groupPosts[0];
    if (selectedPost) resultPosts.push(selectedPost);
  }

  resultPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return ok({ posts: resultPosts });
}
export const dynamic = "force-dynamic";

export async function POST() {
  return fail("not_found", 404);
}
