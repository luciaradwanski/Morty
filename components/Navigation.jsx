'use client'
import Link from "next/link";
import React, { useState } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {FaHome,FaLocationArrow} from 'react-icons/fa'
import {CgGhostCharacter} from 'react-icons/cg'
import {BsCardChecklist, BsFillPencilFill, BsFilePersonFill} from 'react-icons/bs'

const links = [{
    label: 'Home',
    route: '/'
}, {
    label: 'Characters',
    route: '/pagination',
},{
    label: 'Form',
    route: '/form'
}, {
    label: 'Location',
    route: '/location',
},{
    label: 'Episodes',
    route: '/episodes'
}, {
    label: 'About',
    route: '/about',
}]

export function Navigation(){

    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }

    return  (
        <div>
            <AiOutlineMenu onClick={handleNav} className='absolute top-4 right-4 z-[99] md:hidden text-white'/>
            {nav ? (
                <div className='fixed w-full h-screen bg-white/90 flex flex-col justify-center items-center z-20'>
                <Link href="/" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <FaHome size={20}/>
                    <span className='pl-4'>Home</span>
                </Link>
                <Link href="/pagination" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <CgGhostCharacter size={20}/>
                    <span className='pl-4'>Characters</span>
                </Link>
                <Link href="/form" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <BsFillPencilFill size={20}/>
                    <span className='pl-4'>Create Character</span>
                </Link>
                <Link href="/location" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <FaLocationArrow size={20}/>
                    <span className='pl-4'>Locations</span>
                </Link>
                <Link href="/episodes" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <BsCardChecklist size={20}/>
                    <span className='pl-4'>Episodes</span>
                </Link>
                <Link href="/about" className='w-[75%] flex justify-center content-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
                    <BsFilePersonFill size={20}/>
                    <span className='pl-4'>About me</span>
                </Link>
            </div>
            ) : ( '')}

            <div className="md:block hidden fixed bg-black w-full z-[97]">
                <nav className='flex flex-row justify-center p-2'>
                    <ul className="flex items-center justify-evenly content-center list-none text-black gap-32">
                        {links.map(({label, route}) => (
                            <li key={route}>
                            <Link className="text-white no-underline hover:text-pink-500" href={route}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}