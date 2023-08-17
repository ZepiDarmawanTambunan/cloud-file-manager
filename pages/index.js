import { useContext, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';
// import { fileList, folderList } from '@/constants';
import { ParentFolderIdContext } from '@/context/ParentFolderIdContext';
import { ShowToastContext } from '@/context/ShowToastContext';
import { app } from '../config/firebaseConfig';
import { collection, endAt, getDocs, getFirestore, orderBy, query, startAt, where } from 'firebase/firestore';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  
  const db = getFirestore(app);
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);
  const {showToastMsg, setShowToastMsg} = useContext(ShowToastContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(session && status != 'loading'){
      setFolderList([]);
      setFileList([]);
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
  
  const handleSearch = async(search) => {
    setFolderList([]);
    setFileList([]);
    
    if(search === "" || search === null || search.trim() === ""){
      getFolderList();
      getFileList();
    }else{
      const qFolder = query(
        collection(db, "Folders"),
        where('createdBy', '==', session.user.email),
        where('name', '>=', search),
        where('name', '<=', search + '\uf8ff')
      );
      const querySnapshotFolder = await getDocs(qFolder);
      querySnapshotFolder.forEach((doc) => {
        setFolderList(folderList => ([...folderList, doc.data()]));
      });

        const qFile = query(
          collection(db, 'files'),
          where('createdBy', '==', session.user.email),
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff')
        );
        const querySnapshotFile = await getDocs(qFile);
        querySnapshotFile.forEach((doc) => {
        setFileList(fileList => [...fileList, doc.data()])
      })
    }
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <SearchBar handleSearch={handleSearch}/>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </>
  )
}
