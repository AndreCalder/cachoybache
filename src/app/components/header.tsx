"use client";

import React from 'react'
import Menu from './menu'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {


    const pathname = usePathname();

    const [menuActive, setMenuActive] = React.useState(false)

    if(pathname.includes("admin")) return null
    return (
        <>
            <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
            <div className={
                `${pathname.includes("nosotrxs") ? "aboutus border-black" : pathname.includes("espacios") ? "salespoints border-yellow-300" : pathname.includes("seccionamarilla") ? "yellowpages border-black" : pathname.includes("calendario") ? "calendar" : "bg-white border-black"} 
                fixed w-screen h-24 flex items-center justify-between px-5 sm:px-12 sm:pr-14  border-solid  border-b-2 
                ${menuActive ? "z-40" : "z-50"}`}>
                <Link className='cursor-pointer ocrb text-md' href={"/"}>
                    Cacho y bache
                </Link>
                <p className='cursor-pointer text-lg' onClick={() => setMenuActive(true)}><strong className='cursor-pointer'>[ Menú ]</strong></p>
            </div>
        </>
    )
}

export default Header