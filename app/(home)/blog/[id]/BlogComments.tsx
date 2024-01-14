"use client"
import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase'
import { useUser } from '@/lib/store/user'
import { createComment } from '@/lib/actions/comment'
import { CommentFormSchemaType } from '@/app/dashboard/schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    comment: z
        .string()
        .min(10, {
            message: "Comment must be at least 10 characters.",
        })
        .max(160, {
            message: "Comment must not be longer than 160 characters.",
        }),
})


export default function BlogComments({ blog_id }: { blog_id: string }) {
    const user = useUser((state) => state.user)
    const setUser = useUser((state) => state.setUser)

    const [id, setId] = useState<{
        id: string | undefined;
    } | null>()

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const readBlogContent = async () => {
        const { data } = await supabase
            .from("blog")
            .select("id")
            .eq("id", blog_id)
            .single()
        setId(data)
    }

    useEffect(() => {
        readBlogContent()
        // eslint-disable-next-line 
    }, [])

    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: CommentFormSchemaType) => {
        const result = await createComment(data)
        const { error } = JSON.parse(result)
        if (error?.message) {
            toast({
                title: "Fail to create Comment",
                description: (
                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white">{error.message}</code>
                    </pre>
                ),
            })
            alert(error.message)
        } else {
            toast({
                title: "Successfully created " + data.id,
            })
            router.refresh()
        }
    }

    return (
        <Form {...form}>
            {user && (
                <form onSubmit={form.handleSubmit(data => onSubmit({ id: id?.id, name: user?.display_name, ...data }))} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-semibold">Comment</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write your comment here"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </Form>
    )
}
