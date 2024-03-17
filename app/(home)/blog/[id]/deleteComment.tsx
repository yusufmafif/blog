"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { deleteCommentById } from '@/lib/actions/comment'

const DeleteComment = (blog: any) => {

    const deleteComment = async (blog : string) => {
       await deleteCommentById(blog)
    }


    return (
        <div>
      <form onSubmit={DeleteComment}><Button className='flex items-center gap-2'>Delete</Button></form>
        </div>
    )
}
export default DeleteComment
