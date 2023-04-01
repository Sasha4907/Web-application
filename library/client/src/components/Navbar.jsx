import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {
        color: 'gray',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Ви вийшли із системи')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
            {<span className='flex justify-center items-center px-10 py-4'>
            </span>}

            { isAuth && (  
                <ul className='flex gap-8 backdrop-opacity-5 backdrop-invert bg-white/50 text-sm rounded-sm px-10 py-2'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-black hover:text-gray-600'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Головна
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-black hover:text-gray-600'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мої публікації
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-black hover:text-gray-600'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Додати публікацію
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/save'}
                            href='/'
                            className='text-black hover:text-gray-600'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Збережені книжки
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='flex justify-center items-center backdrop-opacity-5 backdrop-invert bg-white/50 text-sm text-black rounded-sm px-4 py-2 hover:text-gray-600'>
                { isAuth ?(
                    <button onClick={logoutHandler}>Вихід</button>
                ) : (
                    <Link to={'/login'}> Увійти </Link>)
                }
            </div>
        </div>
    )
}
