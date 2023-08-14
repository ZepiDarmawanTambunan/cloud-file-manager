import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function login() {
  const [calledPush, setCalledPush] = useState(false); // handle error
  const {data: session} = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if(session){
        if (calledPush) { //handle error
            return;
        }
        router.replace('/');
        setCalledPush(true); // handle error
    }
  }, [session])

  return (
    <div className='flex justify-center items-center h-screen'>
        <Head>
          <title>Login Page</title>
        </Head>
        <button className='bg-blue-400 p-2 rounded-xl px-3 text-white' onClick={() => signIn()}>
            Login with google
        </button>
    </div>
  )
}

export default login