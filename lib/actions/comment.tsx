"use server"

import { CommentFormSchemaType } from "@/app/dashboard/schema"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../supabase"


const PROFILE = "/blog/[...id]"

export async function createComment(data: CommentFormSchemaType) {
    const supabase = await createSupabaseServerClient()
    const resultBlog = await supabase
        .from('blog_comments')
        .insert(data)
        .select()
        .single()
    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        revalidatePath(PROFILE)
        return JSON.stringify(resultBlog)
    }
}

export async function readBlogCommentById(id: string) {
    const supabase = await createSupabaseServerClient()

    return supabase
        .from('blog_comments')
        .select("*")
        .eq('id', id)
        .order('created_at', { ascending: true })
}