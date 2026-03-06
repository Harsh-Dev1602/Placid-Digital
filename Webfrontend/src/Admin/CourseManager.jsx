import React, { useEffect, useState } from 'react'
import apiClient from '../Services/api'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function CourseManager() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/sfs-app/course/all-course')
        const courses = Array.isArray(res.data) ? res.data : []
        setCourses(courses)
      } catch (err) {
        console.log(err.response?.data?.message || err.message || 'Failed to fetch courses')
        setCourses([])
      }
    }
    fetchCourses()
  }, [])

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this course?')
    if (!ok) return
    try {
      await apiClient.delete(`/sfs-app/course/course-delete/${id}`)
      setCourses(prev => prev.filter(c => c._id !== id))
      toast.success('Course deleted')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete course')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold pl-5 mb-4">All Courses</h2>
        <Link to="add-course" className='hidden lg:block bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer'>
           Add Course
        </Link>
      </div>
      <div style={{ height: "calc(100vh - 130px)" }} className="w-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 items-start  lg:grid-cols-3 gap-6 p-5">
        {courses.map((c) => (
          <div key={c._id} className='group relative shadow-lg p-5'>
            <div className=' overflow-hidden rounded-lg bg-gray-200'>
              <img
                src={c.courseImgUrl}
                width={700}
                className=' h-auto object-cover object-center lg:h-full lg:w-full '
              />
            </div>
            <div className=' flex justify-center  '>

              <div className='border border-white rounded-lg -mt-8 bg-white p-4 shadow-mentor Shadow flex items-center justify-center'>
                <div
                  className='text-xl font-semibold text-[#154979] text-center'>
                  {c.courseName}
                </div>
              </div>
            </div>
            <p className="p-2 text-center text-gray-700">{c.courseDescription}</p>

            <div className="flex justify-center items-center">
              <button onClick={() => handleDelete(c._id)} className="bg-red-500 px-10 py-3 rounded-lg text-18 font-medium border text-white border-red-500 hover:text-red-500 hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default CourseManager