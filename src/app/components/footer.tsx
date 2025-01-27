"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function Footer() {

    const pathname = usePathname();

    if(pathname.includes("admin")) return null
    
    return (
        <footer className="grid grid-cols-12 gap-4 bg-black px-5 md:px-12  py-10 justify-between">
            <div className="col-span-12 sm:col-span-7 flex flex-col justify-between">
                <Image
                    src="/FooterLogo.svg"
                    alt="Cacho y Bache logo"
                    width={300}
                    height={166}
                />
                <div>
                    <p className="text-white text-xs">
                        / cachoybache@gmail.com
                    </p>
                    <p className="text-white text-xs">
                        // Síguenos en nuestro <Link href="https://www.instagram.com/cachoybache/" className='underline cursor-pointer'>Instagram</Link>
                    </p>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-5 flex flex-col justify-between">
                <div className="grid grid-cols-3 py-4">
                    <p className="text-white text-xs">
                        Exhibicionismo/
                    </p>
                    <p className="text-white text-xs">
                        Trueque/
                    </p>
                    <p className="text-white text-xs">
                        Libertad
                    </p>
                </div>
                <br />
                <div className="flex flex-col gap-2 pt-4 pb-6">
                    <p className="text-white text-xs ocrb py-2 pr-12">
                        Que no se te pase ningún evento. <br /> Suscríbete
                        a nuestro calendario
                    </p>

                    <div className="grid grid-cols-4 py-2">
                        <div className="col-span-3 pr-2">
                            <input className='ocrb text-xs w-full bg-black text-white border-solid border-white border-2 py-2 px-3' placeholder='Correo electrónico' type="text" />
                        </div>
                        <div className="col-span-1">
                            <button className='ocrb h-full w-full bg-white text-xs text-black border-none'>Suscribirme</button>
                        </div>
                    </div>
                </div>
                <br />

                <div className='w-full justify-end pt-12'>
                    <p className="text-white text-end ocrb text-xs">
                        Lindo día, Cacho y bache.
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer