"use client";

import BlogForm from '@/app/dashboard/components/BlogForm'
import { BlogFormSchemaType } from '@/app/dashboard/schema'
import { IBlogDetail } from '@/lib/types'
import React from 'react'
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import {updateBlogDetailById} from "@/lib/actions/blog"


export default function EditForm({ blog }: { blog: IBlogDetail }) {
const router = useRouter()


    const handleEdit = async (data: BlogFormSchemaType) => {
        const result = await updateBlogDetailById(blog?.id!, data)
        const { error } = JSON.parse(result)
    
        if (error?.message) {
          toast({
            title: "Fail to create Blog",
            description: (
              <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                <code className="text-white">{error.message}</code>
              </pre>
            ),
          })
        } else {
          toast({
            title: "Successfully update " + data.title,
          })
          router.push('/dashboard')
        }
      }


    return (
        <BlogForm onHandleSubmit={handleEdit} blog={blog} />
    )
}
