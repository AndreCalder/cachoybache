import React from 'react'

function Eventos() {
  return (
    <div className='w-full pt-12 h-svh flex flex-col'>
      <div className={`w-full h-24 px-5 sm:px-15 flex items-center justify-start py-5`}>
        <div className="flex flex-col gap-2">
          <p className='font-lighter'>ESTA EDICIÓN</p>
          <p className='tracking-[0.3em] font-bold sm:text-4xl'>CALENDARIO DE EVENTOS</p>
        </div>
      </div>
    </div>
  )
}

export default Eventos