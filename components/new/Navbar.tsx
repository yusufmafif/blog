'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import useSearchStore from './searchStore'

export default function Navbar() {
    const [query, setQuery] = React.useState('')
    const { searchQuery, setSearchQuery } = useSearchStore();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = (e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement).value;
        setSearchQuery(inputValue)
    };

    const handleClearSearch = () => {
        // Membersihkan nilai pencarian
        setQuery('');
        setSearchQuery('')
      };


    return (<div>
        <nav className="shadow-sm">
            <div className="container px-4 mx-auto flex justify-center items-center py-3">
                <div className=" lg:flex space-x-5 md:flex md:space-x-5 hidden">
                    <Link href="/"
                        className="flex items-center transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="fas fa-home"></i>
                        </span>
                        Home
                    </Link>
                    <a href="#"
                        className="flex items-center  transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="far fa-file-alt"></i>
                        </span>
                        About
                    </a>
                    <a href="#"
                        className="flex items-center transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="fas fa-phone"></i>
                        </span>
                        Contact
                    </a>
                </div>
                <form onSubmit={handleSearch} className="relative lg:ml-auto hidden lg:block md:block md:ml-auto">
                    <div>
                        <span className="absolute left-3 top-2 text-sm text-gray-500">
                            <i className="fas fa-search"></i>
                        </span>
                        <div className='flex space-x-5'>
                            <input type="text"
                                className="block w-full shadow-sm border-none  pr-2 py-2 focus:outline-none bg-gray-50 text-sm text-gray-700 placeholder-gray-500"
                                placeholder="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" variant="outline">Search</Button>
                            {query && (
                                <Button onClick={handleClearSearch} className="bg-gray-400 text-white px-4 py-2">Clear</Button>
                            )}
                        </div>
                    </div>
                </form>
                <div className="text-xl text-gray-700 cursor-pointer ml-4 xl:hidden block hover:text-blue-500 transition" id="open_sidebar">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>


    </div>)
}
