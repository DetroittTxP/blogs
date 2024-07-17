"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EditPage() {

  const {data:session,status} = useSession();
  const router = useRouter();

    if(!session && status !== "loading")
    {
      return router.replace('/');
    }
  return (
    <div>EditPage</div>
  )
}
