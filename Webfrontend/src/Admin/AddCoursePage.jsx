import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineCloudUpload, 
  HiOutlineArrowLeft, 
  HiOutlineDocumentAdd, 
  HiOutlineVideoCamera, 
  HiOutlineTrash, 
  HiOutlinePlusCircle,
  HiOutlineCheckCircle
} from "react-icons/hi";
import apiClient from '../Services/api';

function AddCoursePage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const { register, handleSubmit, reset, setValue, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      courseId: "",
      courseDocuments: [{ documentName: '', documentDescription: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courseDocuments"
  });

  // Fetch Parent Courses for the Dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/sfs-app/course/all-course');
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        toast.error('Failed to load parent courses');
      }
    };
    fetchCourses();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      const res = await apiClient.post('/sfs-app/upload/upload-img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadedImageUrl(res.data.imageUrl);
      setValue('courseLogoUrl', res.data.imageUrl);
      toast.success('Course logo processed');
    } catch (err) {
      toast.error('Logo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!uploadedImageUrl) return toast.error("Please upload a course logo");
    
    try {
      await apiClient.post('/sfs-app/course/page-add', data);
      toast.success("Curriculum published successfully!");
      reset();
      setUploadedImageUrl("");
      navigate('/dashboard/course-page-manager');
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all text-gray-400">
          <HiOutlineArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-[#0F2B5B]">Build Curriculum</h1>
          <p className="text-gray-500 text-sm">Link videos and documents to a parent course.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Basic Info */}
          <div className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Parent Course</label>
              <select 
                {...register("courseId", { required: "Select a parent course" })}
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-bold text-[#0F2B5B]"
              >
                <option value="">Choose a course...</option>
                {courses.map(c => <option key={c._id} value={c._id}>{c.courseName}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Course Intro Video (URL)</label>
              <div className="relative">
                <HiOutlineVideoCamera className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  {...register("courseVideoUrl", { required: "Video URL is required" })}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0F2B5B] focus:bg-white rounded-2xl pl-14 pr-6 py-4 outline-none transition-all font-bold"
                  placeholder="vimeo.com/..." 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Curriculum Logo</label>
              <label className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${uploadedImageUrl ? 'border-green-400 bg-green-50/20' : 'border-gray-200 hover:border-[#0F2B5B] bg-gray-50'}`}>
                {!uploadedImageUrl ? (
                  <div className="text-center">
                    <HiOutlineCloudUpload size={40} className={`mx-auto mb-2 ${uploading ? 'animate-bounce text-[#0F2B5B]' : 'text-gray-300'}`} />
                    <p className="text-xs font-bold text-gray-500 uppercase">Upload Icon</p>
                  </div>
                ) : (
                  <img src={uploadedImageUrl} className="h-32 object-contain" alt="Preview" />
                )}
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Right Column: Dynamic Documents */}
          <div className="space-y-6 bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Curriculum Modules ({fields.length})</label>
              <button 
                type="button" 
                onClick={() => append({ documentName: '', documentDescription: '' })}
                className="flex items-center gap-1 text-[#0F2B5B] font-black text-xs hover:text-[#7ED957] transition-colors"
              >
                <HiOutlinePlusCircle size={18} /> Add Module
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {fields.map((field, index) => (
                <div key={field.id} className="bg-white p-5 rounded-[1.5rem] border border-gray-200 shadow-sm relative group animate-in slide-in-from-right-4 duration-300">
                  <button 
                    type="button" 
                    onClick={() => remove(index)} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <HiOutlineTrash size={14} />
                  </button>
                  <div className="space-y-3">
                    <input 
                      {...register(`courseDocuments.${index}.documentName`)} 
                      placeholder="Module Title (e.g. Introduction)" 
                      className="w-full text-sm font-black text-[#0F2B5B] outline-none border-b border-gray-100 pb-2 focus:border-[#7ED957] transition-colors"
                    />
                    <textarea 
                      {...register(`courseDocuments.${index}.documentDescription`)} 
                      placeholder="What will students learn?" 
                      className="w-full text-xs text-gray-500 outline-none bg-transparent resize-none"
                      rows="2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0F2B5B] text-white py-6 rounded-3xl font-black text-xl hover:bg-[#1a4185] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? "Syncing Curriculum..." : <><HiOutlineCheckCircle size={24} /> Finalize Course Page</>}
        </button>
      </form>
    </div>
  );
}

export default AddCoursePage;