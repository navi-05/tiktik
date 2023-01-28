import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'
interface IProps {
  text: string, 
}

const NoResults = ({ text } : IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        { text === 'No comments yet, be the first one to add one!' 
          ? <BiCommentX /> : <MdOutlineVideocamOff />
        }
      </p>
      <p className='text-gray-400 text-center'>{text}</p>
    </div>
  )
}

export default NoResults