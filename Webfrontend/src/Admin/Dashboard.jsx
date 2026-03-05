import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Dashboard() {
    return (
        <div className="w-full mx-auto flex  h-screen">
            <Sidebar />
            <div className=' container mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard