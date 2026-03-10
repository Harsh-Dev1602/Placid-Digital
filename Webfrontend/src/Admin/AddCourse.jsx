import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { HiOutlineCloudUpload, HiOutlineBookOpen, HiOutlineCheckCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import apiClient from '../Services/api';

function AddCourse() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue, watch } = useForm();
  
  const [uploading, setUploading] = React.useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState("");

  // Watch fields for live preview
  const courseName = watch("courseName", "Course Title");
  const courseDescription = watch("courseDescription", "Your course description will appear here...");

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    const userInfo = {
      courseImgUrl: uploadedImageUrl,
      courseName: data.courseName,
      courseDescription: data.courseDescription,
    };

    try {
      await apiClient.post("/sfs-app/course/course-add", userInfo);
      toast.success("Course added successfully!");
      reset();
      setUploadedImageUrl("");
      navigate('/dashboard/course-page-manager'); // Go back to list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add course");
    }
  };

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
      setValue('courseImgUrl', res.data.imageUrl);
      toast.success('Image processed');
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#0F2B5B]">Create New Course</h1>
        <p className="text-gray-500 mt-2 text-lg">Set up a new educational program for your platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* --- Left: Form --- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Course Banner</label>
            <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${uploadedImageUrl ? 'border-green-500 bg-green-50/30' : 'border-gray-200 hover:border-[#0F2B5B] bg-gray-50'}`}>
              {!uploadedImageUrl ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <HiOutlineCloudUpload className={`text-4xl mb-2 ${uploading ? 'animate-bounce text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-bold text-gray-500">{uploading ? 'Processing Image...' : 'Click to upload course image'}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-green-600">
                  <HiOutlineCheckCircle className="text-4xl mb-1" />
                  <span className="text-xs font-bold uppercase">Image Secured</span>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </label>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Course Name</label>
            <input 
              className={`w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-semibold ${errors.courseName ? 'border-red-500' : ''}`}
              {...register("courseName", { required: "Name is required" })} 
              placeholder="e.g. Full Stack Web Development" 
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Description</label>
            <textarea 
              rows="4"
              className={`w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-semibold resize-none ${errors.courseDescription ? 'border-red-500' : ''}`}
              {...register("courseDescription", { required: "Description is required" })} 
              placeholder="Briefly describe what students will learn..." 
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full bg-[#0F2B5B] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#1a4185] transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Generating Course..." : "Publish Course"}
          </button>
        </form>

        {/* --- Right: Live Preview --- */}
        <div className="sticky top-10">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 block mb-4">Card Preview</label>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden max-w-sm mx-auto opacity-80 border-dashed border-2">
             <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {uploadedImageUrl ? (
                    <img src={uploadedImageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                    <HiOutlineBookOpen className="text-6xl text-gray-200" />
                )}
             </div>
             <div className="p-6 text-center">
                <h3 className="text-xl font-black text-[#0F2B5B] truncate">{courseName || "Course Title"}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{courseDescription || "Description..."}</p>
                <div className="mt-6 pt-4 border-t border-gray-50">
                    <div className="w-full h-10 bg-gray-100 rounded-xl"></div>
                </div>
             </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-6 italic">This is how your course will appear on the main website.</p>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;