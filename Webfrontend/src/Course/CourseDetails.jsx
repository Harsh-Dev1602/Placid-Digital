import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegPlayCircle, FaStar, FaUsers, FaBook } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLoading } from '../Context/LoadingProvider';

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useLoading();

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`/sfs-app/course/course-details/${id}`);
                const courseData = res.data || {};
                if (!Array.isArray(courseData.coursePage)) {
                    courseData.coursePage = [];
                }
                setCourse(courseData);
                setError(null);
            } catch (err) {
                console.error("Error fetching course:", err);
                setError(err.message);
                setCourse(null);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchCourse();
    }, [id, setIsLoading]);

    return (
        <section className="bg-white min-h-screen font-sans text-gray-800">
            {error && (
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl text-red-600 font-medium">Error loading course: {error}</p>
                </div>
            )}

            {(course?.coursePage || []).map((r) => (
                <div key={r._id} className="pb-20">
                   

                    {/* CONTENT SECTION (Video & Docs) */}
                    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10 mt-10">
                        
                        {/* Left Side: Video Content */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <div className="p-4 bg-gray-50 flex items-center justify-between">
                                    <h2 className="font-bold flex items-center gap-2 text-[#164676]">
                                        <FaRegPlayCircle size={20}/> Course Video Preview
                                    </h2>
                                </div>
                                <iframe
                                    className="w-full aspect-video"
                                    src={r.courseVideoUrl}
                                    title={course?.courseName}
                                    allowFullScreen
                                />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <IoDocumentTextOutline className="text-[#164676]" /> Resources & Materials
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {r.courseDocuments?.map((doc) => (
                                        <div key={doc._id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition group">
                                            <h3 className="font-bold text-lg mb-1 group-hover:text-[#164676] transition">{doc.documentName}</h3>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{doc.documentDescription}</p>
                                            <a
                                                href={doc.documentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#164676] font-bold text-sm flex items-center gap-1 hover:underline"
                                            >
                                                Download Resource →
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Course Card Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl sticky top-10">
                                <img src={r.courseLogoUrl} className="w-full h-48 object-cover rounded-2xl mb-6 bg-gray-50" alt="Course Thumbnail" />
                                <h2 className="text-2xl font-bold mb-2">{course?.courseName}</h2>
                                <p className="text-gray-500 text-sm mb-6">{course?.courseDescription}</p>
                                
                                <div className="flex items-center justify-between mb-6">
                                    
                                    <div className="flex text-yellow-400 gap-1"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></div>
                                </div>

                                <button className="w-full bg-[#164676] text-white py-4 rounded-2xl font-bold hover:bg-[#164676] transition shadow-lg shadow-green-100 mb-4">
                                    Enroll in Course
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {!loading && !error && (!course?.coursePage || course.coursePage.length === 0) && (
                <div className="h-[60vh] flex flex-col justify-center items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" className="w-20 opacity-20 mb-4" alt="Empty" />
                    <h1 className="font-bold text-gray-400 text-xl italic">To be updated soon...</h1>
                </div>
            )}
        </section>
    );
}

export default CourseDetails;