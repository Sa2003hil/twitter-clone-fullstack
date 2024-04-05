import React, { useCallback } from "react"
import Image from 'next/image'
import TwiiterLogo from "@/public/assets/TwiiterLOGO.svg"
import GoogleLogo from '@/public/assets/GoogleLogo.svg'
import AppleLog from '@/public/assets/AppleLog.svg'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import { graphqlClient } from "@/clients/api";
import { verifyUsertGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";



const SingIn: React.FC = () => {
    const { user } = useCurrentUser();
    const queryClient = useQueryClient();


    const handleSelectImage = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute("accept", "image/*")
        input.setAttribute('type', 'file');
        input.click();
    }, [])

    console.log(user);

    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        if (!googleToken) return toast.error(`Google Token not found`);

        const { verifyGoogleToken } = await graphqlClient.request(verifyUsertGoogleTokenQuery, {
            token: googleToken
        });

        toast.success('verified Success');
        console.log(verifyGoogleToken);


        if (verifyGoogleToken) window.localStorage.setItem('twitter_token', verifyGoogleToken)

        await queryClient.invalidateQueries({ queryKey: ['current-user'] })



    }, [queryClient])
    return <div className="flex items-center gap-14 mt-[4%] justify-center m-auto">
        <div className=" flex items-center justify-center p-20">
            <Image src={TwiiterLogo} className=" " alt="" height={300} width={300} />
        </div>
        <div className="flex flex-col">
            <p className="text-white font-semibold h-auto text-7xl overflow-hidden">Happening now</p>
            <p className="text-white mt-14 text-3xl font-extrabold">Join today.</p>

            <div className="mt-6 flex gap-4 flex-col overflow-hidden" >
                {!user && <div className="overflow-hidden rounded-full w-60">
                    <GoogleLogin onSuccess={handleLoginWithGoogle} />
                </div>}
                <button className="bg-white flex gap-2 items-center justify-center rounded-full w-64 p-2">
                    <Image src={AppleLog} alt="Sign in with Twitter" height={30} width={20} />
                    <p className="text-black font-bold">Sign up with Apple</p>
                </button>
                <div className="text-slate-400 w-60 flex items-center">
                    <hr className="flex-grow border-t border-slate-600" />
                    <span className="mx-4">or</span>
                    <hr className="flex-grow border-t border-slate-600" />
                </div>
                <button className="bg-[#1d9bf0] flex gap-2 flex-col items-center justify-center rounded-full w-64 p-2">
                    <p className="text-white font-semibold">Create account</p>
                </button>
                <p className="text-slate-500 text-xs">By signing up, you agree to the <span className="text-[#1d9bf0] hover:underline hover:cursor-pointer">Terms of Service</span> and <span className="text-[#1d9bf0] hover:underline hover:cursor-pointer">Privacy<br /> Policy</span>, including<span className="text-[#1d9bf0] hover:underline hover:cursor-pointer">Cookie </span> Use.</p>
                <p className="text-white text-lg font-bold mt-5">Already have an account ?</p>
                <button className="bg-transparent border-white border-[1px] flex gap-2 flex-col items-center justify-center rounded-full w-64 p-2">
                    <p className="text-white font-semibold">Create account</p>
                </button>
            </div>
        </div>


    </div >
}

export default SingIn