import SideNavBar from '@/components/SideNavBar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SideNavBar/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}