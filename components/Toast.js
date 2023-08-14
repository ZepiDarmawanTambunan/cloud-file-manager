import React, { useContext, useEffect } from 'react'
import { ShowToastContext } from '@/context/ShowToastContext'

function Toast({msg}) {
    const {ShowToastMsg, setShowToastMsg} = useContext(ShowToastContext);
    useEffect(() => {
        setInterval(() => {
            setShowToastMsg(null);
        }, 3000)
    }, [ShowToastMsg]);

  return (
    <div className='toast toast-top toast-end'>
        <div className='alert alert-success'>
            <span>{msg}</span>
        </div>
    </div>
  )
}

export default Toast