import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const { user } = useSelector((state) => state.auth)
    const { comments } = useSelector((state) => state.comment)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            toast('Пост був видалений')
            navigate('/posts')
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({ postId, comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }
    
    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])
    
    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])
    
    useEffect(() => {
        fetchPost()
    }, [fetchPost])
    
    useEffect(() => {
        fetchComments()
    }, [fetchComments])
    
    if (post) {
        return (
            <div>
                <button className='flex justify-center items-center backdrop-opacity-5 backdrop-invert bg-white/50 text-sm text-black rounded-sm px-4 py-2 hover:text-gray-600'>
                    <Link className='flex' to={'/'}>
                        Назад
                    </Link>
                </button>
    
                <div className='flex gap-10 py-8'>
                    <div className='w-2/3'>
                        <div className='flex flex-col basis-1/4 flex-grow'>
                            <div
                                className={
                                    post?.imgUrl
                                        ? 'flex rouded-sm h-80'
                                        : 'flex rounded-sm'
                                }
                            >
                                {post?.imgUrl && (
                                    <img
                                        src={`http://localhost:3002/${post.imgUrl}`}
                                        alt='img'
                                        className='object-cover w-full'
                                    />
                                )}
                            </div>
                        </div>
    
                        <div className='flex justify-between items-center pt-2'>
                            <div className='text-sm text-white opacity-50'>
                                {post.username}
                            </div>
                            <div className='text-sm text-white opacity-50'>
                                <Moment date={post.createdAt} format='D MMM YYYY' />
                            </div>
                        </div>
                        <div className='text-white text-xl'>{post.title}</div>
                        <p className='text-white opacity-60 text-sm pt-4'>
                            {post.text}
                        </p>
    
                        <div className='flex gap-3 items-center mt-2 justify-between'>
                            <div className='flex gap-3 mt-4'>
                                <button className='flex items-center justify-center gap-2 text-sm text-white opacity-50'>
                                    <AiFillEye /> <span>{post.views}</span>
                                </button>
                                <button className='flex items-center justify-center gap-2 text-sm text-white opacity-50'>
                                    <AiOutlineMessage />{' '}
                                    <span>{post.comments?.length || 0} </span>
                                </button>
                            </div>
    
                            {user?._id === post.author && (
                                <div className='flex gap-3 mt-4'>
                                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                                        <Link to={`/${params.id}/edit`}>
                                            <AiTwotoneEdit />
                                        </Link>
                                    </button>
                                    <button
                                        onClick={removePostHandler}
                                        className='flex items-center justify-center gap-2  text-white opacity-50'
                                    >
                                        <AiFillDelete />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='w-1/3 p-8 bg-white/50 flex flex-col gap-2 rounded-sm'>
                        <form
                            className='flex gap-2'
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type='text'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Коментар'
                                className='text-black w-full bg-white/10 border p-2 text-sm outline-none placeholder:text-gray-600'
                            />
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className='flex justify-center items-center bg-white/50 text-sm text-black rounded-sm py-2 px-4 hover:text-gray-600'
                            >
                                Відправити
                            </button>
                        </form>
    
                        {comments?.map((cmt) => (
                            <CommentItem key={cmt._id} cmt={cmt} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}