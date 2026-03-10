import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useAuth } from "../Context/AuthProvider";
import apiClient from '../Services/api';
import { HiLockClosed, HiMail } from 'react-icons/hi'; // Icons for better UX

function LogIn() {
  const [, setAuthUser] = useAuth();

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
      email: data.email,
      password: data.password,
    };

    try {
      const response = await apiClient.post("/sfs-app/admin/admin-login", userInfo);
      const adminData = response.data?.admin || response.data;

      if (adminData) {
        toast.success(response.data?.message || "Login successfully");
        sessionStorage.setItem("Admin", JSON.stringify(adminData));
        setAuthUser(adminData);
      } else {
        toast.error(response.data?.message || "Invalid login response.");
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      toast.error(backendMessage || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC] px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#154979] via-[#7ED957] to-[#154979]"></div>
      
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden">
        {/* Subtle Brand Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7ED957]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#154979] mb-2">Admin Portal</h2>
            <p className="text-gray-400 font-medium">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <HiMail size={20} />
                </span>
                <input
                  className={`w-full rounded-2xl border bg-gray-50 px-12 py-4 text-sm transition-all outline-none focus:bg-white focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-100' : 'border-transparent focus:border-[#154979] focus:ring-blue-50'
                  }`}
                  {...register("email", { required: "Email is required" })}
                  placeholder="admin@placiddigital.in"
                  type="email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <HiLockClosed size={20} />
                </span>
                <input
                  className={`w-full rounded-2xl border bg-gray-50 px-12 py-4 text-sm transition-all outline-none focus:bg-white focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-100' : 'border-transparent focus:border-[#154979] focus:ring-blue-50'
                  }`}
                  {...register("password", { required: "Password is required" })}
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs font-bold ml-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#154979] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0d3152] transform transition-all active:scale-[0.98] shadow-xl shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Placid Digital Pvt. Ltd. <br />
              Secure Admin Access Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;