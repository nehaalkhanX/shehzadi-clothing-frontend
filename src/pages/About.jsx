import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Shehzadi is a direct-to-consumer clothing brand based in Jaipur, India, founded with a simple goal: to make well-designed, comfortable apparel accessible to families across the country.</p>
              <p>The brand started as a partnership between two co-founders — one focused on building the technology and customer experience, the other on merchandising and product. We wanted to create an online clothing destination where you could shop for the whole family in one place: men's, women's, and kids' wear, all curated under a single trusted label.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at Shehzadi is to offer thoughtfully curated clothing that fits real lives and real budgets. We focus on three things — fit and comfort that hold up to daily wear, materials that feel good against the skin, and a shopping experience that's clear, fast, and dependable from browsing to delivery.
We're a young brand and still growing every day. Every product we add, every page we polish, and every order we ship is part of building something we want our customers to come back to.</p>
          </div>
      </div>

      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About