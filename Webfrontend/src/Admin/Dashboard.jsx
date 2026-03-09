import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Dashboard() {
    return (
        <div className="w-full overflow-y-auto bg-gray-100 mx-auto flex px-5  h-screen">
            <Sidebar />
            <div className='rounded-r-4xl  container mx-auto bg-white'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard