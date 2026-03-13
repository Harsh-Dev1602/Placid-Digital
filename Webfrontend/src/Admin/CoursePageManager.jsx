import React, { useEffect, useState } from 'react';
import apiClient from '../Services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useLoading } from '../Context/LoadingProvider';
import { HiOutlineTrash, HiOutlinePlusSm, HiOutlineDocumentText, HiOutlineVideoCamera, HiOutlineExternalLink } from 'react-icons/hi';

function CoursePageManager() {
  const [pages, setPages] = useState([]);
  const [, setIsLoading] = useLoading();

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/sfs-app/course/all-pages');
        const pagesData = Array.isArray(res.data) ? res.data : [];
        const validPages = pagesData.map(p => ({
          ...p,
          courseDocuments: Array.isArray(p.courseDocuments) ? p.courseDocuments : []
        }));
        setPages(validPages);
      } catch (err) {
        toast.error('Failed to load course pages');
        setPages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, [setIsLoading]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course page?')) return;
    try {
      await apiClient.delete(`/sfs-app/course/page-delete/${id}`);
      setPages(prev => prev.filter(p => p._id !== id));
      toast.success('Course page removed');
    } catch (err) {
      toast.error('Failed to delete page');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-[#0F2B5B]">Course Pages</h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <HiOutlineDocumentText /> {pages.length} Total Curriculums Published
          </p>
        </div>
        <Link   to="/admin-dashboard/add-course-page" 
          className="flex items-center gap-2 bg-[#164676] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#16467670] transition-all transform active:scale-95 shadow-lg shadow-green-500/20"
        >
          <HiOutlinePlusSm size={20} />
          Add Course Page
        </Link>
      </div>

      {/* Main Content Area */}
      <div style={{ height: "calc(100vh - 250px)" }} className=" pr-4 space-y-6">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div key={page._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
              {/* Top Banner: Logo, Video URL, and Actions */}
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50/50">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={page.courseLogoUrl}
                      className="max-h-full object-contain"
                      alt="course logo"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <HiOutlineVideoCamera /> Lesson Video Link
                    </span>
                    <a 
                      href={page.courseVideoUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[#0F2B5B] font-bold hover:underline flex items-center gap-2 truncate max-w-[250px]"
                    >
                      {page.courseVideoUrl} <HiOutlineExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(page._id)} 
                  className="w-full md:w-auto flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300"
                >
                  <HiOutlineTrash size={18} />
                  Delete Page
                </button>
              </div>

              {/* Documents Section */}
              <div className="p-8">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Course Curriculum & Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(page.courseDocuments || []).length > 0 ? (
                    page.courseDocuments.map(({ _id, documentName, documentDescription }) => (
                      <div key={_id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-[#0F2B5B] rounded-lg group-hover:bg-[#0F2B5B] group-hover:text-white transition-colors">
                                <HiOutlineDocumentText size={18} />
                            </div>
                            <p className="font-black text-[#0F2B5B]">{documentName}</p>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                            {documentDescription}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">No additional documents linked to this course page.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
             <HiOutlineDocumentText size={48} className="text-gray-300 mb-4" />
             <p className="text-gray-400 font-bold">No course pages found.</p>
             <p className="text-gray-400 text-sm">Start by building your first course curriculum!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePageManager;