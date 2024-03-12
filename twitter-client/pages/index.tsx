import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitterX } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { FiHash } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5"
import { FaRegEnvelope } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import React from "react";
import FeedCard from "@/components/FeedCard";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  title: String,
  icon: React.ReactNode,
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  { title: "Home", icon: < HiHome size={24} className="" /> },
  { title: "Explore", icon: < FiHash size={24} className="" /> },
  { title: "Notifications", icon: < IoNotificationsOutline size={24} className="" /> },
  { title: "Messages", icon: <  FaRegEnvelope size={24} className="" /> },
  { title: "Bookmark", icon: <CiBookmarkPlus size={24} className="" /> },
  { title: "Profile", icon: <IoPerson size={24} className="" /> }




]

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-52">
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
                    key={item.title}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                )
              }
            </ul>
            <button className="bg-sky-600 w-full py-2 px-8  rounded-full mt-11  ">Tweet</button>
          </div>
        </div>
        <div className="col-span-7 border-r-[.2px] border-l-[.2px] border-slate-500">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
