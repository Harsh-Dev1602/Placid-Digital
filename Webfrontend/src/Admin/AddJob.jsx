import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCloudUpload, HiOutlineBriefcase, HiOutlineArrowLeft, HiOutlineCheckCircle, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import apiClient from '../Services/api';

function AddJob() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm();
  
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Live preview watchers
  const previewTitle = watch("jobTitle", "Job Position Title");
  const previewType = watch("jobType", "Full-time");
  const previewLocation = watch("location", "Remote / Office");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await apiClient.post('/sfs-app/upload/upload-img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedImageUrl(res.data.imageUrl);
      setValue('jobImgUrl', res.data.imageUrl);
      toast.success('Banner image ready');
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload a job banner first");
      return;
    }

    try {
      const payload = {
        jobImgUrl: uploadedImageUrl,
        jobTitle: data.jobTitle,
        jobType: data.jobType || 'Full-time',
        location: data.location || 'Remote'
      };

      await apiClient.post("/sfs-app/admin/job-add", payload);
      toast.success("New career opportunity posted!");
      reset();
      setUploadedImageUrl("");
      navigate('/dashboard/job-manager'); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add job");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors text-gray-400 shadow-sm"
        >
          <HiOutlineArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#0F2B5B]">Post Opportunity</h1>
          <p className="text-gray-500 text-sm font-medium">Find the next great talent for Placid Digital.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* --- Form Section --- */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-6">
            
            {/* Job Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Position Title</label>
              <input 
                className={`w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-lg ${errors.jobTitle ? 'border-red-500' : ''}`}
                {...register("jobTitle", { required: "Position name is required" })} 
                placeholder="e.g. Senior Full Stack Developer" 
              />
            </div>

            {/* Type & Location Split */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Job Type</label>
                 <input 
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold"
                   {...register("jobType")} 
                   placeholder="e.g. Full-time" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Location</label>
                 <input 
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold"
                   {...register("location")} 
                   placeholder="e.g. Remote / New York" 
                 />
               </div>
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Job Banner Image</label>
              <label className={`relative group flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${uploadedImageUrl ? 'border-green-400 bg-green-50/20' : 'border-gray-200 hover:border-[#0F2B5B] bg-gray-50'}`}>
                {!uploadedImageUrl ? (
                  <div className="text-center px-6">
                    <HiOutlineCloudUpload className={`text-4xl mx-auto mb-2 ${uploading ? 'animate-bounce text-[#0F2B5B]' : 'text-gray-300'}`} />
                    <p className="text-sm font-bold text-gray-500">{uploading ? 'Processing Image...' : 'Click to upload banner'}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-green-600">
                    <HiOutlineCheckCircle className="text-5xl mb-2" />
                    <button type="button" onClick={() => setUploadedImageUrl("")} className="text-xs font-bold text-red-500 hover:underline">Replace Banner</button>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className="w-full bg-[#0F2B5B] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#1a4185] transition-all shadow-2xl shadow-blue-900/30 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Add Job Opportunity"}
            </button>
          </form>
        </div>

        {/* --- Right Column: Preview --- */}
        <div className="lg:col-span-2 space-y-6 sticky top-10">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Live Listing Preview</label>
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
            {/* Card Image */}
            <div className="relative h-44 bg-gray-100">
                {uploadedImageUrl ? (
                    <img src={uploadedImageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                         <HiOutlineBriefcase size={60} />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-[#7ED957] text-[#0F2B5B] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Live
                </div>
            </div>
            
            {/* Card Body */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-black text-[#0F2B5B] leading-tight">{previewTitle}</h3>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs bg-gray-50 px-3 py-2 rounded-xl">
                  <HiOutlineClock className="text-[#0F2B5B]" />
                  {previewType}
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs bg-gray-50 px-3 py-2 rounded-xl">
                  <HiOutlineLocationMarker className="text-[#0F2B5B]" />
                  {previewLocation}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0F2B5B] rounded-[2rem] text-white">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
               <HiOutlineCheckCircle className="text-[#7ED957]" />
               Recruitment Ready
            </h4>
            <p className="text-[11px] text-blue-200 leading-relaxed">
              Once published, this job will be visible on the "Careers" page. Applicants will be able to submit their CVs directly to your database.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddJob;