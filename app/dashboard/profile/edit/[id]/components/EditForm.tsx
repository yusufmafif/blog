"use client";

import ProfileForm from '@/app/dashboard/components/ProfileForm'
import { ProfileFormSchemaType } from '@/app/dashboard/schema'
import { IProfile } from '@/lib/types'
import React from 'react'
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import {updateProfileById} from "@/lib/actions/profile"


export default function EditForm({ profile }: { profile: IProfile }) {
const router = useRouter()

    const handleEdit = async (data: ProfileFormSchemaType) => {
        const result = await updateProfileById(profile?.id!, data)
        const { error } = JSON.parse(result)
    
        if (error?.message) {
          toast({
            title: "Fail to create Blog",
            description: (
              <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                <code className="text-white">{error.message}</code>
              </pre>
            ),
          })
        } else {
          toast({
            title: "Successfully update " + data.name,
          })
          router.push('/')
        }
      }


    return (
        <ProfileForm onHandleSubmit={handleEdit} profile={profile} />
    )
}
