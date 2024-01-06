import Image from 'next/image'
import React from 'react'
import { readBlog } from "@/lib/actions/blog";
import Link from 'next/link';
export default async function HeadContent({ a }: { a?: string }) {
    const { data: blogs } = await readBlog();


    return (
        <div className={a}>
            {blogs?.length! > 0 && (<div className="rounded-sm overflow-hidden bg-white shadow-sm">
                <Link href={`/blog/${blogs![0].id}`} className="block rounded-md overflow-hidden">
                    <Image src={blogs![0].image_url}
                        className="w-full h-96 object-cover transform hover:scale-110 transition duration-500" alt='a' width={500} height={500} />
                </Link>
                <div className="p-4 pb-5">
                    <a href="view.html">
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
    )
}
