import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import Logo from "../../public/placidlogo.png";

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
            await axios.post("/sfs-app/admin/admin-logout");
            sessionStorage.removeItem("Admin");
            toast.success("Log out successfully..");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        catch (error) {
            console.log("Error in Logout", error);
            toast.error("Error in logging out");
        }
    };
    return (
        <>
            <div className="group relative shadow-lg p-5 w-96   flex flex-col justify-between items-center">
                <div className="w-full">
                    <div className=' border-b-2 pb-5 border-b-[#154979] flex justify-center items-center gap-2'>
                        <img src={Logo} className='w-30 h-auto rounded-2xl ' />

                    </div>
                    <ul className='mt-5 flex flex-col p-2 gap-2'>
                        {
                            AdminMenu.map(({ id, label, path }) => (
                                <Link to={path} key={id} className=" hover:text-[#83C026] p-1 hover:underline font-semibold flex gap-2">{label}</Link>
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