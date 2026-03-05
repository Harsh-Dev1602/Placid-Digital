import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Logo from "../../public/placidlogo.png"

function Footer() {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <footer className='border-t border-t-[#15497923]   px-5 md:px-15 py-10'>
                <div className=" container mx-auto flex flex-col md:flex-row justify-between gap-10 pb-10 ">
                    <div className=' md:w-80 flex flex-col  items-start justify-center space-y-5'>
                        <div className=" flex justify-center items-center gap-5">
                            <img src={Logo} className=' bg-white rounded-2xl w-30' />
                           
                        </div>
                        <p className='text-justify leading-6'>Placid Digital Pvt. Ltd. is a fast-growing IT Company that provides holistic IT solutions to businesses across geographies We offer IT expertise in software, website, and application (iOS & Android) development; UI/UX design; and digital marketing.</p>
                    </div>

                    <div className="border-x md:px-15 border-x-[#15497923] space-y-5">
                        <h3 className=' text-[#83C026] font-serif font-bold'>Our Services</h3>
                        <ul className='flex flex-col gap-4'>
                            <Link onClick={scrollTop} className='hover:underline hover:   hover:text-[#83C026]' to="/web-development"> Web Development </Link>
                            <Link onClick={scrollTop} className='hover:underline hover:   hover:text-[#83C026]' to="/digital-marketing"> Digital Marketing</Link>
                            <Link onClick={scrollTop} className='hover:underline hover:   hover:text-[#83C026]' to="/app-development"> App Development</Link>
                            <Link onClick={scrollTop} className='hover:underline hover:   hover:text-[#83C026]' to="/training-program"> Training Services</Link>
                        </ul>
                    </div>

                    <div className=" space-y-5">
                        <h3 className=' text-[#83C026] font-serif font-bold'>Contact Info</h3>
                        <ul className=' space-y-4'>
                            <li className=' flex  gap-2'> <IoLocationSharp />Indore(M.P.) 452001 </li>
                            <li className=' hover:text-blue-700 hover:underline  flex  gap-2'> <MdEmail /> <a href="mailto:info@placididigital.in">info@placididigital.in</a></li>
                            <li className=' flex  gap-2'> <MdAccessTimeFilled /> Office Hours: 10AM – 7PM </li>
                        </ul>
                    </div>


                </div>
                <div className=" border-y border-y-[#15497923] container mx-auto flex flex-col md:flex-row  justify-between gap-5  items-center py-5">
                    <div className=" space-y-2">
                        <h1 className=' font-bold text-2xl text-[#154979]'>Subscribe</h1>
                        <p>Get our latest updates and offers.</p>
                    </div>
                    <div className=" border-4 border-[#48a1112a] rounded-2xl w-full md:w-1/3">
                        <div className="relative">
                            <input type="email" placeholder="Email address..." autoComplete="email" aria-label="Email address" className="block w-full rounded-xl py-4 pl-6 bg-white pr-20 text-xl text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5" />
                            <div className="absolute inset-y-1 right-1 flex justify-end">
                                <button type="submit" aria-label="Submit" className="flex aspect-square h-full items-center p-2 space-x-2 justify-center font-bold text-white rounded-xl bg-[#83C026]">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=" container mx-auto flex flex-col lg:flex-row gap-5 justify-between items-center pt-5">
                    <p>© {new Date().getFullYear()} Placid Digital Private Limited- All Rights Reserved.</p>
                    <div className=" flex justify-center items-center p-2 rounded-2xl gap-5">
                        <FaFacebookSquare className=' text-4xl' />
                        <FaInstagramSquare className=' text-4xl' />
                        <FaLinkedin className=' text-4xl' />
                        <MdEmail className=' text-4xl' />
                    </div>
                </div>

            </footer>
       
        </>
    )
}

export default Footer