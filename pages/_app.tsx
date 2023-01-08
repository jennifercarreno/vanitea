import '../styles/searchbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/header.css';
import { SessionProvider } from "next-auth/react"
import {SSRProvider} from '@react-aria/ssr'; 

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
       <SSRProvider> 
            <Component {...pageProps} />
       </SSRProvider>
    </SessionProvider>
  )
}
