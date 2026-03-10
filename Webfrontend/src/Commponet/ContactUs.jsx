import React from "react";
import Img from "../../public/Img.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiClient from "../Services/api";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

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
        toast.error(response.data?.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="bg-white py-24 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Section: Info & Illustration */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Let’s Start a <span className="text-green-500">Conversation</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md">
              Have a question or a project in mind? Our team is ready to help your business grow.
            </p>
          </div>

          {/* Contact Badges */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/30">
              <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-green-100">
                <MdEmail />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Email Us</p>
                <p className="text-sm font-bold text-gray-800">info@placiddigital.in</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-gray-50/30">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-gray-200">
                <MdPhone />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Call Us</p>
                <p className="text-sm font-bold text-gray-800">+919589274777</p>
              </div>
            </div>
          </div>

          <div className="relative pt-10">
             <div className="absolute -z-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60 bottom-0 left-0"></div>
             <img src={Img} alt="Contact Illustration" className="w-full max-w-md mx-auto lg:mx-0  animate-float" />
          </div>
        </div>

        {/* Right Section: Modern Form */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">First Name</label>
                <input
                  {...register("firstname", { required: "Required" })}
                  placeholder="John"
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">Last Name</label>
                <input
                  {...register("lastname", { required: "Required" })}
                  placeholder="Doe"
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Required" })}
                placeholder="john@example.com"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Phone Number</label>
              <input
                {...register("Phnumber", { required: "Required" })}
                placeholder="+91 00000 00000"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-2">Your Message</label>
              <textarea
                {...register("message", { required: "Required" })}
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none text-gray-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all shadow-xl shadow-green-100 disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

export default ContactUs;