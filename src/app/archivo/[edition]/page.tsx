"use client"

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

    const allImages = Array.from({ length: 32 }, (_, i) => `/ediciones/primeraedición/${i + 1}.png`);

    const firstImages = allImages.slice(0, 11);
    const firstImagesWithAttributes = firstImages.map((image, index) => ({
        cover: image,
        className: [3, 6, 8].includes(index) ? "col-span-2" : "col-span-1"
    }));
    const remainingImages = allImages.slice(11);
    const remainingImagesWithAttributes = remainingImages.map((image, index) => ({
        cover: image,
        className: [1, 3, 5, 8, 17, 19].includes(index) ? "col-span-2" : [10, 12, 15].includes(index) ? "col-span-3" : "col-span-1"
    }));

    const [lightBoxActive, setLightBoxActive] = React.useState<boolean>(false);
    const [activeImage, setActiveImage] = React.useState<number>(0);
    const handleImageClick = (image: number) => {
        console.log(image)
        setActiveImage(image);
        setLightBoxActive(true);
    }

    return (
        <main className="w-screen pt-12">
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
                    <Image src={allImages[activeImage]} alt="activeImage" width={300} height={300} />
                    <MoveRightIcon className="w-10 h-10 cursor-pointer text-white" onClick={() => {
                        if (activeImage < allImages.length - 1) {
                            setActiveImage(activeImage + 1)
                        } else {
                            setActiveImage(0)
                        }
                    }} />
                </div>
            </div>
            <div className="w-full px-5 md:px-12 flex items-center gap-5">
                <p>Primera Edición</p>
                <div className='flex-1 h-[2px] bg-black'></div>
                <p>¿No que no tronabas pistolita?</p>
            </div>
            {
                portada != null && (
                    <div className="w-full grid grid-cols-11 px-5 md:px-12 py-6 gap-2">
                        <div className="col-span-11 lg:col-span-4 min-h-60 flex justify-center py-3" style={{ backgroundColor: covers[portada as keyof Covers].color }}>
                            <Image className='' src={covers[portada as keyof Covers].cover} alt={portada} width={200} height={400} />
                        </div>
                        <div className="col-span-11 lg:col-span-7 grid grid-cols-7 gap-2" >
                            {
                                firstImagesWithAttributes.map((image, index) => {
                                    return (
                                        <div className={`min-h-40 cursor-pointer transition-all hover:scale-105 ${image.className}`} onClick={() => handleImageClick(index)} key={index} style={{ backgroundImage: `url(${image.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            remainingImagesWithAttributes.map((image, index) => {
                                return (
                                    <div className={`min-h-40 cursor-pointer transition-all hover:scale-105 ${image.className}`} onClick={() => handleImageClick(index+firstImages.length)} key={index} style={{ backgroundImage: `url(${image.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </main>
    )
}

export default Edition