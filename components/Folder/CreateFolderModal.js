import React, {useState} from 'react'
import Image from 'next/image'

function CreateFolderModal() {
    const [folderName, setFolderName] = useState();

    const onCreate = () => {
        console.log(folderName);
    }


  return (
    <div>
        <form method='dialog' className='modal-box p-9 items-center'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                ✕
            </button>
            <div className='w-full items-center flex flex-col justify-center gap-3'>
                <Image src="/folder.png" alt='folder' width={50} height={50} />
                <input type='text' placeholder='Folder Name' className='p-2 border-[1px] outline-none rounded-md' onChange={(e) => setFolderName(e.target.value)} />
                <button className='bg-blue-500 text-white rounded-md p-2 px-3 w-full'
                 onClick={()=> onCreate()}>
                    Create
                 </button>
            </div>
        </form>
    </div>
  )
}

export default CreateFolderModal