import React, { useEffect, useState } from 'react';
import apiClient from '../Services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineBookOpen } from 'react-icons/hi';

function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/sfs-app/course/all-course');
        const data = Array.isArray(res.data) ? res.data : [];
        setCourses(data);
      } catch (err) {
        toast.error('Failed to fetch courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await apiClient.delete(`/sfs-app/course/course-delete/${id}`);
      setCourses(prev => prev.filter(c => c._id !== id));
      toast.success('Course deleted');
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
        <div>
          <h2 className="text-3xl font-black text-[#0F2B5B]">Course Catalog</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your educational curriculum and training programs.</p>
        </div>
        <Link 
          to="add-course" 
          className="flex items-center gap-2 bg-[#7ED957] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#6bc24a] transition-all shadow-lg shadow-green-500/20 active:scale-95"
        >
          <HiOutlinePlus size={20} />
          Add New Course
        </Link>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F2B5B]"></div>
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {courses.map((c) => (
            <div 
              key={c._id} 
              className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={c.courseImgUrl}
                  alt={c.courseName}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0F2B5B]">
                  Active Course
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#0F2B5B] rounded-2xl flex items-center justify-center mb-4 -mt-12 relative z-10 border-4 border-white">
                  <HiOutlineBookOpen size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-[#0F2B5B] mb-2 px-2">
                  {c.courseName}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                  {c.courseDescription}
                </p>

                <div className="mt-auto w-full pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleDelete(c._id)} 
                    className="flex items-center justify-center gap-2 w-full text-red-500 bg-red-50 hover:bg-red-500 hover:text-white py-3 rounded-2xl font-bold transition-all duration-300"
                  >
                    <HiOutlineTrash size={18} />
                    Remove Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-300">
          <HiOutlineBookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">No courses found</h3>
          <p className="text-gray-400 text-sm">Start by adding your first educational program.</p>
        </div>
      )}
    </div>
  );
}

export default CourseManager;