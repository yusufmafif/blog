import { create } from 'zustand'
import { User } from "@supabase/supabase-js"
import { IUser } from '../types'

interface UserState {
    user: IUser | null
    setUser: (user: IUser | null) => void
}

export const useUser = create<UserState>()((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
}))