import React, { useContext, useEffect, useState } from 'react'

import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'

import Moment from 'react-moment'

import { db } from "../firebase"
import { useRouter } from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { useSession } from "next-auth/react"
import { AppContext } from '../context/AppContext'






import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";



function Post({ id, post }) {
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
  
    const { data: session } = useSession()
    const router = useRouter()
  
    const [appContext, setAppContext] = useContext(AppContext)
  
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => setComments(snapshot.docs)
        ),
      [db, id]
    )
  
    useEffect(
      () =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
          setLikes(snapshot.docs)
        ),
      [db, id]
    )
  
    useEffect(() =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ), [likes]
    )
  
    const likePost = async () => {
      if (liked) {
        await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.name,
        });
      }
    }
  
    const openModal = () => {
      setAppContext({
        ...appContext, 
        isModalOpen: true,
        post,
        postId: id
      })
  
      console.log('opening model ', appContext.post);
    }
  return (
    <div className='hover:bg-gray-100 transition-all duration-300 border-t  px-4 pt-6 pb-4 cursor-pointer' onClick={() => router.push(`/${id}`)}>
    <div className='grid grid-cols-[48px,1fr] gap-4'>

      <div>
        <img className='h-12 w-12 rounded-full object-cover' src={post?.userImg} alt="" />
      </div>

      <div>
        <div className='block sm:flex gap-1'>
          <h1 className='font-bold'>{post?.username}</h1>

          <div className='flex flex-1'>
            <p className='text-gray-500'>@{post?.tag} &nbsp;·&nbsp;</p>
            <p className='text-gray-500 '>
              <Moment className='' fromNow>{post?.timestamp?.toDate()}</Moment>
            </p>
            
            
          </div><EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />


        </div>
        <p>{post?.text}</p>
        <img
          className='max-h-[450px] object-cover rounded-[20px] mt-2'
          src={post?.image}
          alt="" />


        <div className='flex justify-between text-[20px] mt-4 w-[80%] items-center'>

          <div className='flex gap-1 items-center'>
          <ChatBubbleOvalLeftIcon  onClick={(e) => {
              e.stopPropagation()
              openModal()
            }}   className="h-5 w-5 text-gray-500  hover:text-sky-600 transition-transform duration-100 ease-out hover:scale-150" />
            
            {comments.length > 0 && (<span className='text-sm'>{comments.length}</span>)}
          </div>

          {session.user.uid !== post?.id ? (
            // <FaRetweet className='hoverEffect w-7 h-7 p-1' />
            <ArrowPathRoundedSquareIcon className="h-5 w-5 text-gray-500 hover:text-green-500 transition-transform duration-100 ease-out hover:scale-150" />

          ) : (
          

              < ArchiveBoxXMarkIcon className='h-5 w-5 text-gray-500 hover:text-black-500 transition-transform duration-100 ease-out hover:scale-150'  onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
              }}/>
          )}


          <div className='flex gap-1 items-center'
            onClick={(e) => {
              e.stopPropagation()
              likePost()
            }}>
            {liked ? <AiFillHeart className='hoverEffect w-7 h-7 p-1 text-rose-500' />
              :  <HeartIcon className="h-5 w-5 text-gray-500 hover:text-rose-500 transition-transform duration-100 ease-out hover:scale-150" />}

            {likes.length > 0 && (<span className={`${liked && "text-rose-500"} text-sm`}>{likes.length}</span>)}
          </div>

          <ArrowUpTrayIcon className="h-5 w-5 text-gray-500 hover:text-amber-500 transition-transform duration-100 ease-out hover:scale-150" />
        </div>

      </div>

    </div>
  </div>
  )
}

export default Post