import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from "../../public/placidlogo.png";
import apiClient from '../Services/api';
import { 
  HiOutlineViewGrid, 
  HiOutlineBriefcase, 
  HiOutlineCollection, 
  HiOutlineAcademicCap,
  HiOutlineLogout 
} from 'react-icons/hi';

function Sidebar() {
  const navigate = useNavigate();

  const AdminMenu = [
    { id: 0, label: "Dashboard", path: "/dashboard", icon: <HiOutlineViewGrid /> },
    { id: 1, label: "Portfolio", path: "portfolio-manager", icon: <HiOutlineCollection /> },
    { id: 2, label: "Jobs", path: "job-manager", icon: <HiOutlineBriefcase /> },
    { id: 3, label: "Course Pages", path: "course-page-manager", icon: <HiOutlineAcademicCap /> },
  ];

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    
    try {
      await apiClient.post("/sfs-app/admin/admin-logout");
      sessionStorage.removeItem("Admin");
      toast.success("Logged out successfully");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Error in logging out";
      toast.error(backendMessage);
    }
  };

  return (
    <div className="w-72 h-full bg-[#0F2B5B] rounded-[2.5rem] flex flex-col justify-between p-6 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

      <div className="w-full relative z-10">
        {/* Logo Section */}
        <div className="flex justify-center items-center pb-8 mb-6 border-b border-white/10">
          <img 
            src={Logo} 
            alt="Placid Digital" 
            className="w-32 h-auto bg-white p-2 rounded-xl shadow-lg" 
          />
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {AdminMenu.map(({ id, label, path, icon }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  end={path === "/dashboard"}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300
                    ${isActive 
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30 translate-x-2" 
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm tracking-wide">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="relative z-10 pt-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="group w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 py-4 rounded-2xl text-red-500 hover:text-white font-black transition-all duration-300 border border-red-500/20 shadow-lg shadow-red-500/5 active:scale-95"
        >
          <HiOutlineLogout size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;