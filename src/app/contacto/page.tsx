import React from 'react'
import CachoyBache from '../components/CachoyBache'
import Image from 'next/image'
import Subtitle from '../components/subtitle'

function Contact() {
  return (
    <div className='w-svw h-svh pt-12 flex flex-col items-center justify-between'>

      <Subtitle subtitle="CONTACTO" classes="border-b-2 border-solid border-black" />
      <CachoyBache />
      <p className="text-4xl">
        cachoybache@gmail.com
      </p>
      <p>Instagram</p>
      <Image height={511} width={169} alt="conejo" src="/conejo1.png" />
    </div>
  )
}

export default Contact