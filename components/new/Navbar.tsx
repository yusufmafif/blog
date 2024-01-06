import React from 'react'
import Image from 'next/image'


export default function Navbar() {
    return (<div>
        <nav className="shadow-sm">
            <div className="container px-4 mx-auto flex justify-center items-center py-3">

                <div className=" lg:flex space-x-5 md:flex md:space-x-5 hidden">
                    <a href="#"
                        className="flex items-center transition hover:text-blue-500">
                        <span className="mr-2">
                            <i className="fas fa-home"></i>
                        </span>
                        Home
                    </a>
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

                <div className="relative lg:ml-auto hidden lg:block md:block md:ml-auto">
                    <span className="absolute left-3 top-2 text-sm text-gray-500">
                        <i className="fas fa-search"></i>
                    </span>
                    <input type="text"
                        className="block w-full shadow-sm border-none rounded-3xl  pl-11 pr-2 py-2 focus:outline-none bg-gray-50 text-sm text-gray-700 placeholder-gray-500"
                        placeholder="Search" />
                </div>
                <div className="text-xl text-gray-700 cursor-pointer ml-4 xl:hidden block hover:text-blue-500 transition" id="open_sidebar">
                    <i className="fas fa-bars"></i>
                </div>

            </div>
        </nav>

        
    </div>)
}
