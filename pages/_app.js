import { SessionProvider } from "next-auth/react"
import { useState } from 'react'
import '@/styles/globals.css'
import Toast from '@/components/Toast';
import { ShowToastContext } from '@/context/ShowToastContext';
import { ParentFolderIdContext } from "../context/ParentFolderIdContext";
import AuthChecker from "./auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [showToastMsg, setShowToastMsg] = useState();
  const [parentFolderId, setParentFolderId] = useState();

  return (
    <SessionProvider session={session}>
      <ParentFolderIdContext.Provider value={{parentFolderId,setParentFolderId}}>
      <ShowToastContext.Provider value={{showToastMsg, setShowToastMsg}}>
        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>
        {showToastMsg?<Toast msg={showToastMsg} /> : null}
      </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>
  )
}