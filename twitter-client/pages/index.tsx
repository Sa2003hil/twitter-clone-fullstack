import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitterX } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { FiHash } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5"
import { FaRegEnvelope } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import React, { useCallback } from "react";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-hot-toast'
import { graphqlClient } from "@/clients/api";
import { verifyUsertGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] })

interface TwitterSidebarButton {
  id: number
  title: String,
  icon: React.ReactNode,
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  { id: 1, title: "Home", icon: < HiHome size={24} className="" /> },
  { id: 2, title: "Explore", icon: < FiHash size={24} className="" /> },
  { id: 3, title: "Notifications", icon: < IoNotificationsOutline size={24} className="" /> },
  { id: 4, title: "Messages", icon: <  FaRegEnvelope size={24} className="" /> },
  { id: 5, title: "Bookmark", icon: <CiBookmarkPlus size={24} className="" /> },
  { id: 6, title: "Profile", icon: <IoPerson size={24} className="" /> }

]

export default function Home() {

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

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

    await queryClient.invalidateQueries(["current-user"])



  }, [queryClient])
  return (
    <div className={inter.className}>
      <div className="relative grid grid-cols-12 h-screen w-screen px-52">
        <div className="col-span-3  pt-2">
          <div className="h-fit w-fit transition-all  hover:bg-gray-600 rounded-full p-2 hover:cursor-pointer">
            <BsTwitterX size={27} className="" />
          </div>
          <div className="mt-4 text-base font-normal pr-4">
            <ul className="flex flex-col gap-4">
              {
                sideBarMenuItems.map(item =>
                  <li
                    className="flex justify-start  items-center transition-all gap-3 hover:bg-gray-900 hover:cursor-pointer  rounded-full px-4 py-2 w-fit"
                    key={item.id}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                )
              }
            </ul>
            <button className="bg-sky-600 w-full py-2 px-8  rounded-full mt-11  ">Tweet</button>
          </div>
          {
            user &&
            <div className="absolute bottom-5 bg-slate-800 w-2/8 rounded-full p-1 flex items-center justify-center gap-3">
              {user && user.profileImageURL && <Image src={user?.profileImageURL} className="rounded-full" alt="profile_img" height={40} width={40} />}
              <div className="flex">
                <p className="text-gray-300 font-medium text-sm">{user?.firstName}</p>
                <p className="text-gray-300 font-medium text-sm">{user?.lastName}</p>
              </div>
            </div>
          }
        </div>
        <div className="col-span-6 border-r-[.2px] border-l-[.2px] border-slate-500">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          {!user && <div className="border p-5">
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>}
        </div>
      </div>
    </div>
  )
}
