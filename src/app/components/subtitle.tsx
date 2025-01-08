import React from 'react'

function Subtitle({ subtitle, classes }: { subtitle: string, classes: string }) {
  return (
    <div className={`w-full h-24 px-5 sm:px-15 flex items-center justify-end py-5 ${classes}`}>
        <p className='tracking-[0.6em] font-bold sm:text-4xl'>// {subtitle}</p>
    </div>
  )
}

export default Subtitle