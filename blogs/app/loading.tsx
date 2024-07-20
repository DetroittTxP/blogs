import React from 'react'
import { ClipLoader } from 'react-spinners'

export default function loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
         <ClipLoader/>
    </div>
  )
}
