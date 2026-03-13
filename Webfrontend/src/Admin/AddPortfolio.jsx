import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiOutlineCheckCircle, HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import apiClient from '../Services/api';

function AddPortfolio() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setValue, watch } = useForm();
  
  const [uploading, setUploading] = React.useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState("");

  // Live preview tracking
  const portfolioTitle = watch("portfolisName", "Project Title");

  React.useEffect(() => {
    if (!isSubmitting && uploadedImageUrl === "") {
      reset();
    }
  }, [uploadedImageUrl, isSubmitting, reset]);

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first");
      return;
    }

    const payload = {
      portfolisImgUrl: uploadedImageUrl,
      portfolisName: data.portfolisName,
    };

    try {
      const res = await apiClient.post("/sfs-app/admin/portfolio-add", payload);
      toast.success(res.data?.message || "Portfolio item added successfully");
      reset();
      setUploadedImageUrl("");
      navigate('/dashboard/portfolio-manager'); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add portfolio item");
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
      setValue('portfolisImgUrl', res.data.imageUrl);
      toast.success('Image processed');
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors text-gray-500"
        >
          <HiOutlineArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-4xl font-black text-[#0F2B5B]">Add Project</h1>
          <p className="text-gray-500 font-medium">Showcase your latest work to the world.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        
        {/* --- Form Section (3/5 width) --- */}
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="lg:col-span-3 space-y-8 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50"
        >
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Display Image</label>
            <label className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 ${uploadedImageUrl ? 'border-[#164676] bg-green-50/20' : 'border-gray-200 hover:border-[#0F2B5B] bg-gray-50'}`}>
              {!uploadedImageUrl ? (
                <div className="flex flex-col items-center justify-center text-center px-6">
                  <div className={`p-4 rounded-full mb-4 ${uploading ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <HiOutlineCloudUpload className={`text-4xl ${uploading ? 'animate-bounce text-[#0F2B5B]' : 'text-gray-400'}`} />
                  </div>
                  <p className="text-sm font-bold text-gray-500">{uploading ? 'Processing Pixels...' : 'Click to upload project screenshot'}</p>
                  <p className="text-xs text-gray-400 mt-2">Recommended: 16:9 ratio (e.g. 1920x1080)</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-[#164676]">
                  <HiOutlineCheckCircle className="text-5xl mb-2" />
                  <span className="text-sm font-black uppercase tracking-widest">Image Secured</span>
                  <button type="button" onClick={(e) => {e.preventDefault(); setUploadedImageUrl("")}} className="mt-4 text-xs text-red-500 underline">Change Image</button>
                </div>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </label>
          </div>

          {/* Title Input */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Project Name</label>
            <input 
              className={`w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-[1.5rem] px-8 py-5 outline-none transition-all font-bold text-lg ${errors.portfolisName ? 'border-red-500' : ''}`}
              {...register("portfolisName", { required: "A project needs a name" })} 
              placeholder="e.g. Modern E-commerce Redesign" 
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full bg-[#0F2B5B] text-white py-6 rounded-[1.5rem] font-black text-xl hover:bg-[#1a4185] transition-all shadow-2xl shadow-blue-900/30 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Syncing..." : "Add to Portfolio"}
          </button>
        </form>

        {/* --- Live Preview Section (2/5 width) --- */}
        <div className="lg:col-span-2 sticky top-10 space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2 block">Live Gallery Preview</label>
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden group">
             {/* Preview Card */}
             <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {uploadedImageUrl ? (
                    <img src={uploadedImageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                    <HiOutlinePhotograph className="text-7xl text-gray-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <h3 className="text-white font-black text-xl">{portfolioTitle || "Project Title"}</h3>
                </div>
             </div>
             
             <div className="p-6 flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase">Status</p>
                   <p className="text-xs font-bold text-[#164676]">Live on Website</p>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                    <HiOutlinePhotograph />
                </div>
             </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
            <h4 className="text-[#0F2B5B] font-bold text-sm mb-2 flex items-center gap-2">
                💡 Pro Tip
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              High-resolution screenshots of the homepage or dashboard perform 40% better in converting potential clients. Ensure your title is descriptive.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddPortfolio;