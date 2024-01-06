import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className='border-t py-8'>
            <div className='max-w-7xl py-10 px-5 md:p-0 space-y-5
            mx-auto flex justify-center md:items-end flex-col
            md:flex-row'>
                <div className='space-y-6 w-1/2'>
                    <div className='flex space-x-5'>
                        <GitHubLogoIcon className='w-5 h-5' />
                        <LinkedInLogoIcon className='w-5 h-5' />
                        <TwitterLogoIcon className='w-5 h-5' />
                        <BsWhatsapp className='w-5 h-5' />
                    </div>
                </div>
                <h1>&copy; 2024 Abstain.</h1>
            </div>
        </footer>
    )
}
