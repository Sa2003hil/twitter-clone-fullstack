import React, { useCallback } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import TwitterLogo from '../../public/assets/TwiiterLOGO.svg'
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ModalPop() {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleLogOut = useCallback(() => {
        window.localStorage.removeItem('twitter_token');
        toast.success('Logged Out Successfully')
        queryClient.invalidateQueries({ queryKey: ['current-user'] })
    }, [queryClient])

    return (
        <>
            {/* <Button onPress={onOpen} >...</Button> */}
            <button onClick={onOpen}> <HiOutlineDotsHorizontal className="flex items-center justify-center mr-4" /></button>
            {/* <button onClick={onOpen}></button> */}
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
            </Modal>
        </>
    );
}
