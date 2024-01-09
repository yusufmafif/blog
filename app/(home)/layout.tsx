import Footer from '@/components/Footer'
import React, { ReactNode } from 'react'
import Navbar from '@/components/new/Navbar'
import MobileMenu from '@/components/new/MobileMenu'
import Image from 'next/image'
import ProfileSide from '@/components/new/ProfileSide'

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
                    <ProfileSide/>
                </div>
            </div>
            <Footer />
        </div>
    )
}
