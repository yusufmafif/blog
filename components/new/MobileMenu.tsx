"use client"
import React from 'react'
import { Navbar } from "flowbite-react";

export default function MobileMenu() {

    return (
        <Navbar
            fluid={true}
            rounded={true}
            className='lg:hidden md:hidden'
        
        >
            <Navbar.Brand
                to="/navbars"
            >
            </Navbar.Brand>
            <Navbar.Toggle color='white'/>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/navbars"
                    active={false}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link
                    to="/navbars"
                >
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>

    )
}
