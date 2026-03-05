import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function CoursePageManager() {
  const [pages, setPages] = useState([])

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get('/sfs-app/course/all-pages')
        const pages = Array.isArray(res.data) ? res.data : []
        // Ensure each page has courseDocuments as an array
        const validPages = pages.map(p => ({
          ...p,
          courseDocuments: Array.isArray(p.courseDocuments) ? p.courseDocuments : []
        }))
        setPages(validPages)
      } catch (err) {
        console.error('Failed to load pages', err)
        setPages([])
      }
    }
    fetchPages()
  }, [])

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this course page?')
    if (!ok) return
    try {
      await axios.delete(`/sfs-app/course/page-delete/${id}`)
      setPages(prev => prev.filter(p => p._id !== id))
      toast.success('Page deleted')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete page')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold pl-5 mb-4">Course Pages</h2>
        <Link to="/admin-dashboard/add-course-page" className='hidden lg:block bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer'>
          Add Course Page
        </Link>
      </div>
      <div style={{ height: "calc(100vh - 120px)" }} className="w-full overflow-y-auto space-y-5">
        {pages.map(page => (
          <div key={page._id} className='border-2 border-gray-100 overflow-x-auto rounded-2xl shadow-lg p-5 '>
            <div className='w-full h-auto p-2 flex justify-between items-center '>
              <img
                src={page.courseLogoUrl}
                className=' h-auto object-cover object-center w-20 '
                alt="logo"
              />
              <p className='p-2 hover:underline cursor-pointer  font-semibold text-[#154979]'>{page.courseVideoUrl}</p>
              <button onClick={() => handleDelete(page._id)} className="bg-red-500 px-10 py-3 rounded-lg text-18 font-medium border text-white border-red-500 hover:text-red-500 hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">
                Delete
              </button>

            </div>
            <div className=' border-t-2 border-t-gray-100 flex justify-center '>
              <div className=' rounded-lg p-4 shadow-mentor Shadow flex items-center justify-center'>
                {
                  (page.courseDocuments || []).map(({ _id, documentName, documentDescription }) => (
                    <div key={_id} className="p-2 space-y-2">
                      <p className=' font-bold'>{documentName}</p>
                      <p>{documentDescription}</p>
                    </div>
                  ))
                }
              </div>
            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default CoursePageManager
