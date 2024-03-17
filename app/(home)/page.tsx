'use client'
import React, { useEffect, useState } from "react";
import { readBlog, readBlogbyQuery } from "@/lib/actions/blog";
import Link from "next/link";
import Image from "next/image";
import useSearchStore from '@/components/new/searchStore'

export default function Page() {
  const [blogs, setBlogs] = useState<any>([]);
  const [data, setData] = useState<any>("");
  const { searchQuery, setSearchQuery } = useSearchStore();



  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!searchQuery) {
          response = await readBlog();
        } else {
          response = await readBlogbyQuery(searchQuery);
        }
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchQuery, setSearchQuery]);




  return (
    <div >
      <div className="w-full p-0">
        {blogs?.length! > 0 && (<div className="rounded-sm overflow-hidden bg-white shadow-sm">
          <Link href={`/blog/${blogs![0].id}`} className="block rounded-md overflow-hidden">
            <Image src={blogs![0].image_url}
              className="w-full h-96 object-cover transform hover:scale-110 transition duration-500" alt='a' width={500} height={500} />
          </Link>
          <div className="p-4 pb-5">
            <a href={`/blog/${blogs![0].id}`}>
              <h2
                className="block text-2xl font-semibold text-gray-700 hover:text-black transition font-roboto">
                {blogs![0].title}
              </h2>
            </a>
            <div className="mt-3 flex space-x-4">
              <div className="flex text-gray-400 text-sm items-center">
                Blogging Tips
              </div>
              <div className="flex text-gray-600 text-sm items-center">
                {new Date(blogs![0].created_at).toDateString()}
              </div>
            </div>
          </div>
        </div>)}
      </div>


      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-2 xl:p-2">
        {blogs?.map((blog: any, index: number) => {
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