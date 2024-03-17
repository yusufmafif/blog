"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCommentById } from '@/lib/actions/comment'
import { useUser } from "@/lib/store/user";

const DeleteComment = (blog: any) => {
    const user = useUser((state) => state.user)
    const deleteComment = async ({blog, e}: any) => {
        e.preventDefault()
        await deleteCommentById(blog.blog.user_id)
    }
    console.log(blog.blog.uuid)
    const isAuthorized = user?.id === blog.blog.user_id
    return (
        <div>
            {isAuthorized && <form onSubmit={deleteComment}><Button className='flex items-center gap-2'>Delete</Button></form>}
        </div>
    )
}
export default DeleteComment
