import React from 'react'
import CachoyBache from '../components/CachoyBache'
import Image from 'next/image'
import Subtitle from '../components/subtitle'
import Link from 'next/link'

function Contact() {
  return (
    <div className='w-svw h-svh pt-12 flex flex-col items-center justify-between'>
      <Subtitle subtitle="CONTACTO" classes="border-b-2 border-solid border-black" />
      <CachoyBache />
      <div className='flex flex-col items-center gap-4'> <p className="text-4xl tracking-[0.3em] font-bold">
        cachoybache@gmail.com
      </p>
        <Link className='underline text-2xl hover:scale-105 ease-in-out' href={"https://www.instagram.com/cachoybache/"}>Instagram</Link></div>
      <Image height={511} width={129} alt="conejo" src="/conejo1.png" />
    </div>
  )
}

export default Contact