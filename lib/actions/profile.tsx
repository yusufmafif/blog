"use server"

import { ProfileFormSchemaType } from "@/app/dashboard/schema"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../supabase"


const PROFILE = "/profile"
const DASHBOARD = "/"

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
    return await supabase
        .from('profile')
        .select("*")
    // .order('name', { ascending: true })
}



export async function updateProfileById(blogId: string, data: ProfileFormSchemaType) {
    const supabase = await createSupabaseServerClient()
    const result = await supabase
        .from('profile')
        .update(data)
        .eq('id', blogId)
    revalidatePath(DASHBOARD)
    revalidatePath(PROFILE)
    return JSON.stringify(result)
}


export async function readProfileById(profileId: string) {
    const supabase = await createSupabaseServerClient()

    return supabase
        .from('profile')
        .select("*")
        .eq('id', profileId)
        .single()
}