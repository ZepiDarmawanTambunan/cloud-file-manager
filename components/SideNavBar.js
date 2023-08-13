import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {menu} from '@/constants';
import { useSession } from 'next-auth/react';

import CreateFolderModal from "./Folder/CreateFolderModal";

function SideNavBar() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const {data: session} = useSession();
    const onMenuClick = (item, index) => {
        setActiveIndex(index);
        router.push('/');
    }

  return session&&(
    <div className='w-[200px] bg-white h-screen sticky top-0 z-10 shadow-blue-200 shadow-md p-5'>
        <div className='flex justify-center'>
            <Image src="/logo.png" alt="logo" className="cursor-pointer" width={150} height={60} onClick={() => router.push('/')} />
        </div>
        <button className='flex gap-2 items-center text-[13px] bg-blue-500 p-2 
            text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center' onClick={()=>window.upload_file.showModal()}>
            Add New File
            <svg xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' 
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
            </svg>
        </button>
        <button className='flex gap-2 items-center text-[13px] bg-sky-400 p-2 
            text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center' onClick={()=>window.my_modal_3.showModal()}>
            Create Folder
            <svg xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' 
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
            </svg>
        </button>
        <div className='mt-7'>
            {menu.map((item, index) => (
                <h2
                    key={index}
                    onClick={()=>onMenuClick(item,index)}
                    className={`flex gap-2 items-center p-2 mt-3 text-gray-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ${activeIndex == index ? 'bg-blue-500 text-white-100' : ''}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={item.logo}
                        />
                    </svg>
                    {item.name}
                </h2>
            ))}
        </div>

        <dialog id='my_modal_3' className='modal'>
            <CreateFolderModal/>
        </dialog>
    </div>
  )
}

export default SideNavBar