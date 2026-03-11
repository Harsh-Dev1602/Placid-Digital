import React, { useEffect, useState } from 'react';
import apiClient from '../Services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useLoading } from '../Context/LoadingProvider';
import { HiOutlineBriefcase, HiOutlinePlusSm, HiOutlineTrash, HiOutlineLocationMarker } from 'react-icons/hi';

function JobManager() {
  const [jobs, setJobs] = useState([]);
  const [, setIsLoading] = useLoading();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/sfs-app/admin/all-job');
        const jobsData = Array.isArray(res.data) ? res.data : [];
        setJobs(jobsData);
      } catch (err) {
        toast.error('Failed to load career openings');
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [setIsLoading]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this job listing?')) return;
    try {
      await apiClient.delete(`/sfs-app/admin/job-delete/${id}`);
      setJobs(prev => prev.filter(j => j._id !== id));
      toast.success('Job listing removed');
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-[#0F2B5B]">Career Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage open positions and recruitment for Placid Digital.</p>
        </div> 
        <Link    to="/admin-dashboard/add-job" 
          className="flex items-center gap-2 bg-[#7ED957] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#6bc24a] transition-all transform active:scale-95 shadow-lg shadow-green-500/20"
        >
          <HiOutlinePlusSm size={20} />
          Post New Job
        </Link>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {jobs.length > 0 ? (
          jobs.map((j) => (
            <div 
              key={j._id} 
              className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={j.jobImgUrl}
                  alt={j.jobTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#0F2B5B] uppercase tracking-widest shadow-sm">
                  Hiring
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-[#0F2B5B] rounded-2xl">
                    <HiOutlineBriefcase size={24} />
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#0F2B5B] mb-2 leading-tight">
                  {j.jobTitle}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-6">
                   <HiOutlineLocationMarker />
                   <span>Remote / Office</span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleDelete(j._id)} 
                    className="w-full flex items-center justify-center gap-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white py-4 rounded-2xl font-bold transition-all duration-300"
                  >
                    <HiOutlineTrash size={18} />
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
             <HiOutlineBriefcase size={48} className="mx-auto text-gray-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-400">No active job listings</h3>
             <p className="text-gray-400 text-sm">Create a job post to start receiving applications.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobManager;