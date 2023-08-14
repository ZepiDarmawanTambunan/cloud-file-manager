import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';
// import { fileList, folderList } from '@/constants';
import { ParentFolderIdContext } from '@/context/ParentFolderIdContext';
import { ShowToastContext } from '@/context/ShowToastContext';
import { app } from '../config/firebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import Head from 'next/head';

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  
  const db = getFirestore(app);
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);
  const {showToastMsg, setShowToastMsg} = useContext(ShowToastContext);

  useEffect(() => {
    if(!session){
      router.push('/login');
    }else{
      setFolderList([]);
      getFolderList();
      getFileList();
      console.log("User session", session.user);
    }
    setParentFolderId(0);

  }, [session, showToastMsg])

  const getFolderList = async() => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"), 
      where('parentFolderId', '==', 0),
      where('createdBy', '==', session.user.email)  
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFolderList(folderList=>([...folderList, doc.data()]));
    })
  }

  const getFileList = async() => {
    setFileList([]);
    const q = query(
      collection(db, 'files'),
      where('parentFolderId', '==', 0),
      where('createdBy', '==', session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFileList(fileList => [...fileList, doc.data()])
    })
  }

  return (
    <div className='p-5'>
      <Head>
        <title>Home Page</title>
      </Head>
      <SearchBar/>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  )
}
