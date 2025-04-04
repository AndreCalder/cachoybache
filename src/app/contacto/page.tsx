import React from 'react'
import CachoyBache from '../components/CachoyBache'
import Image from 'next/image'
import Subtitle from '../components/subtitle'
import Link from 'next/link'

function Contact() {
  return (
    <div className='w-svw h-svh pt-24 flex flex-col items-center justify-between'>
      <Subtitle subtitle="CONTACTO" classes="border-b-2 border-solid border-black" />
      <CachoyBache />
      <div className='flex flex-col items-center gap-6'> <Link href={"mailto:cachoybache@gmail.com"} className="text-2xl tracking-[0.3em] font-[900]">
        cachoybache@gmail.com
      </Link>
        <Link className='underline ocrb text-xs cursor-pointer hover:scale-105 ease-in-out' href={"https://www.instagram.com/cachoybache/"}>Instagram</Link></div>
      <Image height={450} width={100} alt="conejo" src="/conejo1.png" />
    </div>
  )
}

export default Contact