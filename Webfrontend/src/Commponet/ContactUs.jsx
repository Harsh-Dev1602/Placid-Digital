import React from 'react'
import Img from "../../public/Img.png";

function ContactUs() {
    return (
        <>
            <div className="py-20 container mx-auto flex justify-center items-end-safe flex-col lg:flex-row">

                <div className="mx-auto space-y-6   max-w-xl text-center">
                    <h1 className="text-[#154979] font-bold italic font-mono">Contact Us</h1>
                    <p className="mt-2 ">Let us help your business
                        to move forward.</p>
                    <img src={Img} />
                </div>

                <section id='contact'>
                    <div className='w-full md:w-2xl group relative shadow-lg p-5 rounded-2xl container '>
                        <div className='relative'>
                            <h2 className='mb-9 text-[#83C026] font-serif font-bold tracking-tight'>Get in Touch</h2>
                            <form

                                className='flex flex-wrap w-full m-auto justify-between'>
                                <div className='sm:flex gap-3 w-full'>
                                    <div className='mx-0 my-2.5 flex-1'>
                                        <label htmlFor='fname' className='pb-3 inline-block text-base'>
                                            First Name
                                        </label>
                                        <input
                                            id='fname'
                                            type='text'
                                            name='firstname'


                                            placeholder='John'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                    </div>
                                    <div className='mx-0 my-2.5 flex-1'>
                                        <label htmlFor='lname' className='pb-3 inline-block text-base'>
                                            Last Name
                                        </label>
                                        <input
                                            id='lname'
                                            type='text'
                                            name='lastname'

                                            placeholder='Doe'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                    </div>
                                </div>
                                <div className='sm:flex gap-3 w-full'>
                                    <div className='mx-0 my-2.5 flex-1'>
                                        <label htmlFor='email' className='pb-3 inline-block text-base'>
                                            Email address
                                        </label>
                                        <input
                                            id='email'
                                            type='email'
                                            name='email'

                                            placeholder='john.doe@example.com'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                    </div>
                                    <div className='mx-0 my-2.5 flex-1'>
                                        <label
                                            htmlFor='Phnumber'
                                            className='pb-3 inline-block text-base'>
                                            Phone Number
                                        </label>
                                        <input
                                            id='Phnumber'
                                            type='tel'
                                            name='phnumber'
                                            placeholder='+1234567890'

                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                    </div>
                                </div>
                                <div className='w-full mx-0 my-2.5 flex-1'>
                                    <label htmlFor='message' className='text-base inline-block'>
                                        Message
                                    </label>
                                    <textarea
                                        id='message'
                                        name='Message'

                                        className='w-full mt-2 rounded-2xl px-5 py-3 border-solid border transition-all duration-500 focus:border-[#154979]  min-h-20 max-h-28  focus:outline-0'
                                        placeholder='Anything else you wanna communicate'></textarea>
                                </div>
                                <div className='mx-0 my-2.5 w-full'>
                                    <button
                                        type='submit'

                                        className={`border leading-none px-6 text-lg font-medium py-4 rounded-xl  bg-[#154979]
                                               bg-primary border-[#154979] text-white hover:bg-transparent hover:text-[#154979] 
                                            }`}>
                                        Submit
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ContactUs