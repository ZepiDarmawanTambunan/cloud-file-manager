import { app } from '@/config/firebaseConfig';
import StorageSize from '@/services/StorageSize';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

function StorageInfo() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [totalSizeUsed, setTotalSizeUsed] = useState('0 MB'); // Initialize with a string value
    const [imageSize, setImageSize] = useState(0);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (session) {
            getAllFiles();
        }
    }, [session]);

    useEffect(() => {
        setImageSize(StorageSize.getStorageByType(fileList, ['png', 'jpg']));
    }, [fileList]);

    const getAllFiles = async () => {
        const q = query(
            collection(db, 'files'),
            where('createdBy', '==', session.user.email)
        );

        const querySnapshot = await getDocs(q);
        let totalSize = 0;
        const newFileList = [];
        querySnapshot.forEach((doc) => {
            totalSize += doc.data().size;
            newFileList.push(doc.data());
        });
        setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + ' MB');
        setFileList(newFileList);
    };

    return (
        <div className='mt-7'>
            <h2 className='text-[22px] font-bold'>
                {totalSizeUsed}{' '}
                <span className='text-[14px] font-medium'>
                    used of{' '}
                </span>{' '}
                50 MB
            </h2>
            <div className='w-full bg-gray-200 h-2.5 flex'>
                <div className='bg-blue-600 h-2.5 w-[25%]'></div>
                <div className='bg-green-600 h-2.5 w-[35%]'></div>
                <div className='bg-yellow-400 h-2.5 w-[15%]'></div>
            </div>
        </div>
    );
}

export default StorageInfo;