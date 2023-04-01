import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='bg-white/50 rounded-sm my-1'>
            <Link
                to={`${post._id}`}
                className='flex text-sm p-2 text-black hover:bg-white'
            >
                {post.title}
            </Link>
        </div>
    )
}
