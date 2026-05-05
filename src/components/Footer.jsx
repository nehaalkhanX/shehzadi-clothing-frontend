import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <Link to='/'>
                        <img
                            src={assets.image}
                            alt=""
                            className='w-24 sm:w-28 md:w-32 lg:w-40 mb-5'
                        />

                    </Link>
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Shehzadi is an online clothing store offering thoughtfully curated apparel for men, women, and kids. We bring you everyday essentials and occasion wear designed for comfort, quality, and style — delivered across world.            </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        
                        <li><Link to='/'>Home</Link></li>
                        <li>About us</li>
                        <li>Contact</li>
                        
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+9182920 07107</li>
                        <li>contact@shehzadiclothing.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2026 © Shehzadiclothing.com - All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer