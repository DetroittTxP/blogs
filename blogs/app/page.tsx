'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const {data:session,status} = useSession();
  const router = useRouter();

  // useEffect(() => {
      
  // if(!session && status !== "loading")
  //   {
  //     return router.replace('/');
  //   }
  // },[session])

  
  return (
    <main>
        
    </main>
  );
}
