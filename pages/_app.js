import { AppContextProvider } from '@/context/AppContext'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
      
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  )
}
