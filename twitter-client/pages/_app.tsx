import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="527063658581-n4kn2rbgjlskv3ag8fh57mnp4nf4kfef.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}

