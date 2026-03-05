import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function JobManager() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/sfs-app/admin/all-job')
        setJobs(res.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    fetchJobs()
  }, [])

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this job?')
    if (!ok) return
    try {
      await axios.delete(`/sfs-app/admin/job-delete/${id}`)
      setJobs(prev => prev.filter(j => j._id !== id))
      toast.success('Job deleted')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete job')
    }
  }

  return (
    <div className="p-6">
     
       <div className="flex justify-between items-center">
         <h2 className="text-2xl font-semibold pl-5 mb-4">All Jobs</h2>
        <Link to="/admin-dashboard/add-job" className='hidden lg:block bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer'>
          Add Job
        </Link>
      </div>
      <div style={{ height: "calc(100vh - 130px)" }} className="w-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 items-start lg:grid-cols-3 gap-6 p-5">
        {jobs.map((j) => (
          <div key={j._id} className='group relative shadow-lg p-5'>
            <div className=' overflow-hidden rounded-lg bg-gray-200'>
              <img
                src={j.jobImgUrl}
                width={700}
                className=' h-auto object-cover object-center lg:h-full lg:w-full '
              />
            </div>
            <div className=' flex justify-center  '>

              <div className='border border-white rounded-lg -mt-8 bg-white p-4 shadow-mentor Shadow flex items-center justify-center'>
                <div
                  className='text-xl font-semibold text-[#154979] text-center'>
                  {j.jobTitle}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-3">
              <button onClick={() => handleDelete(j._id)} className="bg-red-500 px-10 py-3 rounded-lg text-18 font-medium border text-white border-red-500 hover:text-red-500 hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobManager
