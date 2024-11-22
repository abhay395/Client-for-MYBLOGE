import React from "react";
import { Navbar, Dropdown, DropdownTrigger, NavbarBrand, Avatar, DropdownMenu, DropdownItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

import {  useSelector } from "react-redux";
import { selectUser } from "../features/User/UserSlice";


export default function NavbarComponete() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate()

  const menuItems = [
    { name: "Home", slug: '/' },
    // { name: "My Profile", slug: '/myprofile' },
    { name: "About", slug: '/about' },
    { name: "Contact Us", slug: '/contactus' },
  ];

  const data = useSelector(selectUser)

  return (
    <div className="relative">
      <Navbar
        className=""
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3 text-center" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link to='/' className="font-extrabold  text-inherit text-xl">MY BLOG</Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Link to='/' className=" font-extrabold text-inherit text-xl mr-5">MY BLOG</Link>
          </NavbarBrand>
          <NavbarItem>
            <Link to={'/'} color="foreground" >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to='/contactus' aria-current="page">
              Contact us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to='/about'>
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button onPress={onOpen} className={`bg-transparent ${data === null ? "hidden" : "block"} text-red-600`}>Logout</Button>
          </NavbarItem>
        </NavbarContent>



        {data ? <NavbarContent as="div" justify="end" >
          <Dropdown placement="bottom-end" >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={data?.name?.slice(0, 1)}
                size="sm"
                src={data?.image}
              />

            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{data.email ? data.email : data.github}</p>
              </DropdownItem>
              <DropdownItem key="myblogs">My blogs</DropdownItem>
              <DropdownItem key="myprofile" onClick={() => navigate('/myprofile')}>My Profile</DropdownItem>
              <DropdownItem key="create" onClick={() => navigate('/createblog')}>Create blog</DropdownItem>

              {/* <DropdownItem key="logout" onClick={() => navigate('/logout')} color="danger">
                <>
                  Logout

                </>

              </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
          :
          <NavbarContent as="div" justify="end" >
            <Dropdown placement="bottom-end" >
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="guest"
                  size="sm"
                  src="https://api-private.atlassian.com/users/4f5f736dffd9036ec97f3e366931bc7c/avatar"
                />

              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem textValue="Login" onClick={() => navigate('/login')} key="Login ">
                  Login
                </DropdownItem>
                <DropdownItem textValue="Signup" onClick={() => navigate('/signup')} key="Signup">
                  Sign up
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} onClick={() => setIsMenuOpen(false)}>
              <Link
                className={`w-full ${index === 4 ? "text-red-700" : null}`}
                to={`${item.slug}`}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem  >
          <button  onClick={onOpen} className={`bg-transparent ${data === null ? "hidden" : "block"} pr-[50px] text-xl text-red-600 p-0 m-0`}>Logout</button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="top-[150px] absolute">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <p>You realy want to logout</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onClick={() => { setIsMenuOpen(false); navigate('/logout') }} onPress={onClose}>
                    Logout
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
