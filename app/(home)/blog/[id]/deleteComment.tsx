"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCommentById } from '@/lib/actions/comment'
import { useUser } from "@/lib/store/user";

const DeleteComment = (blog: any) => {
    const user = useUser((state) => state.user)
    const deleteComment = (blog: any) => {
        deleteCommentById(blog.blog.uuid)

    }
    const isAuthorized = user?.id === blog.blog.user_id
    return (
        <div>
            {isAuthorized && <form ><Button onClick={() => deleteComment(blog)} className='flex items-center gap-2'>Delete</Button></form>}
        </div>
    )
}
export default DeleteComment
