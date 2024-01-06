import Footer from '@/components/Footer'
import React, { ReactNode } from 'react'
import Navbar from '@/components/new/Navbar'
import MobileMenu from '@/components/new/MobileMenu'
import Image from 'next/image'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-5">
            <Navbar />
            <div className="container mx-auto px-4 flex flex-wrap lg:flex-nowrap">
                <div className=" lg:w-8/12 w-full lg:mr-6">
                    <MobileMenu />
                    {children}
                </div>
                <div className='w-full lg:w-4/12 lg:mr-6'>
                    <div className='flex justify-center m-2'>
                        <Image src="/madinah.png" alt="logo" width={200} height={200}  className='rounded-full ring-1 ring-grey-500 w-32'/>
                    </div>
                    <div className='flex justify-center m-2'>
                       About Me
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
