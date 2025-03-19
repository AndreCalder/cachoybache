"use client"
import { useRouter } from 'next/navigation'
import React from 'react'




function Admin() {

  const router = useRouter()

  React.useEffect(() => {
    router.push('/admin/ediciones')
  }, [])

  return (
    <div></div>
  )
}

export default Admin