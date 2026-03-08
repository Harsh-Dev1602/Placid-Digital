import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaRegPlayCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLoading } from '../Context/LoadingProvider'

function CourseDetails() {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setIsLoading] = useLoading()

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`/sfs-app/course/course-details/${id}`)
                
                // Ensure coursePage is an array
                const courseData = res.data || {}
                if (!Array.isArray(courseData.coursePage)) {
                    courseData.coursePage = []
                }
                
                setCourse(courseData)
                setError(null)
            } catch (err) {
                console.error('Error fetching course:', err)
                setError(err.message)
                setCourse(null)
            } finally {
                 setIsLoading(false)
            }
        }
        
        if (id) {
            fetchCourse()
        }
    }, [id, setIsLoading])


    return (
        <>
            <section className=' container mx-auto '>
                {error && (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-xl text-red-600">Error loading course: {error}</p>
                    </div>
                )}
                
                {(course?.coursePage || []).map((r) => (
                        <div key={r._id} className=" space-y-20 mb-10">
                            <div className="w-full py-50 BG_Color flex justify-center md:justify-between  items-center p-10 gap-5 flex-col md:flex-row">
                                <div className=" md:w-1/2 space-y-5  order-2 md:order-1">
                                    <h1 className='text-[#154979] font-bold tracking-wide'>{course?.courseName}</h1>
                                    <h3>{course?.courseDescription}</h3>
                                    <button className=' bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer'>Enroll Now</button>
                                </div>
                                <div className=" order-1 md:w-1/2 h-auto flex justify-center items-center">
                                    <img src={r.courseLogoUrl} alt={course?.courseName} className=' size-40 md:size-60 text-center' />
                                </div>
                            </div>
                            <div className="px-10 space-y-5">
                                <h2 className="text-[#154979] font-bold tracking-wide flex gap-4 items-center"><FaRegPlayCircle /> Course Video </h2>
                                <div className="  group relative shadow-sm rounded-2xl shadow-[#154979] p-1">
                                    <iframe className="w-full h-60 rounded-2xl lg:h-80" src={r.courseVideoUrl} title={course?.courseName} allowFullScreen ></iframe>
                                </div>
                            </div>
                            <div className="px-10 space-y-5">
                                <h2 className="text-[#154979] font-bold tracking-wide flex gap-4 items-center">
                                    <IoDocumentTextOutline />  Course Documents
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {
                                        r.courseDocuments?.map((doc) => (
                                            <div key={doc._id} className=" group relative shadow-sm rounded-2xl shadow-[#154979] card-hover  cursor-pointer group p-5">
                                                <h3 className="font-semibold mb-2">
                                                    {doc.documentName}
                                                </h3>
                                                <p className="text-sm  mb-3">
                                                    {doc.documentDescription}
                                                </p>
                                                <button className=" bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer">View Document</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                
                {!loading && !error && (!course?.coursePage || course.coursePage.length === 0) && (
                    <div style={{ height: "calc(100vh - 167.2px)" }} className="w-full bg-[#15497913] flex justify-center items-center">
                        <h1 className='font-semibold'>To be updated soon...</h1>
                    </div>
                )}
            </section>
        </>
    )

}

export default CourseDetails

