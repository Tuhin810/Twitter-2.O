import React from 'react'
import SidebarLink from './SidebarLink'


import { BsThreeDots, BsTwitter } from "react-icons/bs"

import { signOut, useSession } from 'next-auth/react'



import { HomeIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {

    const {data: session} = useSession()

    return (
        <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full  pr-0 xl:pr-8'>
            <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0 xl:ml-24'>
                <BsTwitter className='text-[#1d9bf0] text-[34px]' />
            </div>
            <div className='space-y-2 mt-0 mb-2.5 xl:ml-24'>
             

<SidebarLink Icon={HomeIcon} title="Home" />
        <SidebarLink Icon={HashtagIcon } title="Explore" className="text-bold " />
        <SidebarLink Icon={BellIcon } title="Notifications" />
        <SidebarLink Icon={EnvelopeIcon} title="Messages" />
        <SidebarLink Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarLink Icon={UserIcon} title="Profile" />
        <SidebarLink Icon={EllipsisHorizontalCircleIcon} title="More" />
            </div>

            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]">
                Tweet
            </button>

            <div
                className="text-[#000000] flex items-center justify-center mt-auto hoverEffect xl:ml-auto xl:-mr-5 px-4 py-4 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200"
                onClick={signOut}
            >
                <img
                    src={session?.user?.image}
                    alt=""
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session?.user?.name}</h4>
                    <p className="text-[#636666]">@{session?.user?.tag}</p>
                </div>
                <BsThreeDots className="h-5 hidden xl:inline ml-10" />
            </div>

        </div>
    )
}

export default Sidebar