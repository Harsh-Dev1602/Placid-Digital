import React, { useEffect, useState } from 'react';
import apiClient from '../Services/api'; // Switched to your custom apiClient for consistency
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useLoading } from '../Context/LoadingProvider';
import { HiOutlineTrash, HiOutlinePlusSm, HiOutlinePhotograph } from 'react-icons/hi';

function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [, setIsLoading] = useLoading();

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/sfs-app/admin/all-portfolio');
        const itemsData = Array.isArray(res.data) ? res.data : [];
        setItems(itemsData);
      } catch (err) {
        toast.error('Failed to fetch portfolio items');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [setIsLoading]);

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this work from the portfolio?')) return;
    try {
      await apiClient.delete(`/sfs-app/admin/portfolio-delete/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
      toast.success('Portfolio item removed');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl text-[#0F2B5B] font-black">Work Showcase</h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <HiOutlinePhotograph /> {items.length} Total Projects Managed
          </p>
        </div>
        <Link to="/admin-dashboard/add-portfolio" 
          className="flex items-center gap-2 bg-[#7ED957] text-white px-6 py-3 rounded-2xl font-black hover:bg-[#7ed9575c] transition-all transform active:scale-95 shadow-lg shadow-black/10"
        >
          <HiOutlinePlusSm size={20} />
          Add New Project
        </Link>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {items.length > 0 ? (
          items.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Preview Area */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={item.portfolisImgUrl}
                  alt={item.portfolisName}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <span className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                      {item.portfolisName}
                   </span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="p-6 flex items-center justify-between bg-white border-t border-gray-50">
                <div className="flex flex-col">
                   <span className="text-xs font-black text-gray-400 uppercase tracking-tighter">Project Name</span>
                   <span className="text-[#0F2B5B] font-bold truncate max-w-[150px]">{item.portfolisName}</span>
                </div>
                
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 group/btn"
                >
                  <HiOutlineTrash size={20} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
             <HiOutlinePhotograph size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-gray-400 font-bold">No portfolio projects found.</p>
             <p className="text-gray-400 text-sm">Let's showcase your amazing work to the world!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioManager;