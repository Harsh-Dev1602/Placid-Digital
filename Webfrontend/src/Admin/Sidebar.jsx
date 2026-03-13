import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from "../../public/placidlogo.png";
import apiClient from '../Services/api';
import {
  HiOutlineViewGrid,
  HiOutlineBriefcase,
  HiOutlineCollection,
  HiOutlineAcademicCap,
  HiOutlineLogout,
  HiMenuAlt2,
  HiX
} from 'react-icons/hi';

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile state

  const AdminMenu = [
    { id: 0, label: "Overview", path: "/dashboard", icon: <HiOutlineViewGrid /> },
    { id: 1, label: "Portfolio", path: "portfolio-manager", icon: <HiOutlineCollection /> },
    { id: 2, label: "Jobs", path: "job-manager", icon: <HiOutlineBriefcase /> },
    { id: 3, label: "Curriculums", path: "course-page-manager", icon: <HiOutlineAcademicCap /> },
  ];

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await apiClient.post("/sfs-app/admin/admin-logout");
      sessionStorage.removeItem("Admin");
      toast.success("Session closed safely");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* --- Mobile Header & Toggle --- */}
      <div className="lg:hidden w-full flex items-center justify-between p-4 bg-white text-white fixed top-0 z-50 shadow-xl">
        <img src={Logo} alt="Logo" className="h-8  text-black p-1 rounded-lg" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/10 rounded-xl hover:bg-[#7ed9572e] text-[#0F2B5B] transition-all"
        >
          {isOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
        </button>
      </div>

      {/* --- Backdrop for Mobile --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- Sidebar Container --- */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 h-screen flex flex-col justify-between p-6 bg-white text-black shadow-2xl transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>

        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#164676] blur-[120px] opacity-20 pointer-events-none" />

        <div className="w-full relative z-10">
          <div className="flex flex-col items-center pb-10 mb-6 border-b border-white/5">
            <img src={Logo} alt="Placid Digital" className="w-36 h-auto drop-shadow-2xl mb-2" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] ">Admin Console</span>
          </div>

          <nav>
            <ul className="space-y-1.5">
              {AdminMenu.map(({ id, label, path, icon }) => (
                <li key={id}>
                  <NavLink
                    to={path}
                    end={path === "/dashboard"}
                    onClick={() => setIsOpen(false)} // Auto-close on mobile selection
                    className={({ isActive }) => `
                      flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-black duration-500 group
                      ${isActive
                        ? "bg-[#164676] text-white shadow-xl shadow-[#7ED957]/20 scale-105"
                        : " "
                      }
                    `}
                  >
                    <span className="text-xl group-hover:rotate-12 transition-transform duration-500">{icon}</span>
                    <span className="text-sm tracking-tight">{label}</span>
                    {({ isActive }) => isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-[#0F2B5B] rounded-full animate-pulse" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="group w-full flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 py-4 rounded-2xl text-red-500 hover:text-white font-black transition-all duration-500 border border-red-500/10 active:scale-95"
        >
          <HiOutlineLogout size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Safe Exit</span>
        </button>

      </div>
    </>
  );
}

export default Sidebar;