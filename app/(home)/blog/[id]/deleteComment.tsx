"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCommentById } from '@/lib/actions/comment'
import { useUser } from "@/lib/store/user";

const DeleteComment = (blog: any) => {
    const user = useUser((state) => state.user)
    
    async function deleteComment() {
        deleteCommentById(blog.blog.uuid)
    }
    const isAuthorized = user?.id === blog.blog.user_id || user?.role === "admin"
    return (
        <div>
            {isAuthorized && <form action={deleteComment}><Button type="submit" className='flex items-center gap-2'>Delete</Button></form>}
        </div>
    )
}
export default DeleteComment
