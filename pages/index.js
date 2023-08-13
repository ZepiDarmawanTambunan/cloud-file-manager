import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';
import { fileList, folderList } from '@/constants';

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
    <div className='p-5'>
      <SearchBar/>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  )
}
