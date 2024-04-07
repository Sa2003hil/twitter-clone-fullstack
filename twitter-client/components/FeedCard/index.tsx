import React from "react"
import Image from 'next/image'
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";

const FeedCard: React.FC = () => {
    return <div className="border border-r-0 border-l-0 border-b-0 border-gray-700 p-4 hover:bg-slate-950 transition-all cursor-pointer">
        <div className="grid grid-cols-12">
            <div className="col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/115913715?v=4" className="rounded-full" alt="" height={60} width={60} />
            </div>
            <div className="col-span-11">
                <div className="flex gap-2">
                    <h5 className="font-medium">Sahil</h5>
                    <p className="text-[#71767b] text-sm">@sa2003hil</p>

                </div>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eveniet molestias tempora, itaque esse et magnam numquam soluta quidem!</p>
                <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
                    <div>
                        <FiMessageCircle size={20} className="" />
                    </div>
                    <div>
                        <AiOutlineRetweet size={20} />
                    </div>
                    <div>
                        <CiHeart size={20} />
                    </div>
                    <div>
                        <FiUpload size={20} />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedCard