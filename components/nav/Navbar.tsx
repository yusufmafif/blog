"use client"
import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { useUser } from "@/lib/store/user";
import { Profile } from "./Profile";
import { MobileIcon } from "@radix-ui/react-icons";
import useSearchStore from '@/components/new/searchStore'

export default function Navbar() {
  const user = useUser((state) => state.user)
  const { searchQuery, setSearchQuery } = useSearchStore();

const reset  = () => {
  setSearchQuery("")
}

  return (
    <nav className="flex justify-between">
      <div className="group">
        <Link href="/" onClick={reset} className="text-3xl font-bold">Abstain.</Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-blue-900"></div>
      </div>
      {user?.id ? <Profile /> : <LoginForm />}

    </nav>
  )

}
