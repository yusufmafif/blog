"use server"

import { CommentFormSchemaType } from "@/app/dashboard/schema"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../supabase"


const PROFILE = "/profile"
const DASHBOARD = "/"

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