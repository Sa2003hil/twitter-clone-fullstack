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
import { CiImageOn } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import SignIn from '@/components/Main'


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
  return (
    <div className={inter.className}>
      {user ? <div className="relative grid grid-cols-12 h-screen w-screen px-52">
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
            <button className="bg-sky-800 hover:bg-sky-600 w-full py-2 px-8  rounded-full mt-11  ">Tweet</button>
          </div>
          {
            user &&
            <div className="absolute bottom-5 bg-slate-900 w-48 rounded-full p-1 flex items-center justify-center gap-3">
              {user && user.profileImageURL && <Image src={user?.profileImageURL} className="rounded-full" alt="profile_img" height={60} width={60} />}
              <div className="flex flex-col ">
                <div className="flex">
                  <p className="text-gray-300 font-semibold text-sm  ">{user?.firstName}</p>
                  <p className="text-gray-300 font-medium text-sm">{user?.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <button>  <HiOutlineDotsHorizontal className="flex items-center justify-center mr-4" /></button>
            </div>
          }
        </div>
        <div className="col-span-7 border-r-[.2px] border-l-[.2px] border-slate-500">
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-700 p-4  transition-all cursor-pointer">
              <div className="grid grid-cols-12">
                <div className="col-span-1">
                  {user?.profileImageURL && <Image src={user?.profileImageURL} className="rounded-full" alt="" height={70} width={70} />}
                </div>
                <div className="col-span-11">
                  <textarea className=" resize-none w-full bg-transparent text-lg px-4 border-b border-slate-700" rows={4} placeholder="Whats Happening?" ></textarea>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center justify-center">
                      <CiImageOn onClick={handleSelectImage} color="#1d9bf0" size={28} className="hover:bg-slate-900 p-1 rounded-full  ease-in-out transition-[.9s] " />
                      <MdOutlineGifBox color="#1d9bf0" size={30} className="hover:bg-slate-900 p-1 rounded-full  ease-in-out transition-[.9s] " />
                      <FaRegSmile color="#1d9bf0" size={28} className="hover:bg-slate-900 p-1 rounded-full  ease-in-out transition-[.9s] " />
                    </div>

                    <button className="bg-sky-800 hover:bg-sky-500 text-sm p-1 py-1 px-6  rounded-full">Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-2">
          {!user && <div className="border p-5">
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>}
        </div>
      </div> : <SignIn />}


    </div >
  )
}
