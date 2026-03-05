import React, { useEffect } from 'react'
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


function Navbar() {
    const [openMenu, setMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [sticky, setSticky] = useState(false)
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    const handleScroll = () => {
        setSticky(window.scrollY >= 10)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const navText = [
        {
            id: 0,
            text: "Home",
            link: "/"
        },
        {
            id: 2,
            text: "About Us",
            link: "/about"
        },
        {
            id: 3,
            text: "Portfolio",
            link: "/portfolio"
        },
        {
            id: 4,
            text: "Career",
            link: "/career"
        },
        {
            id: 5,
            text: "Contact",
            link: "/contact"
        },
    ]

    return (
        <>
            <header
                className={`z-40 w-full bg-white transition-all duration-300 ${sticky ? 'shadow-lg fixed top-0 ' : ' shadow-none'
                    }`}>
                <div className={`bg-[#82c02610]   md:px-5 p-5 flex justify-between items-center text-[15px] md:text-xl ${sticky ? "hidden" : "flex"}`}>

                    <ul className='flex flex-col items-center  md:flex-row gap-2 md:gap-5'>
                        <li className=' font-semibold  flex items-center  gap-1'> <IoLocationSharp /> Indore(M.P.) 452001 </li>
                        <li className=' hover:text-blue-700 hover:underline font-semibold items-center flex  gap-1'> <MdEmail /><a href="mailto:info@placididigital.in">info@placididigital.in</a> </li>

                    </ul>

                    <div className=" flex flex-col md:flex-row justify-center items-center gap-2">
                        <p className=' font-semibold'>Connect Us:</p>
                        <div className=" grid grid-cols-2 sm:grid-cols-4 sm:gap-2">
                            <FaFacebookSquare className=' font-semibold text-2xl' />
                            <FaInstagramSquare className=' font-semibold text-2xl' />
                            <FaLinkedin className=' font-semibold text-2xl' />
                            <MdEmail className=' font-semibold text-2xl' />
                        </div>
                    </div>

                </div>
                <div className="flex border-y border-y-[#15497923]  mx-auto items-center justify-evenly z-50 w-full px-6  py-3 ">
                    <Link onClick={scrollTop} to="/" className=' flex justify-center items-center gap-2'>
                        <img src="../../public/placidlogo.png" className='w-48' />

                    </Link>

                    <div className="hidden border-x border-x-[#15497923] py-2 px-5 items-center md:gap-5 lg:flex ">
                        {navText.map(({ id, text, link }) => (
                            <Link onClick={scrollTop} to={link} key={id} className="text-base flex font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md">
                                {text}
                            </Link>
                        ))}
                        <li
                            className=" list-none relative cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <div className="flex text-base font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md items-center  gap-1">
                                Services

                                <IoIosArrowDropdown className="w-4 h-4 mt-1" />
                            </div>

                            {open && (
                                <div onMouseLeave={() => setOpen(false)} className="absolute top-15 left-0 bg-white text-black border border-[#15497923] w-52 rounded-md overflow-hidden transition-all duration-300 shadow-lg p-2">

                                    <Link onClick={scrollTop}
                                        to="/web-development"
                                        className="text-base flex font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md"
                                    >
                                        Web Development
                                    </Link>

                                    <Link onClick={scrollTop} to="/app-development"
                                        className="text-base flex font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md"
                                    >
                                        App Development
                                    </Link>

                                    <Link onClick={scrollTop} to="/digital-marketing"

                                        className="text-base flex font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md"
                                    >
                                        Digital Marketing
                                    </Link>

                                </div>
                            )}
                        </li>

                    </div>

                    <Link onClick={scrollTop} to="/training-program" className='hidden lg:block bg-[#154979] text-white  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg text-xl font-semibold hover:cursor-pointer'>
                        Training Program
                    </Link>

                    <div className="lg:hidden block text-3xl cursor-pointer" onClick={() => setMenu(!openMenu)}>
                        {openMenu ? <> <RiCloseFill /> <div className="fixed z-30 top-0 right-0 w-full h-screen bg-transparent"></div> </> : <IoMenu />}
                    </div>

                </div>

                {
                    openMenu && (
                        <div className="w-60 h-auto  left-0 fixed top-0 lg:hidden z-80  ">
                            <div style={{ maxHeight: "100vh" }}>
                                <nav style={{ minHeight: "100vh" }} className=' w-full overflow-y-auto rounded-tr-xl p-4 group relative shadow-lg  flex justify-center items-start  gap-1 flex-col bg-white'>
                                    {
                                        navText.map(({ id, text, link }) => (
                                            <Link onClick={scrollTop} to={link} key={id} className="text-base font-medium  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md">
                                                {text}
                                            </Link>

                                        ))

                                    }
                                    <li
                                        className=" list-none relative cursor-pointer"
                                        onClick={() => setOpen(true)}
                                    >
                                        <div className="flex capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md  items-center font-semibold gap-1">
                                            Services
                                            <IoIosArrowDropdown className="w-4 h-4 mt-1" />
                                        </div>

                                        {open && (
                                            <div onMouseLeave={() => setOpen(false)} className="absolute top-7 left-0 bg-white text-black border border-[#154979] w-52 rounded-md overflow-hidden transition-all duration-300 shadow-lg p-2">

                                                <Link
                                                    to="/web-development"
                                                    className="block px-4 capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md]"
                                                >
                                                    Web Development
                                                </Link>

                                                <Link
                                                    to="/app-development"
                                                    className="block px-4  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md"
                                                >
                                                    App Development
                                                </Link>

                                                <Link to="/digital-marketing"
                                                    className="block px-4  capitalized hover:bg-[#154979] hover:text-white p-2 rounded-md"
                                                >
                                                    Digital Marketing
                                                </Link>

                                            </div>
                                        )}
                                    </li>

                                    <Link onClick={scrollTop} to="/training-program" className=' bg-[#154979] text-white text-base font-medium hover:bg-transparent duration-300 hover:text-[#154979] border mt-5 border-primary px-6 py-2 rounded-lg hover:cursor-pointer'>
                                        Training Program
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    )
                }

            </header>

        </>
    )
}

export default Navbar