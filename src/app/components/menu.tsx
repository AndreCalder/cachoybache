"use client";

import { ArrowBigDown, MoveDown, MoveUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

interface MenuProps {
    menuActive: boolean;
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Menu({ menuActive, setMenuActive }: MenuProps) {

    const router = useRouter();
    const [subMenuActive, setSubMenuActive] = React.useState(false);
    const textClasses = "flex items-center text-[28px] md:text-5xl";
    const subTitleClasses = "flex items-center text-[18px] md:text-5xl";
    const numberColClasses = `col-span-2 sm:col-span-1 justify-start ${textClasses}`;
    const textColClasses = `col-span-10 sm:col-span-11 cursor-pointer ${textClasses}`;
    const [iconSize, setIconSize] = React.useState(30);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIconSize(20)
        }
    }, []);

    const redirect = (href: string) => {
        router.replace(href);
        setMenuActive(false);
    };

    return (
        <div id='menuContainer' className={`w-svw fixed menu flex flex-col z-50 top-0 bottom-0 transition ease-in-out delay-150 ${menuActive ? "translate-y-0" : "-translate-y-full"}`}>
            <div className='w-100 h-24 flex items-center justify-between px-5 sm:px-12 border-solid border-black border-b-2'>
                <p className='ocrb'>Cacho y bache</p>
                <p className='cursor-pointer text-lg font-bold hover:font-black ' onClick={() => setMenuActive(false)}>[Salir]</p>
            </div>
            <div className="flex-1 h-4/6">
                <div className="grid grid-rows-6 h-full">
                    <div className="row-span-1 grid grid-cols-12 border-solid hover:font-bold hover:italic border-black border-b-2 px-5 sm:px-12">
                        <div className={numberColClasses}>01</div>
                        <div className={textColClasses} onClick={() => redirect("/nosotrxs")} >NOSOTRXS</div>
                    </div>
                    <div className="row-span-1 grid grid-cols-12 border-solid hover:font-bold hover:italic border-black border-b-2 px-5 sm:px-12">
                        <div className={numberColClasses}>02</div>
                        <div className={textColClasses} onClick={() => redirect("/contacto")}>CONTACTO</div>
                    </div>
                    <div className={`row-span-1 grid grid-cols-12 border-solid hover:font-bold hover:italic border-black border-b-2 px-5 sm:px-12`}>
                        <div className={numberColClasses}>03</div>
                        <div className={textColClasses} onClick={() => redirect("/espacios")}>ESPACIOS DE VENTA</div>
                    </div>
                    <div className={`row-span-1 grid grid-cols-12 border-solid hover:font-bold hover:italic ${!subMenuActive && "border-black border-b-2 px-5 sm:px-12"}`}>
                        <div className={numberColClasses}>04</div>
                        <div className={textColClasses} >
                            <div className='flex items-center'>
                                <p onClick={() => redirect("/archivo")}>ARCHIVO</p>
                                {
                                    !subMenuActive
                                        ? <MoveDown onClick={() => setSubMenuActive(!subMenuActive)} className='ml-2' size={iconSize} />
                                        : <MoveUp onClick={() => setSubMenuActive(!subMenuActive)} className='ml-2' size={iconSize} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className={subMenuActive ? "row-span-1  grid grid-cols-12 border-black border-b-2 hover:font-bold hover:italic" : "hidden"}>
                        <div className="col-span-1"></div>
                        <div onClick={() => redirect(`/archivo/67cf5cf9e4473199e0cc4ace?portada=verde`)}className={`col-span-11 font-light cursor-pointer ${subTitleClasses} sm:3xl hover:font-bold`}>
                            04.1 ESTA EDICIÓN 
                            {/* &gt; CALENDARIO */}
                        </div>
                    </div>
                    <div className="row-span-1 grid grid-cols-12 border-black border-b-2 px-5 sm:px-12 hover:font-bold hover:italic">
                        <div className={numberColClasses}>05</div>
                        <div className={textColClasses} onClick={() => redirect("seccionamarilla")}>SECCIÓN AMARILLA</div>
                    </div>
                    <div className="row-span-1 grid grid-cols-12 border-black border-b-2 px-5 sm:px-12 hover:font-bold hover:italic">
                        <div className={numberColClasses}>06</div>
                        <div className={textColClasses} onClick={() => redirect("eventos")}>CALENDARIO</div>
                    </div>
                    {
                        /*
                    <div className="row-span-1 grid grid-cols-12 border-black border-b-2 hover:font-bold">
                        <div className={numberColClasses}>06</div>
                        <div className={textColClasses} onClick={() => redirect("/tienda")}>TIENDA</div>
                    </div>
                        */
                    }

                </div>
            </div>
            <div className="w-100 h-1/6 grid grid-cols-2 items-center justify-between px-5 sm:px-12">
                <Link href={"https://www.instagram.com/cachoybache/"} className='col-span-2 sm:col-span-1'>Instagram</Link>
                <div className='col-span-2 sm:col-span-1 flex flex-col items-end'>
                    <p className='text-xl sm:text-3xl font-bold'>cachoybache@gmail.com</p>
                    <p className='text-sm'>MÉXICO</p>
                </div>
            </div>
        </div>
    )
}

export default Menu