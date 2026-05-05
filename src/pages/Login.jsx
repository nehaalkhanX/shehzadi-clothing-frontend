import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { token, setToken, navigate, backendUrl, setUserData } = useContext(ShopContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/auth/login', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)

        setUserData(response.data.user);
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Login</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      <input
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p onClick={() => navigate('/signup')} className='cursor-pointer'>Create account</p>
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign In</button>
    </form>
  )
}

export default Login