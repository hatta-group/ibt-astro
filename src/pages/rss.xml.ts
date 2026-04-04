import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  // draft除外 & 日付の新しい順
  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'IBT（IB Tutors）ブログ',
    description: 'IB専門家庭教師IBTのブログ。IB学習法、科目攻略、大学進学情報を配信。',
    site: context.site!.toString(),
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      pubDate: new Date(post.data.date),
      link: `/blog/${post.data.slug}/`,
    })),
    customData: '<language>ja</language>',
  });
}
