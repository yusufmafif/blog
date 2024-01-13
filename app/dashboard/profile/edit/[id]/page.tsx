import React from 'react'
import { readProfileById } from '@/lib/actions/profile'
import EditForm from './components/EditForm'

export default async function Page({ params }: { params: { id: string } }) {
    const { data: profile } = await readProfileById(params.id)
    return (
        <EditForm profile={profile} />
    )
}
