import React from "react";
import { Button } from "@/components/ui/button";
import { readBlog } from "@/lib/actions/blog";
import Link from "next/link";
import Image from "next/image";
import HeadContent from "@/components/new/HeadContent";

export default async function Page() {
  const { data: blogs } = await readBlog();

  return (
    <div >
      <HeadContent a="w-full p-0" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-2 xl:p-2">
        {blogs?.map((blog, index) => {
          if (index === 0) {
            return null;
          }
          return <Link href={`/blog/${blog.id}`} key={index} className="w-full border rounded-md
      bg-gradient-dark p-3 hover:ring-2 ring-gray-300 transtition-all cursor-pointer space-y-3
      ">
            <div className="relative h-48 md:h-64 xl:h-64">
              <Image
                priority
                src={blog?.image_url}
                alt="cover" fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="space-y-2">
              {new Date(blog.created_at).toDateString()}
              <h1 className="text-2xl font-bold">{blog.title}</h1>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}