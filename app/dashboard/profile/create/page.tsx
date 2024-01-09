"use client"
import React from 'react'
import { ProfileFormSchemaType } from '../../schema'
import { toast } from "@/components/ui/use-toast"
import { createProfile } from '@/lib/actions/profile'
import { useRouter } from 'next/navigation'
import ProfileForm from '../../components/ProfileForm'

export default function Page() {
const router = useRouter()

  const handleCreate = async (data: ProfileFormSchemaType) => {
    const result = await createProfile(data)

    const { error } = JSON.parse(result)

    if (error?.message) {
      toast({
        title: "Fail to create Profile",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    } else {
      toast({
        title: "Successfully created " + data.name,
      })
      router.push('/dashboard')
    }
  }


  return <ProfileForm onHandleSubmit={handleCreate} />
}
