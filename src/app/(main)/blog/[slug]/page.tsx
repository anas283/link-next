import DateFormatter from "@/components/date-formatter";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

export default async function BlogContent({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-5">
        <div className='h-96 overflow-hidden rounded'>
          <Image 
            src={post.coverImage} 
            alt={post.slug}
            width={400} 
            height={350} 
            className='object-cover w-full' 
          />
        </div>
        <h1 className="text-4xl font-bold mt-10">{post.title}</h1>
        <div className="mt-10">
        <div>
          <DateFormatter dateString={post.date} />
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Linkwajo`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}