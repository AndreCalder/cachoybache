"use client";

import Image from 'next/image';
import React from 'react'

function Footer() {
    return (
        <footer className="grid grid-cols-2 gap-4 bg-black px-5 py-10 justify-between">
            <div className="col-span-2 sm:col-span-1">
                <Image
                    src="/FooterLogo.svg"
                    alt="Cacho y Bache logo"
                    width={300}
                    height={166}
                />
                <div>
                    <p className="text-white">
                        / cachoybache@gmail.com
                    </p>
                    <p className="text-white">
                        // Síguenos en nuestro <span className='underline cursor-pointer'>Instagram</span>
                    </p>
                </div>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col justify-between">
                <div className="grid grid-cols-3">
                    <p className="text-white">
                        Exhibicionismo/
                    </p>
                    <p className="text-white">
                        Trueque/
                    </p>
                    <p className="text-white">
                        Libertad
                    </p>
                </div>
                <p className="text-white">
                    Que no se te pase ningún evento. Suscríbete
                    a nuestro calendario
                </p>

                <div className="grid grid-cols-4">
                    <div className="col-span-3 pr-2">
                        <input className='w-full bg-black text-white border-solid border-white border-2 p-1' placeholder='Correo electrónico' type="text" />
                    </div>
                    <div className="col-span-1">
                        <button className='h-full w-full bg-white text-black border-none'>Suscribirse</button>
                    </div>
                </div>
                <div className='w-full justify-end'>
                    <p className="text-white text-end">
                        Lindo día, Cacho y bache.
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer