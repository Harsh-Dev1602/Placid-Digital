import React from 'react';
import Img from "../../public/Img.png";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import apiClient from '../Services/api';

function ContactUs() {


    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isSubmitting }, } = useForm();
    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = async (data) => {
        const userInfo = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            Phnumber: data.Phnumber,
            message: data.message,
        };

        try {
            const response = await apiClient.post("/sfs-app/admin/contact-us", userInfo);

            if (response.data?.success) {
                toast.success(response.data.message || "Message sent successfully");
            } else {
                toast.error(response.data?.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            const backendMessage =
                error.response?.data?.message ||
                error.response?.data?.error;

            const errorMessage =
                backendMessage ||
                (error.code === "ECONNABORTED"
                    ? "Request timed out. Please check your internet connection and try again."
                    : error.message || "Something went wrong. Please try again.");

            toast.error(errorMessage);
        }
    };
    return ( 
        <>
            <div className="py-15 container mx-auto flex justify-center items-end-safe flex-col lg:flex-row">

                <div className="mx-auto space-y-6   max-w-xl text-center">
                    <h1 className="text-[#154979] font-bold italic font-mono">Contact Us</h1>
                    <p className="mt-2 ">Let us help your business
                        to move forward.</p>
                    <img src={Img} />
                </div>

                <section id='contact' className=' px-5'>
                    <div className='w-full md:w-2xl group relative shadow-lg p-5 rounded-2xl container '>
                        <div className='relative'>
                            <h2 className='mb-9 text-[#83C026] font-serif font-bold tracking-tight'>Get in Touch</h2>
                            <form onSubmit={handleSubmit(onSubmit)}

                                className='flex flex-wrap w-full m-auto gap-3 justify-between'>
                                <div className='sm:flex gap-3 w-full'>
                                    <div className='mx-0 space-y-2 flex-1'>
                                        <label className=' inline-block text-base'>
                                            First Name
                                        </label>
                                        <input
                                            type='text'
                                            {...register("firstname", { required: true })}
                                            placeholder='John'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                        {errors.firstname && <span className=' text-red-600 font-semibold'>First name is required</span>}
                                    </div>
                                    <div className='mx-0 space-y-2 flex-1'>
                                        <label className=' inline-block text-base'>
                                            Last Name
                                        </label>
                                        <input
                                            type='text'
                                            {...register("lastname", { required: true })}

                                            placeholder='Doe'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                        {errors.lastname && <span className=' text-red-600 font-semibold'>Last name is  required</span>}
                                    </div>
                                </div>
                                <div className='sm:flex gap-3 w-full'>
                                    <div className='mx-0 space-y-2 flex-1'>
                                        <label className=' inline-block text-base'>
                                            Email address
                                        </label>
                                        <input
                                            type='email'
                                            {...register("email", { required: true })}
                                            placeholder='john.doe@example.com'
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                        {errors.email && <span className=' text-red-600 font-semibold'>Email id is required</span>}
                                    </div>
                                    <div className='mx-0 space-y-2 flex-1'>
                                        <label
                                            className=' inline-block text-base'>
                                            Phone Number
                                        </label>
                                        <input
                                            type='tel'
                                            placeholder='+1234567890'
                                            {...register("Phnumber", { required: true })}
                                            className='w-full text-base px-4 rounded-2xl py-2.5 border-solid border transition-all duration-500 focus:border-[#154979] focus:outline-0'
                                        />
                                        {errors.Phnumber && <span className=' text-red-600 font-semibold'>Phone number is required</span>}
                                    </div>
                                </div>
                                <div className='w-full mx-0 space-y-2 flex-1'>
                                    <label className='text-base inline-block'>
                                        Message
                                    </label>
                                    <textarea
                                        name='Message'
                                        {...register("message", { required: true })}
                                        className='w-full mt-2 rounded-2xl px-5 py-3 border-solid border transition-all duration-500 focus:border-[#154979]  min-h-20 max-h-28  focus:outline-0'
                                        placeholder='Anything else you wanna communicate'></textarea>
                                    {errors.message && <span className=' text-red-600 font-semibold'>Message is required</span>}
                                </div>
                                <div className='mt-5 space-y-2 w-full'>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="border cursor-pointer leading-none px-6 text-lg font-medium py-4 rounded-xl bg-[#154979] bg-primary border-[#154979] text-white hover:bg-transparent hover:text-[#154979] disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Sending..." : "Submit"}
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