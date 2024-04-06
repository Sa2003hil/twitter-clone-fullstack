import React, { useCallback } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import TwitterLogo from '../../public/assets/TwiiterLOGO.svg'
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ModalPopPremium() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogOut = useCallback(() => {
    window.localStorage.removeItem('twitter_token');
    toast.success('Logged Out Successfully')
    queryClient.invalidateQueries({ queryKey: ['current-user'] })
  }, [queryClient])

  return (
    <>
      <button onClick={onOpen} className="bg-sky-600  py-2 px-8 rounded-full text-white font-semibold text-center flex justify-center items-center w-[50%]">Subscribe</button>
      <Modal
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
      </Modal>
    </>
  );
}
