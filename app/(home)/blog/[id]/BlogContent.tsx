"use client"
import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase'
import { set } from 'zod'
import MarkdownPreview from '@/app/dashboard/components/markdown/MarkdownPreview'
import BlogLoading from './BlogLoading'
import Checkout from '@/components/stripe/Checkout'
import { useUser } from '@/lib/store/user'

export default function BlogContent({ blog_id }: { blog_id: string }) {
    const user = useUser((state) => state.user)
    const isSub = user?.subscription_status

    const [blog, setBlog] = useState<{
        blog_id: string;
        content: string;
        created_at: string;
    } | null>()

    const [isLoading, setLoading] = useState(true)

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )


    const readBlogContent = async () => {
        const { data } = await supabase
            .from("blog_content")
            .select("*")
            .eq("blog_id", blog_id)
            .single()
        setBlog(data)
        setLoading(false)
    }

    useEffect(() => {
        readBlogContent()
        // eslint-disable-next-line 
    }, [])

    if (isLoading) {
        return <BlogLoading />
    }
    return (
        <div>
            <MarkdownPreview className='sm:px-10' content={blog?.content || ''} />
            {!isSub && <Checkout />}
        </div>
    )
}
