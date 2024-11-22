import { CircularProgress } from '@nextui-org/react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { featchBlogesAsync, selectBloges, totalblogs } from '../features/Blog/blogeSlice';
import { Loading } from '../features/Blog/blogeSlice';
import { Link } from 'react-router-dom';

export default function AllBlog() {
  const data = useSelector(selectBloges)
  const total = useSelector(totalblogs)
  const loading = useSelector(Loading)

  const [pages, setpage] = useState(1)
  const [limit, setlimit] = useState(4)
  const totalPages = Math.ceil(total / limit)
  // let limit = 4;
  const dispatch = useDispatch()
  console.log(total)
  const NextpageHandler = () => {
    if (pages < total) {
      let page = pages + 1
      setpage(page)
      dispatch(featchBlogesAsync(page, limit))
    }
  }
  const PreviouspageHandler = () => {
    if (pages < total) {
      let page = pages - 1
      setpage(page)
      dispatch(featchBlogesAsync(page, limit))
    }
  }
  window.scrollTo({
    top: 0,
    // behavior: 'smooth', // Optional: smooth scrolling animation
  });
  useEffect(() => {
    dispatch(featchBlogesAsync(1))
  }, [])
  return (
    <div>
      {
        data && loading === false ?
          (<section className="flex flex-col items-center w-full bg-white">
            <h1 className='text-4xl mt-7 font-semibold' >Blog</h1>
            <h1 className='text-xl mt-4 font-thin ' >See All Blogswe have ever written.

            </h1>
            <div className="relative items-center w-full px-5 py-0 mx-auto md:px-12 lg:px-20 max-w-7xl">

              <div className="grid grid-cols-1 gap-6 py-12 md:mx-6 mx-0 md:grid-cols-2 lg:grid-cols-2">
                {data?.map((item, index) => {
                  return <figure key={index} className={`${index % 2 === 0 ? "animate-fade-right" : "animate-fade-left"}`}>
                    <Link to={`/detaile/${item._id}`}><img className=" w-[700px] h-[250px] lg:w-[500px] lg:h-[300px] hover:scale-105 transition-all duration-500 cursor-pointer rounded-xl bg-gray-200 " src={item.url} alt="" /></Link>

                    <p className="mt-5 text-sm font-medium text-blue-400 leading-6 uppercase ">
                      {item.category}
                    </p>
                    <p className="mt-3 pr-4 text-base  text-gray-600 font-bold">
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
                        <span className='text-gray-500 ml-3'>{moment(item.createdAt).format('MMMM Do YYYY')}</span>
                      </div>
                    </div>
                  </figure>
                })}
              </div>

            </div>
            <nav className="inline-flex mb-14 ">
              <button onClick={PreviouspageHandler} disabled={pages === 1} className="flex items-center py-2 px-3 text-sm font-medium select-none border-2 text-gray-500  bg-white  transition-colors rounded-s-md border-e-0"
              >
                &lt;
                Previous
              </button>
              <button disabled={totalPages === pages} onClick={NextpageHandler} className="flex items-center py-2 px-3 text-sm rounded-e-md border-2 font-medium select-none  text-gray-600 bg-white transition-colors "
              >
                Next
                &gt;
              </button>
            </nav>
          </section>) : (
            <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
          )
      }
    </div>
  )
}
