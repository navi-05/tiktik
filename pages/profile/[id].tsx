import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { IUser, Video } from '@/types';
import { BASE_URL } from '@/utils';

interface Iprops {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data } : Iprops) => {

    const [showUserVideos, setShowUserVideos] = useState(true)
    const [videoList, setVideoList] = useState<Video[]>([])

    const { user, userVideos, userLikedVideos } = data; 

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

    useEffect(() => {
        if(showUserVideos) setVideoList(userVideos) 
        else setVideoList(userLikedVideos)
    }, [showUserVideos, userLikedVideos, userVideos])

    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 md:w-32 aspect-square'>
                    <Image 
                    src={user.image}
                    width={120}
                    height={120}
                    className="rounded-full"
                    alt='user-profile'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='flex gap-1 text-2xl tracking-wider items-center justify-center text-md font-bold text-primary lowercase'>
                    {user.userName.replace(' ', '')}
                    <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400 text-xs'>{user.userName}</p>
                </div>
            </div>

            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}> Videos</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}> Liked</p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {videoList?.length > 0 ? (
                        videoList.map((post: Video, i: number) => (
                            <VideoCard post={post} key={i} />
                        ))
                    ) : (
                        <NoResults text={`No ${showUserVideos ? '' : 'liked'} videos yet`} />
                    )}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ 
    params: { id }
} : {
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile; 