import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitterX } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { FiHash } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5"
import { FaRegEnvelope } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import React, { useCallback, useState } from "react";
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
import { Spinner } from "@nextui-org/react";
import ModalPop from "@/components/Modal";
import { IoSearch } from "react-icons/io5";
import ModalPopPremium from "@/components/Premium";
import TwitterLogo from '../public/assets/TwitterLogo.png'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  id: number;
  title: String;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  { id: 1, title: "Home", icon: <HiHome size={24} className="" /> },
  { id: 2, title: "Explore", icon: <FiHash size={24} className="" /> },
  { id: 3, title: "Notifications", icon: <IoNotificationsOutline size={24} className="" /> },
  { id: 4, title: "Messages", icon: <FaRegEnvelope size={24} className="" /> },
  { id: 5, title: "Bookmark", icon: <CiBookmarkPlus size={24} className="" /> },
  { id: 6, title: "Profile", icon: <IoPerson size={24} className="" /> }
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenPremium = () => {
    setIsPremium(true);
  }

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute("accept", "image/*")
    input.setAttribute('type', 'file');
    input.click();
  }, []);

  console.log(user);

  const handleLogOut = useCallback(() => {
    window.localStorage.removeItem('twitter_token');
    toast.success('Logged Out Successfully')
    queryClient.invalidateQueries({ queryKey: ['current-user'] })
  }, [queryClient])


  return (
    <div className={inter.className}>
      {user ? (
        <div className="relative grid grid-cols-12 gap-4 h-screen w-screen px-8 lg:px-16">
          <div className="col-span-2">
            <div className="h-fit w-fit transition-all hover:bg-gray-600 rounded-full p-2 hover:cursor-pointer">
              <BsTwitterX size={27} className="" />
            </div>
            <div className="mt-4 text-base font-normal pr-4">
              <ul className="flex flex-col gap-4">
                {sideBarMenuItems.map(item => (
                  <li
                    className="flex justify-start items-center transition-all gap-3 hover:bg-gray-900 hover:cursor-pointer rounded-full px-4 py-2 w-fit"
                    key={item.id}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-sky-800 hover:bg-sky-600 w-full py-2 px-8 rounded-full mt-11">Tweet</button>
            </div>
            {user && (
              <div onClick={handleOpenModal} className="absolute cursor-pointer bottom-5 bg-slate-900 w-48 rounded-full p-1 flex items-center justify-center gap-3">
                {user && user.profileImageURL && <Image src={user?.profileImageURL} className="rounded-full" alt="profile_img" height={60} width={60} />}
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="text-gray-300 font-semibold text-sm">{user?.firstName}</p>
                    <p className="text-gray-300 font-medium text-sm">{user?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </div>
                </div>
                {/* <button onClick={handleOpenModal}> <HiOutlineDotsHorizontal className="flex items-center justify-center mr-4" /></button> */}
                {isOpen && <ModalPop />}
                {/* <button></button> */}
                {/* <Modal
                  backdrop="opaque"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  radius="lg"
                  classNames={{
                    body: "py-4",
                    backdrop: "bg-gray-600/50 backdrop-opacity-40", // Light bluish background color
                    base: "border-[#000000] bg-[#000000] text-[#a8b0d3]", // Black color for the modal
                    header: "border-b-[1px] border-[#000000]",
                    footer: "border-t-[1px] border-[#000000]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                  }}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex items-center justify-center flex-col gap-1">  <Image
                          width={30}
                          alt="NextUI hero Image"
                          src={TwitterLogo}
                        /></ModalHeader>
                        <ModalBody className="text-white text-xl font-semibold">
                          Log out of X?
                        </ModalBody>
                        <ModalBody className="text-slate-400">
                          You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.
                        </ModalBody>
                        <ModalFooter className="flex flex-col">
                          <Button onClick={handleLogOut} variant="solid" className="rounded-full" onPress={onClose}>
                            Log Out
                          </Button>
                          <Button variant="bordered" className="text-white border-slate-600 rounded-full border-[1px]" onPress={onClose}>
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal> */}
              </div>
            )}
          </div>
          <div className="col-span-6 border-r-[.2px] border-l-[.2px] border-slate-500">
            <div className="flex w-[45%] h-14 fixed bg-black bg-opacity-50 backdrop-blur-lg gap-40 items-center justify-center p-2">
              <div className="text-white font-semibold flex items-center justify-center flex-col text-center gap-3">For You <p className="bg-blue-400 w-8 h-1 rounded-full"></p></div>
              <div className="text-slate-500 font-normal flex items-center justify-center">Following</div>
            </div>
            <div className="border border-r-0 mt-12 border-l-0 border-b-0 border-gray-700 p-4 transition-all cursor-pointer">
              <div className="grid grid-cols-12">
                <div className="col-span-1">
                  {user?.profileImageURL && <Image src={user?.profileImageURL} className="rounded-full" alt="" height={70} width={70} />}
                </div>
                <div className="col-span-11">
                  <textarea className="resize-none w-full bg-transparent text-lg px-4 border-b border-slate-700" rows={4} placeholder="What's Happening?"></textarea>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center justify-center">
                      <CiImageOn onClick={handleSelectImage} color="#1d9bf0" size={28} className="hover:bg-slate-900 p-1 rounded-full ease-in-out transition-[.9s]" />
                      <MdOutlineGifBox color="#1d9bf0" size={30} className="hover:bg-slate-900 p-1 rounded-full ease-in-out transition-[.9s]" />
                      <FaRegSmile color="#1d9bf0" size={28} className="hover:bg-slate-900 p-1 rounded-full ease-in-out transition-[.9s]" />
                    </div>
                    <button className="bg-sky-800 hover:bg-sky-500 text-sm p-1 py-1 px-6 rounded-full">Post</button>
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
          <div className="col-span-4  flex flex-col gap-7">
            <div className="flex mt-3 p-3 w-full gap-4 items-center justify-center bg-[#16181c] rounded-full">
              <IoSearch color="#71767b" size={20} />
              <input type="text" placeholder="Search" className="bg-transparent text-white" />
            </div>
            <div onClick={handleOpenPremium} className="bg-[#16181c] p-4 flex flex-col gap-4 rounded-md w-full ">
              <p className="text-lg font-extrabold ">Subscribe to Premium</p>
              <p className="text-sm ">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
              {/* <button onClick={handleOpenPremium} className="bg-sky-600  py-2 px-8 rounded-full text-white font-semibold text-center flex justify-center items-center w-[50%]">Subscribe</button> */}
              {isPremium && <ModalPopPremium />}
              {/* <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                  body: "py-4",
                  backdrop: "bg-gray-600/50 backdrop-opacity-40", // Light bluish background color
                  base: "border-[#000000] bg-[#000000] text-[#a8b0d3]", // Black color for the modal
                  header: "border-b-[1px] border-[#000000]",
                  footer: "border-t-[1px] border-[#000000]",
                  closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <div className="p-7">
                      <ModalHeader className="flex items-center justify-center flex-col gap-1">  <Image
                        width={30}
                        alt="NextUI hero Image"
                        src={TwitterLogo}
                      /></ModalHeader>
                      <ModalBody className="text-white text-3xl flex items-center justify-center font-extrabold">
                        Who are you?
                      </ModalBody>
                      <ModalBody className="text-white text-base flex items-center justify-center font-light">
                        Choose the right subscription for you:
                      </ModalBody>
                      <ModalBody className="text-slate-400 flex flex-row p-2">
                        <Button color="primary" variant="bordered" className="text-white p-2 flex flex-col h-auto">
                          <p className="text-slate-500">Premium</p>
                          <p className="font-semibold text-lg">I am an Individual</p>
                          <p className="text-slate-500 text-center w-auto">For Individual and Creators</p>
                        </Button>
                        <Button color="primary" variant="light" className="text-white p-2 flex flex-col h-auto">
                          <p className="text-slate-500">Verified Organization</p>
                          <p className="font-semibold text-lg">I am an Organization</p>
                          <p className="text-slate-500 text-center w-auto">For businesses, government <br /> agencies and non profits</p>
                        </Button>
                      </ModalBody>
                      <ModalFooter className="flex flex-col">
                        <Button variant="solid" className="rounded-full text-lg font-semibold" onPress={onClose}>
                          Subscibe
                        </Button>

                        <p className="text-sm mt-10 w-full">Learn more about <span className="text-[#1d9bf0]">Premium </span>and <span className="text-[#1d9bf0]">Verified Organizations</span></p>
                      </ModalFooter>
                    </div>
                  )}
                </ModalContent>
              </Modal> */}
            </div>
            <div className="bg-[#16181c] p-4 flex flex-col gap-4 rounded-md w-full ">
              <p className="text-lg font-extrabold ">Who to follow</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black">
          <SignIn />
        </div>
      )}
    </div>
  );
}
