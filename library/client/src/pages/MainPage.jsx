import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    console.log(popularPosts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-3xl text-center text-white py-10'>
                Книжок немає
            </div>
        )
    }

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <form
                className="w-4/5 mx-auto py-1 bg-white rounded-lg shadow-md px-2 relative">
                <div className="flex absolute inset-x-0 top-0 h-9 items-center pl-5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input 
                    type="text" 
                    className="bg-gray-80 border-gray-100 text-sm rounded-lg w-3/4 pl-10 p-1"
                    placeholder="Введіть для пошуку..." >
                </input>
                <input 
                    type="submit"
                    className="w-1/5 ml-2 py-1 text-black border rounded-lg hover:text-gray-400 relative"
                    value="Пошук"
                    >
                </input>
            </form>
            <div className='flex justify-between gap-10'>
                <div className='min-w-[400px] pl-20 pt-10 flex flex-col gap-10'>
                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} />
                    ))}
                </div>
                <div className='basis-2/5'>
                    <div className='text-sm text-black backdrop-opacity-5 backdrop-invert bg-white rounded-sm mt-8 px-4 py-2 w-60'>
                        Рекомендації:
                    </div>

                    {popularPosts?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
