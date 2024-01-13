import React from 'react'
import { readProfile } from '@/lib/actions/profile'
import Image from 'next/image'
import { Message } from 'react-hook-form'

export default async function ProfileSide() {

    const { data: blogs } = await readProfile()
    return (
        <div className='flex justify-center m-2'>
            {blogs?.map((blog, index) => {
                if (index != 1) {
                    return null
                }
                return (
                    <div key={index} className='flex flex-col items-center justify-center antialiased'>
                        <div className='mb-4 text-xl font-bold'>
                            About Me
                        </div>
                        <Image src={blog?.photo_url} alt="logo" width={200} height={200} className='w-40 h-40 rounded-full ring-2 ring-gray-300 object-cover' />
                        <p className='mt-2 font-semibold text-lg'>{blog.name}</p>
                        <p className='text-sm text-center'>{blog.description}</p>
                    </div>
                )
            })}
        </div>
    )
}
