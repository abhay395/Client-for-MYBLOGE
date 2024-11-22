import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, featchBlogeByIdAsync, selectBloges, selectSingleBloges } from '../features/Blog/blogeSlice';
import { featchBlogeById } from '../features/Blog/blogeApi';
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { AiFillLike } from "react-icons/ai";

import parse from 'html-react-parser';
import { CircularProgress } from '@nextui-org/react';
import { selectUser } from '../features/User/UserSlice';
import axios from 'axios';
import moment from 'moment';

export default function DetailBloge() {
  const { id } = useParams();
  const variants = ["flat", "faded", "bordered", "underlined"];
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const data = useSelector(selectSingleBloges)
  const loading = useSelector(Loading)
  const [LoadingIncomment, setLoading] = useState(false)
  const [commentes, setcommentes] = useState(null)
  const navigate = useNavigate()
  // console.log(data)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth', // Optional: smooth scrolling animation
    });
  };
  useEffect(() => {
    scrollToTop();
    dispatch(featchBlogeByIdAsync(id));

  }, [dispatch, id]);
  const commenteHandler = () => {
    const comment = {
      postId: data._id,
      contente: value
    }
    axios.post('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/create', comment, {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    }).then(response => {
      setValue("")
      setcommentes([response.data.comment, ...commentes])
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    setLoading(true)
    fetch('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/' + id).then(response => {
      //  setcommentes(response.data)
      return response.json()
      //  console.log(response.data)
    }).
      then((res) => { setLoading(false); setcommentes(res) }).catch((error) => console.log(error))
  }, [])
  const likeHandler = (id) => {
    if (user) {
      axios.patch(`https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/like/${id}`,{}, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message)
        // if(response.data.message === 'liked'){
        setcommentes(() => {
          return commentes.map(comment => {
            if (comment._id === id) {
              comment.numberOfLikes = response.data.numberOfLikes
              comment.likes = response.data.likes
            }
            return comment
          })
        })
        // }
        // else{
        //   setcommentes(()=>{
        //     return commentes.map(comment => {
        //       if(comment._id === id){

        //         comment.numberOfLikes = comment.numberOfLikes - 1
        //       }
        //       return comment
        //     })
        //   })
        // }
      }).catch((error) => {
        console.log(error)
      })
    }
    else {
      navigate('/login')
    }
  }

  return (
    <>
      <div className='min-h-screen animate-fade animate-duration-[1500ms] animate-delay-100 mb-20 ql-snow'>
        {data && loading === false ? (
          <>
            <div className='flex flex-col items-center w-full bg-white justify-center '>
              <h1 className=' text-3xl md:text-4xl mt-7 text-blue-400 font-semibold text-center' >{data.title}</h1>
              <h1 className='text-xl mt-4 font-bold text-center border p-1 rounded-md text-gray-600' >{data.category}</h1>
              <img src={data.url} className='w-[95%] h-[250px] lg:w-[70%] lg:h-[600px] mt-7 rounded-md bg-gray-200 ' alt="" />
            </div>
            {/* <div className='lg:w-[80%]' dangerouslySetInnerHTML={{ __html:  data?.description }} /> */}
            <div className=' flex flex-col justify-center items-center w-full ql-editor '>
              {/* <div className='w-[100%] flex  justify-center sm:w-[80%] '>
         { parse(`<div className="ql-editor w-[70%]">${data?.description}</div>`)}
          </div> */}
              <div
                className='p-6 max-w-4xl text-wrap ql-editor text-sky-950 mx-auto w-full text-sm md:text-lg '
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
              {user ? <div className=" w-[90%] md:w-[50%] flex flex-col rounded-md border-blue-400 border-1 p-8 justify-center">
                <div className='flex items-center md:justify-normal justify-center'><p className='text-[10px] md:text-[15px] text-nowrap ml-4 font-semibold'>Signed in as:</p> <span className='text-blue-600 flex ml-2 p-1 '><Avatar src={user.image} className=" md:w-6 md:h-6 w-4 h-4 text-tiny" /><p className='md:ml-1 md:text-[13px] text-[10px]'>{user.email}</p></span></div>
                <Textarea
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Enter your comment here"
                  className="w-[100%]"
                  value={value}
                  onValueChange={setValue}
                  maxLength={200}
                />
                <div className='flex justify-between items-center mt-4'>
                  <p className='opacity-40 md:text-[15px] text-[13px] '>{200 - value.length} characters remaining</p>
                  {/* <Button className='' color='primary'>Submit</Button> */}
                  <Button color="primary" onClick={commenteHandler} className='w-[20%]  hover:bg-blue-600 hover:text-white ' variant={"bordered"}>
                    Submit
                  </Button>
                </div>

              </div> : (
                <p className='text-blue-500'>You must be logged in to comment. Login</p>
              )}
            </div>
            <div className='w-[100%] flex flex-col items-center '>
              <p className='text-xl mt-5 w-[40%]'>Comments</p>
              <div className=' w-[100%] md:w-[40%]'>
                {!commentes && LoadingIncomment === true ? <div className='flex items-center justify-center w-full'><CircularProgress size='lg' aria-label="Loading..." /></div> : commentes?.map((item, index) => (
                  <article class="p-6  mb-3 text-base  bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                          class="mr-2 w-6 h-6 rounded-full"
                          src={item.userId?.image}
                          alt="Bonnie Green" />{item.userId?.name}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                          title="March 12th, 2022">{moment(item.createdAt).format('MMMM Do YYYY')}</time></p>
                      </div>
                      <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                        <span class="sr-only">Comment settings</span>
                      </button>
                      {/* <!-- Dropdown menu --> */}

                    </footer>
                    <p class="text-gray-500 dark:text-gray-400">{item.contente}</p>
                    <div class="flex items-start justify-start  ">

                      {/* <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg> */}
                      <AiFillLike onClick={() => likeHandler(item._id)} className={`text-2xl ${item.likes?.find((el) => el === user?._id) ? 'text-sky-700' : 'text-opacity-50'} mt-2 cursor-pointer`} /><span className='mt-2 ml-1'>{item.likes.length}</span>

                    </div>
                  </article>
                ))}
                {commentes?.length === 0 && LoadingIncomment === false && <p className='text-center  text-sky-800'>No comments yet</p>}
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
        )}
      </div>
    </>
  );
}

