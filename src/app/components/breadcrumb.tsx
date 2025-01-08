import React from 'react'

function Breadcrumb({text} : {text: string}) {
  return (
    <div className='w-full flex justify-end py-6'>
        <h1 className="text-3xl font-extrabold">
            / / {text}
        </h1>
    </div>
  )
}

export default Breadcrumb