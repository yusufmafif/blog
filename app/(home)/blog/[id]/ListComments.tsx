import React from 'react'
import { readBlogCommentById } from '@/lib/actions/comment'

export default async function ListComments({ blog_id }: { blog_id: string }) {

    const { data: blogs } = await readBlogCommentById(blog_id);


    return (

        <div>
            {blogs?.map((blog, index) => (
                <div key={index} className='m-8'>
                    <hr className='p-2'/>
                    <div className="flex space-x-3 justify-between">
                        <div className="">{blog.name}</div>
                        <div className="">
                            <div className="text-sm font-light text-gray-500">{new Intl.DateTimeFormat('en-US', {
                                timeZone: 'Asia/Jakarta',
                                year: 'numeric',
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                hour12: false, // Format 24 jam
                            }).format(new Date(blog.created_at!))}</div>
                        </div>
                    </div>
                    <div className="font-light p-2">{blog.comment}</div>
                </div>
            ))}
        </div>
    )
}