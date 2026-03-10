import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Dashboard() {
    return (
        <div className="flex h-screen w-full bg-[#F0F4F8] overflow-hidden">
            {/* Left Sidebar Section */}
            <div className="h-full">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden py-4 px-4">
                <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-gray-200/50 overflow-y-auto relative">

                    {/* Page Content padding */}
                    <div className="">
                        <Outlet />
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Dashboard