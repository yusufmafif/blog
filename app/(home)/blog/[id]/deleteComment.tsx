"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCommentById } from '@/lib/actions/comment'
import { useUser } from "@/lib/store/user";

const DeleteComment = (blog: any) => {
    const user = useUser((state) => state.user)
    const deleteComment = async (blog: any) => {
        await deleteCommentById(blog.blog)
    }
    console.log(user?.id)
const isAuthorized = "76d0ed3c-caad-4ab4-ba09-ebb1f367abed" === blog.blog
    return (
        <div>
            {isAuthorized && <form onSubmit={deleteComment}><Button className='flex items-center gap-2'>Delete</Button></form> }
        </div>
    )
}
export default DeleteComment
