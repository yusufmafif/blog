"use server"

import { BlogFormSchemaType } from "@/app/dashboard/schema"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../supabase"


const PROFILE = "/profile"

export async function createProfile(data: any) {
    const supabase = await createSupabaseServerClient()
    const { ...blog_content } = data
    const resultBlog = await supabase
        .from('profile')
        .insert(blog_content)
        .select()
        .single()
    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        revalidatePath(PROFILE)
        return JSON.stringify(resultBlog)
    }
}

export async function readProfile() {
    const supabase = await createSupabaseServerClient()
    return supabase
        .from('profile')
        .select("*")
        // .order('name', { ascending: true })
}