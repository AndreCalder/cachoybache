import React from 'react'
import Subtitle from '../components/subtitle'
import Image from 'next/image'
import Link from 'next/link'
function Calendario() {
    return (
        <div className='w-full pt-12 h-svh flex flex-col calendar'>
            <Subtitle subtitle="CALENDARIO" classes="border-b-2 border-solid border-white" />
            <div className="w-full flex-1 grid grid-cols-12  px-5 md:px-12">
                <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
                    <Image height={511} width={850} alt="conejo" src="/CalendarImg.png" />
                </div>
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-6 relative">
                    <p>Suscríbete al calendario de eventos y recibe toda la info a tu correo de exposiciones (y más) de nuestrxs creativxs que aparecen en esta edición.</p>
                    <div className="grid grid-cols-4 py-4">
                        <div className="col-span-3 pr-2">
                            <input className='ocrb text-sm w-full bg-black text-white border-solid border-white border-2 p-1' placeholder='Correo electrónico' type="text" />
                        </div>
                        <div className="col-span-1">
                            <button className='ocrb h-full w-full bg-white text-sm text-black border-none'>Suscribirme</button>
                        </div>
                    </div>

                    <p>En la foto: The Boogie Room/ <Link className='font-bold' href={"https://instagram.com/"}>@theboogieroomrecords</Link></p>

                    <p>Fotografía por Benjamín Vázquez</p>
                    <p className='w-full'>Inició en noviembre del 2022. Es un sello discográfico de House mexicano, un semillero de talento emergente. El ser y dar plataforma los ha llevado a muchos lugares en poco tiempo. Su enfoque: hacer comunidad y arte, abrir espacio para que los artistas se sientan libres, sin la presión de encajar, visibilizar sus proyectos. Unir a aquellxs que invierten tiempo, trabajo duro, talento y corazón, que les interesa vivir la música y ser parte de ella. </p>
                    <Link href={"/eventos"} className="absolute bottom-0 right-0 text-2xl font-bold cursor-pointer">
                        VER EVENTOS &gt;
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Calendario