// import React, { useRef, useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import 'react-quill/dist/quill.snow.css';

// import parse from 'html-react-parser';


// export default function DetailBloge() {
//   const editorRef = useRef(null);
//   const [data, setData] = useState('')
//   const log = () => {
//     if (editorRef.current) {
//       setData(editorRef.current.getContent());
//     }
//   };
//   if (data) console.log(data)
//   return (
//     <>
//       <Editor
//         onInit={(evt, editor) => editorRef.current = editor}
//         apiKey='57y0on7rpq5scpoei032obbd2zx2n9d5vy2f5nqmx534xktp'
//         init={{
//           plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
//           toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//           tinycomments_mode: 'embedded',
//           tinycomments_author: 'Author name',
//           mergetags_list: [
//             { value: 'First.Name', title: 'First Name' },
//             { value: 'Email', title: 'Email' },
//           ],
//           ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
//         }}
//         initialValue="Welcome to TinyMCE!"
//       onChange={(value) => {console.log(value)}}
//       />
//       <button onClick={log} className='bg-blue-600 p-5  m-5'>Log editor content</button>
//       {parse(`<div>${data ? data : null}</div>`)}
//       <ul>
//         <li>ajajaajkjazz</li>
//         <li>zaaaa</li>
//         <li>zzzz</li>
//       </ul>
//       <h2>Welcome to TinyMCE!</h2>
//     </>


//   );
// }
