import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from "../../public/placidlogo.png";
import apiClient from '../Services/api';

function Sidebar() {
    const AdminMenu = [
        { id: 0, label: "Dashboard", path: "" },
        { id: 1, label: "Portfolio", path: "portfolio-manager" },
        { id: 2, label: "Jobs", path: "job-manager" },
        { id: 3, label: "Course Pages", path: "course-page-manager" },
    ]

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;
        try {
            await apiClient.post("/sfs-app/admin/admin-logout");
            sessionStorage.removeItem("Admin");
            toast.success("Log out successfully..");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        catch (error) {
            console.log("Error in Logout", error);
            const backendMessage =
                error.response?.data?.message ||
                error.response?.data?.error;
            const errorMessage =
                backendMessage ||
                (error.code === "ECONNABORTED"
                    ? "Logout request timed out. Please check your connection and try again."
                    : error.message || "Error in logging out");
            toast.error(errorMessage);
        }
    };
    return (
        <>
            <div className="group bg-[#15497919] rounded-l-4xl relative border-r-2  border-r-gray-200 p-5 w-96   flex flex-col justify-between items-center">
                <div className="w-full">
                    <div className=' border-b-2 pb-5 border-b-gray-200 flex justify-center items-center gap-2'>
                        <img src={Logo} className='w-30 h-auto rounded-2xl ' />

                    </div>
                    <ul className='mt-5 flex flex-col p-2'>
                        {
                            AdminMenu.map(({ id, label, path }) => (
                                <Link to={path} key={id} className="  p-4 hover:bg-gray-200 rounded-xl font-semibold flex gap-2">{label}</Link>
                            ))
                        }
                    </ul>
                </div>
                <button onClick={handleLogout} className="bg-red-500 w-full py-3 rounded-lg text-18 font-medium border text-white border-red-500 hover:text-red-500 hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">Log out</button>


            </div>
        </>
    )
}

export default Sidebar