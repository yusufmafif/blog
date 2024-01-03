"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { SiGithub } from 'react-icons/si'

import { createBrowserClient } from '@supabase/ssr';
import { usePathname } from 'next/navigation';




export default function LoginForm() {
const pathName = usePathname()

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: location.origin + '/auth/callback?next=' + pathName,
            },
        })
    }


    return (
        <div> <Button variant="outline" className="gap-2" onClick={handleLogin}><SiGithub />Login</Button></div>
    )
}
