import DateFormatter from '@/components/date-formatter';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {

  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  console.log('allPosts');
  console.log(allPosts);

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-20">

        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-center max-w-3xl mx-auto">
            Blog
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
          {allPosts.map((post, key) => {
            return (
              <Card key={key} className='overflow-hidden'>
                <Link href={`blog/` + post.slug} className='leading-7 hover:underline h-24 overflow-hidden'>
                  <Image src={post.coverImage} alt={post.slug} width={400} height={350} className='object-cover w-full' />
                </Link>
                <CardHeader className='gap-1'>
                  <CardTitle>
                    <Link href={`blog/` + post.slug} className='leading-7 hover:underline'>{post.title}</Link>
                  </CardTitle>
                  <CardDescription>
                    <DateFormatter dateString={post.date} />
                  </CardDescription>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

      </div>
    </div>
  )
}