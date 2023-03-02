import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


function Widgets() {
    return (
        <div className='px-2 mt-2 hidden lg:inline right_side'>
    <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 mb-3'>
    <MagnifyingGlassIcon  className='h-5 w-5 text-gray-500'/>
        <input placeholder='Search tweeter' className='flex-1 outline-none bg-transparent'></input>
    </div>
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="elonmusk"
      options={{height: 550}}
    />
        </div>
      )
}

export default Widgets