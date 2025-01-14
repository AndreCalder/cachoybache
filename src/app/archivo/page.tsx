"use client"

import React from 'react'
import Subtitle from '../components/subtitle'
import Image from 'next/image'
import Link from 'next/link'

function Archivo() {

    const archive = [
        {
            subtitle: "Primera edición",
            title: "¿NO QUE NO TRONABAS PISTOLITA?",
            variants: [
                {
                    color: "#3098F2",
                    cover: "/coverblue.webp",
                    variant: "azul"
                },
                {
                    color: "#F2D5E0",
                    cover: "/coverpink.webp",
                    variant: "rosa"
                },
                {
                    color: "#FFFFFF",
                    cover: "/coverwhite.webp",
                    variant: "blanca"
                },
                {
                    color: "#045423",
                    cover: "/covergreen.webp",
                    variant: "verde"
                }
            ]
        }
    ]

    const activeCovers = archive.map((edition) => edition.variants[0])

    const [activeImages, setActiveImages] = React.useState<Array<any>>(activeCovers)

    return (
        <main className="w-screen pt-12">
            <Subtitle subtitle="ARCHIVO" classes="border-b-2 border-solid border-black" />
            <div className="min-h-lvh w-full grid grid-cols-12 px-5 md:px-12 pt-6">
                {
                    archive.map((edition, index) => {
                        return (
                            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col gap-2">
                                <div className="w-full flex justify-center">
                                    <Image className='border-[1px] border-solid border-black' src={activeImages[index].cover} alt={edition.subtitle} width={500} height={400} />
                                </div>
                                <p className="font-light italic">{edition.subtitle}</p>
                                <h2 className="font-bold text-2xl underline">{edition.title}</h2>
                                <div className="w-full flex gap-4 py-4">
                                    {
                                        edition.variants.map((variant, variantIndex) => {
                                            return (
                                                <div onClick={() => {
                                                    const newActiveImages = [...activeImages];
                                                    newActiveImages[index] = variant;
                                                    setActiveImages(newActiveImages);
                                                }} key={variantIndex} className="h-4 w-4 cursor-pointer border-[1px] border-solid border-black rounded-full" style={{ backgroundColor: variant.color }}>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="w-full">
                                    <Link href={`/archivo/${edition.subtitle}?portada=${activeImages[index].variant}`} className="w-full border-[1px] border-solid border-black px-4 py-2">
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Archivo