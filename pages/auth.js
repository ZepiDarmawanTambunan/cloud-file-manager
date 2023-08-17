import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SideNavBar from '@/components/SideNavBar';
import Storage from '@/components/Storage/Storage';

function AuthChecker({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === 'loading') {
        return;
      }      
      if (!session) {
        router.push('/login');
      }
    }, [session]); 
    return (
      <div className='flex'>
      <SideNavBar/>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full'>
        <div className='col-span-2'>
          <div className='p-5'>
            {children}
          </div>            
        </div>
        <div className='bg-white p-5 order-first md:order-last'>
          <Storage/>
        </div>
      </div>
    </div>
    );
}
  
export default AuthChecker