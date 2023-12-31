import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import SearchBar from '@/components/SearchBar';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';
import { collection, deleteDoc, doc, query, getDocs, getFirestore, where } from 'firebase/firestore';
import { ParentFolderIdContext } from '@/context/ParentFolderIdContext';
import { ShowToastContext } from '@/context/ShowToastContext';
import { app } from '@/config/firebaseConfig';
import { fileList, folderList } from '@/constants';
import DeleteConfirmation from '@/components/File/DeleteConfirmation';
import { deleteObject, getStorage, ref } from 'firebase/storage';

function FolderDetails() {
    const router = useRouter();
    const {name, id} = router.query;
    const {data: session} = useSession();
    const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const {showToastMsg, setShowToastMsg} = useContext(ShowToastContext);
    const [folderList, setFolderList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const db = getFirestore(app);
    const storage = getStorage(app);

    useEffect(() => {
        setParentFolderId(id);
        if(session||showToastMsg!= null){
            setFolderList([]);
            setFileList([]);
            getFolderList();
            getFileList();
        }
    }, [id, session, showToastMsg]);

    const deleteFolderAndFilesRecursively = async (folderId) => {
        // Find and delete files within the current folder
        const filesQuery = query(
            collection(db, "files"),
            where('parentFolderId', '==', folderId),
            where('createdBy', '==', session.user.email)
        );
        
        const filesSnapshot = await getDocs(filesQuery);
        const deleteFilePromises = filesSnapshot.docs.map(async fileDoc => {
            const fileData = fileDoc.data();
            // Delete file from storage
            if (fileData.imageUrl) {
                const storageRef = ref(storage, fileData.imageUrl);
                await deleteObject(storageRef);
            }
            await deleteDoc(fileDoc.ref);
        });
    
        await Promise.all(deleteFilePromises);
    
        // Recursively delete child folders within the current folder
        const childFoldersQuery = query(
            collection(db, "Folders"),
            where('createdBy', '==', session.user.email),
            where('parentFolderId', '==', folderId),
        );
        console.log(folderId);
        const childFoldersSnapshot = await getDocs(childFoldersQuery);
        
        childFoldersSnapshot.forEach(async childFolderDoc => {
            await deleteFolderAndFilesRecursively(childFolderDoc.id);
            await deleteDoc(childFolderDoc.ref); // Delete the child folder document
        });

        await deleteDoc(doc(db, 'Folders', folderId));
        router.back();
    };

    const getFolderList = async() => {
        setFileList([]);
        const q = query(
            collection(db, 'Folders'),
            where('createdBy', '==', session.user.email),
            where('parentFolderId', '==', id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setFolderList(folderList => ([...folderList, doc.data()]))
        })
    }

    const getFileList = async() => {
        setFileList([]);
        const q = query(
            collection(db, 'files'),
            where('parentFolderId', '==', id),
            where('createdBy', '==', session.user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setFileList(fileList => ([...fileList, doc.data()]))
        })
    }

  return (
    <>
        <SearchBar/>
        <h2 className='text-[20px] font-bold mt-5'>
            {name}
            <svg xmlns="http://www.w3.org/2000/svg" 
                onClick={() => setIsDeleteConfirmationOpen(true)}
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor"
                className="w-5 h-5 float-right text-red-500
                hover:scale-110 transition-all cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </h2>

        {folderList.length > 0 
            ? <FolderList folderList={folderList} isBig={false}/>
            : <h2 className='text-gray-400 text-[16px] mt-5'>No Folder Found</h2>
        }

        {isDeleteConfirmationOpen && (
            <DeleteConfirmation
            isOpen={isDeleteConfirmationOpen}
            onCancel={() => setIsDeleteConfirmationOpen(false)}
            onDelete={() => {
                setIsDeleteConfirmationOpen(false);
                deleteFolderAndFilesRecursively(id);
            }}
            />
        )}

        <FileList fileList={fileList} />
    </>
  )
}

export default FolderDetails