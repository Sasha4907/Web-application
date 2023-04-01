import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-2/5 h-60 mx-auto mt-40'
        >
            <h1 className='text-xl text-white text-center'>Авторизація</h1>
            <label className='text-sm text-white'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-white py-1 px-2 text-sm outline-none placeholder:text-gray-350'
                />
            </label>

            <label className='text-sm text-white'>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='mt-1 text-black w-full rounded-lg bg-white py-1 px-2 text-sm outline-none placeholder:text-gray-350'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-sm bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Увійти
                </button>
                <Link
                    to='/register'
                    className='flex justify-center items-center text-sm text-white'
                >
                    Не зареєстровані?
                </Link>
            </div>
        </form>
    )
}
