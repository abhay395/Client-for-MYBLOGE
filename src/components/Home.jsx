import React, { useEffect, useState } from 'react'
import NavbarComponete from './Navbar'
import Footer from './Footer'
import axios from "axios"
import { CircularProgress, useSelect } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Loading, featchBlogesAsync, selectBloges } from '../features/Blog/blogeSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Home() {
  const navigate = useNavigate()
  const a = moment("2024-03-05T10:24:09.352Z").format('MMMM Do YYYY');
  console.log(a)
  const loading = useSelector(Loading)
  const data = useSelector(selectBloges)
  const dispatch = useDispatch()
  console.log(data)
  useEffect(() => {
    if (data?.length <= 4) {
      dispatch(featchBlogesAsync())
    }
  }, [])
  return (
    <>
      <div>
        {loading === true && data === null ?
          <div className='flex items-center justify-center w-full md:h-screen h-[500px] '><CircularProgress size='lg' aria-label="Loading..." /></div> :
          <section className="flex flex-col items-center w-full bg-white">
            <div className="relative items-center w-full px-5 py-0 mx-auto md:px-12 lg:px-20 max-w-7xl">

              <div className="grid grid-cols-1 gap-6 py-12 md:gap-x-24 md:grid-cols-2 lg:grid-cols-2">
                {data?.map((item, index) => {
                  if (index < 2) {
                    return <figure key={index} className={`${index === 0 ? "animate-fade-right" : "animate-fade-left"}`}>
                      <Link to={`/detaile/${item._id}`}><img className=" w-[700px] h-[250px] sm:h-[350px] lg:w-[500px] lg:h-[300px] hover:scale-105 transition-all duration-500 cursor-pointer rounded-xl bg-gray-200 " src={item.url} alt="" /></Link>

                      <p className="mt-5 text-sm font-medium text-blue-400 leading-6 uppercase ">
                        {item.category}
                      </p>
                      <p className="mt-3 pr-4 text-base  text-gray-600 font-bold">
                        {item.title}
                      </p>
                      <div className="flex gap-3 mt-5 justify-left">
                        <div className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200  focus:outline-none " >
                          <div className='rounded-full w-[25px] h-[25px] overflow-hidden'>
                            <img src={item.userId.image != null ? `${item.userId.image}` : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='} className=' w-[25px] bg-cover' alt="k" />
                          </div>
                          <div> <span className='text-gray-500 ml-3 font-semibold' >{item.userId?.name}</span>
                            <span className='text-gray-500 ml-3' >&#x2022;</span></div>
                          <span className='text-gray-500 ml-3'>{moment(item.createdAt).startOf('hour').fromNow()}</span>
                        </div>
                      </div>
                    </figure>
                  }
                })}
              </div>
              <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((item, index) => {

                  if (index >= 2 && index < 5) return <Link className={`${index === 0 ? "animate-fade-right" : index === 1 ? "animate-fade-up" : "animate-fade-left"}`} to={`/detaile/${item._id}`} key={index}>
                    <img className="  w-[700px] h-[250px]  sm:h-[350px] lg:w-[500px] lg:h-[300px] hover:scale-105 transition-all duration-500 cursor-pointer rounded-xl bg-gray-200 " src={item.url} alt="" />

                    <p className="mt-5 text-sm font-medium text-blue-400 leading-6 uppercase ">
                      {item.category}
                    </p>
                    <p className="mt-3 text-base  text-gray-600 font-bold">
                      {item.title}
                    </p>
                    <div className="flex gap-3 mt-5 justify-left">
                      <div className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200  focus:outline-none " >
                        <div className='rounded-full w-[25px] h-[25px] overflow-hidden'>
                        <img
                          src={item.userId.image
                            ? `${item.userId.image}`
                            : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
                          className="w-full h-full object-cover"
                          alt="User"
                        />
                        </div>
                        <div> <span className='text-gray-500 ml-3 font-semibold' >{item.userId?.name}</span>
                          <span className='text-gray-500 ml-3' >&#x2022;</span></div>
                        <span className='text-gray-500 ml-3'>{moment(item.createdAt).startOf('hour').fromNow()}</span>
                      </div>
                    </div>
                  </Link>

                })}
              </div>
            </div>
            <button onClick={() => navigate('/allblog')} className="text-gray-700 border mb-4 border-gray-600 py-2 px-3 rounded inline-flex items-center">
              View More
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                viewBox="0 0 24 24" className="w-6 h-6 ml-2">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </section>}
      </div>


    </>
  )
}
