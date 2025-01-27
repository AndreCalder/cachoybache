"use client"

import Subtitle from '@/app/components/subtitle';
import { MoveLeftIcon, MoveRightIcon, X, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'

interface Cover {
    color: string,
    cover: string,
    variant: string
}

interface Covers {
    azul: Cover,
    rosa: Cover,
    blanca: Cover,
    verde: Cover
}

function Edition() {

    const params = useParams();
    const searchParams = useSearchParams()

    const portada = searchParams.get('portada')?.toString();

    const covers: Covers = {
        azul: {
            color: "#FFFFF",
            cover: "/coverblue.webp",
            variant: "azul"
        },
        rosa: {
            color: "#ED1C1D",
            cover: "/coverpink.webp",
            variant: "rosa"
        },
        blanca: {
            color: "#401E01",
            cover: "/coverwhite.webp",
            variant: "blanca"
        },
        verde: {
            color: "#F2E744",
            cover: "/covergreen.webp",
            variant: "verde"
        }
    }

    const allImages = [
        {
            src: "/ediciones/primeraedición/1.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/2.png",
            w: 162,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/3.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/4.png",
            w: 321,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/5.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/6.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/7.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/8.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/9.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/10.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/11.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/12.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/13.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/14.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/15.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/16.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/17.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/18.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/19.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/20.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/21.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/22.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/23.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/24.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/25.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/26.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/27.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/28.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/29.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/30.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/31.png",
            w: 160,
            h: 214
        },
        {
            src: "/ediciones/primeraedición/32.png",
            w: 160,
            h: 214
        }
    ]
    const firstImages = allImages.slice(0, 11);
    const remainingImages = allImages.slice(11);

    const [lightBoxActive, setLightBoxActive] = React.useState<boolean>(false);
    const [activeImage, setActiveImage] = React.useState<number>(0);

    const handleImageClick = (image: number) => {
        setActiveImage(image);
        setLightBoxActive(true);
    }

    return (
        <main className="w-screen pt-24">
            <Subtitle subtitle="ARCHIVO" classes="border-b-2 border-solid border-black" />
            <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-50 flex justify-center items-center ${!lightBoxActive ? 'hidden' : ''}`}>
                <XIcon className="w-10 h-10 cursor-pointer text-white fixed top-5 right-5" onClick={() => setLightBoxActive(false)} />
                <div className="flex z-50 items-center gap-5">
                    <MoveLeftIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                        if (activeImage > 0) {
                            setActiveImage(activeImage - 1)
                        } else {
                            setActiveImage(allImages.length - 1)
                        }
                    }} />
                    <Image src={allImages[activeImage].src} alt="activeImage" width={300} height={300} />
                    <MoveRightIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                        if (activeImage < allImages.length - 1) {
                            setActiveImage(activeImage + 1)
                        } else {
                            setActiveImage(0)
                        }
                    }} />
                </div>
            </div>
            <div className="w-full px-5 md:px-12 flex items-center gap-5 py-6">
                <p className='text-2xl font-bold tracking-[0.6rem]'>PRIMERA EDICIÓN</p>
                <div className='flex-1 h-[2px] bg-black'></div>
                <p className='text-2xl font-bold tracking-[0.6rem]'>¿NO QUE NO TRONABAS PISTOLITA?</p>
            </div>
            {
                portada != null && (
                    <div className="w-full grid grid-cols-12 md:px-12 pb-6 gap-2">
                        <div className="col-span-12 lg:col-span-4 min-h-60 flex items-center justify-center py-3" style={{ backgroundColor: covers[portada as keyof Covers].color }}>
                            <Image className='h-fit' src={covers[portada as keyof Covers].cover} alt={portada} width={200} height={300} />
                        </div>
                        <div className="col-span-12 lg:col-span-8 flex flex-wrap justify-between gap-2" >
                            {
                                firstImages.map((image, index) => {
                                    return (
                                        <Image className={`cursor-pointer transition-all imageFixedHeight hover:scale-105`} src={image.src || ''} alt={`image-${index}`} height={image.h} width={image.w} onClick={() => handleImageClick(index)} key={index} />
                                    )
                                })
                            }
                        </div>
                        <div className="col-span-12 flex flex-wrap justify-between gap-2">
                        {
                            remainingImages.map((image, index) => {
                                return (
                                    <Image className={`cursor-pointer transition-all imageFixedHeight hover:scale-105`} src={image.src || ''} alt={`image-${index}`} height={image.h} width={image.w} onClick={() => handleImageClick(index)} key={index} />
                                )
                            })
                        }
                        </div>
                    </div>
                )
            }
            <div className="w-full flex flex-col px-5 py-3 gap-y-1 md:px-12 min-h-40">
                <p className="text-3xl font-bold italic">PORTADAS</p>
                <p className='italic'>Portada rosa/ Fotografía por Isabel Barbba - Portada azul/ Fotografía por María Correa - Portada blanco/ Fotografía por Hugo Moreno - Portada verde/ Fotografía por Mariana Guerrero</p>
            </div>
        </main>
    )
}

export default Edition