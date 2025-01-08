"use client";

import React from 'react'
import Menu from './menu'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {


    const pathname = usePathname();

    const [menuActive, setMenuActive] = React.useState(false)

    return (
        <>
            <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
            <div className={
                `${pathname.includes("nosotrxs") ? "aboutus border-black" : pathname.includes("espacios") ? "salespoints border-yellow-300" : pathname.includes("seccionamarilla") ? "yellowpages border-black" :  "bg-white border-black"} 
                fixed w-screen h-12 flex items-center justify-between px-5 border-solid  border-b-2 
                ${menuActive ? "z-40" : "z-50"}`}>
                <Link href={"/"}>
                    <p className='cursor-pointer'>Cacho y Bache</p>
                </Link>
                <p className='cursor-pointer' onClick={() => setMenuActive(true)}><strong className='cursor-pointer'>[Menú]</strong></p>
            </div>
        </>
    )
}

export default Header