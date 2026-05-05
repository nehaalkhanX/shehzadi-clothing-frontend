import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline, IoBagOutline } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    // Note: ensure 'navigate' is spelled correctly in your context exports
    const { getCartCount, setShowSearch, navigate, token, logout, userData } = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium w-full'>
            <Link to='/'>
                <img
                    src={assets.image}
                    alt=""
                    className='w-24 sm:w-28 md:w-32 lg:w-40'
                />

            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collections' className='flex flex-col items-center gap-1'>
                    <p>COLLECTIONS</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-5'>
                <Link to='/collections'><IoSearchOutline onClick={() => setShowSearch(true)} className='w-5 cursor-pointer text-xl' /></Link>

                {/* Profile / Login Section */}
                <div className='group relative'>
                    <div
                        onClick={() => !token && navigate('/login')}
                        className='flex items-center gap-1 cursor-pointer'
                    >
                        <CgProfile className='w-5 text-2xl' />
                        <p>{token && userData ? ((userData.name || userData.username || "User").split(' ')[0]) : "Login"}</p>
                    </div>

                    {/* Dropdown Menu - Only visible on hover if logged in */}
                    {token && (
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <IoBagOutline className='w-5 cursor-pointer text-3xl' />
                    <p className='absolute -right-1.5 top-2.5 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
                <BiMenuAltRight onClick={() => setVisible(true)} className='w-6 cursor-pointer text-3xl sm:hidden' />
            </div>

            {/* Sidebar for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <BiMenuAltRight className='rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/'>HOME</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/collections'>COLLECTION</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/about'>ABOUT</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;