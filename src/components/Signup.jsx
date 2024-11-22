import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { SigninUserAsync, authLoading, checkdata } from '../features/Auth/AuthSlice'
import { featchUserAsync, selectUser } from '../features/User/UserSlice'
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const check= useSelector(selectUser)
  const navigate = useNavigate()
  const onSubmit =  (data) => {
    axios.post('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/signup', data).then((res) => {
      console.log(res.data)
      dispatch(featchUserAsync())
      navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    if (check) dispatch(featchUserAsync())
  }, [check])
  return (
    <>
      {/* https://play.tailwindcss.com/MIwj5Sp9pw */}
      { check && <Navigate to ='/' replace={true}  ></Navigate>}
      <form onSubmit={handleSubmit(onSubmit)} className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")'
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">
         
          </h2> */}
            <p className="text-3xl text-gray-600 font-bold text-center">Welcome</p>
            {/* <div
            className="flex items-center flex-wrap justify-center mt-4 gap-2 sm:flex-nowrap text-white rounded-lg"
          >
          </div> */}
            <div className="mt-4 flex items-center justify-between">
              {/* <span className="border-b w-1/5 lg:w-1/4" /> */}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                {...register("password", { required: true })}
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div className="mt-8">
              <button type='submit' className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Sign up
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4" />
              <Link to='/login' className="text-xs text-gray-500 uppercase">
                or Login
              </Link>
              <span className="border-b w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </form>
    </>



  )
}
