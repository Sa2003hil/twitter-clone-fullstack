import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";



const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="527063658581-n4kn2rbgjlskv3ag8fh57mnp4nf4kfef.apps.googleusercontent.com">
        <Toaster />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  )
}

