import React from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { BsImage, BsEmojiSmile } from "react-icons/bs"
import { RiBarChart2Line } from "react-icons/ri"
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { HiOutlineLocationMarker } from "react-icons/hi"

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'





import { PhotoIcon } from "@heroicons/react/24/outline";
import { GifIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
function Input() {

    const { data: session } = useSession()
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)


    const addImageToPost = (e) => {

        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }

    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    const sendPost = async () => {
        if (loading)
            return

        setLoading(true)
      

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
            image:selectedFile
        })

      

        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)

    }









  return (
    <div className={` px-4 ${loading && "opacity-60"} border-y py-3`}>
          <div className='grid grid-cols-[48px,1fr] gap-4'>
          <div>
                    <img className='h-12 w-12 rounded-full object-contain' src={session?.user?.image} alt="" />
          </div>


          <div className='w-[90%]'>
          <textarea
                        className='w-[100%] bg-transparent outline-none text-[20px]'
                        rows="2"
                        placeholder="What's Happening?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)} />

{selectedFile && (

<div className="relative mb-4">
    <div className='absolute w-8 h-8 bg-[#15181c] hover:[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
        <AiOutlineClose className='text-white h-5' />
    </div>

    <img
        src={selectedFile}
        alt=""
        className='rounded-2xl max-h-80 object-contain' />

</div>

)}

{!loading && (
                        <div className='flex justify-between items-center'>

                            <div className='flex gap-4 text-[20px] text-[#1d9bf0]'>

                                <label htmlFor="file">
                                   
                                    <PhotoIcon className=' h-5 w-5 cursor-pointer transition-transform duration-100 ease-out hover:scale-150'/>
                                </label>

                                <input id="file" type="file"
                                    hidden
                                    onChange={addImageToPost}
                                />

                                <div className=' h-[18px] text-[16px] grid place-items-center'>
                                
                                <GifIcon className='h-5 w-5 cursor-pointer '/>
                                </div>
                            
                                <Squares2X2Icon className="h-5 w-5 cursor-pointer " />
                                <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform duration-100 ease-out hover:scale-150' onClick={() => setShowEmojis(!showEmojis)}/>
                                 <CalendarIcon className='h-5 w-5 cursor-pointer '/>
                                <MapPinIcon  className='h-5 w-5 cursor-pointer '/>
                            </div>

                            <button
                                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                disabled={!input.trim() && !selectedFile}
                                onClick={sendPost} >
                                Tweet
                            </button>

                        </div>
                    )}
                       {showEmojis && (
                        <div className='absolute mt-[10px] -ml-[40px] max-w-[320px] rounded-[20px]'>
                            <Picker
                                onEmojiSelect={addEmoji}
                                data={data}

                                theme="dark"
                            />
                        </div>
                    )}

          </div>


          </div>
    </div>
  )
}

export default Input