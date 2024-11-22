import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'
import { setUser } from '../features/User/UserSlice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, CircularProgress } from "@nextui-org/react";
export default function LogoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  async function logout() {
    const res = await axios.get('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/logout', {
      headers: {
        "authorization": localStorage.getItem('token'),
      },
    });
    console.log(res)
    if (res.status === 200) {
      // localStorage.clear()
      localStorage.removeItem('token');
      dispatch(setUser(null))
      navigate('/')
    }
  }
  useEffect(() => {
    logout()
  }, [])
  return (

    <div className='flex items-center justify-center w-full min-h-[600px]'><CircularProgress size='lg' aria-label="Loading..." /></div>

  )
}
