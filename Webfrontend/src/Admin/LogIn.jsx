import React from 'react'

import { useForm } from "react-hook-form";
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { useAuth } from "../Context/AuthProvider";

function LogIn() {
  const [authUser, setAuthUser] = useAuth();

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, } = useForm()
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios.post("/sfs-app/admin/admin-login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successfully");
        }
         sessionStorage.setItem("Admin", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };
  return (
    <>
      <div className=" mx-auto my-20 p-5 group relative shadow-lg space-y-4 max-w-96">

            <h3 className="text-[#154979] font-bold text-center">Welcome Admin</h3>
             <p className='text-center text-md font-semibold text-gray-700'>sign up to continue</p>
          <form onSubmit={handleSubmit(onSubmit)} className="form  mx-auto space-y-4">
            <div className="w-full flex flex-col gap-2">
              <input className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("email", { required: true })}  placeholder="Please enter admin email id" type="email" />
              {errors.email && <span className=' text-red-600 font-semibold'>This field is required</span>}
            </div>
            <div className="w-full flex flex-col gap-2">
              <input className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("password", { required: true })} placeholder="Please enter admin password" type="password" />
              {errors.password && <span className=' text-red-600 font-semibold'>This field is required</span>}
            </div>
            <button className="bg-[#154979] w-full py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">Log in</button>
          </form>
      </div>
    </>
  )
}


export default LogIn