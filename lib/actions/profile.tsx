"use server"

import { ProfileFormSchemaType } from "@/app/dashboard/schema"
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
    const { data } = await supabase
        .from('profile')
        .select("*")
        .order('name', { ascending: true })
    return JSON.stringify(data)
}

export async function updateProfile(blogId: string, data: ProfileFormSchemaType) {
    const supabase = await createSupabaseServerClient()
    const result = await supabase
        .from('profile')
        .update(data)
        .select()
        .single()
    // .eq('id', blogId)
    revalidatePath(PROFILE)
    // revalidatePath('/blog/' + blogId)
    return JSON.stringify(result)
}