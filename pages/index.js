import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    if(!session){
      router.push('/login');
    }else{
      console.log("User session", session.user);
    }
  }, [session])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

    </main>
  )
}
