import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/api";
import { FaStar, FaArrowRight, FaUserTie } from "react-icons/fa";

function Trainings() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get("/sfs-app/course/all-course");
        const courses = Array.isArray(res.data) ? res.data : [];
        setCourses(courses);
      } catch (err) {
        console.error("failed to load courses", err.response?.data?.message || err.message);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-6 lg:px-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">
            Our Courses
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            Explore Our Popular <span className="text-green-500">Trainings</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Placid Digital offers industry-leading mentorship to help you master 
            the most in-demand technical skills.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((c) => (
            <div
              key={c._id || c.id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/40 hover:shadow-2xl hover:shadow-green-100/30 transition-all duration-500 overflow-hidden group flex flex-col"
            >
              {/* Image Container with Badge */}
              <div className="relative overflow-hidden p-4 pb-0">
                <div className="overflow-hidden rounded-[2rem]">
                  <img
                    src={c.courseImgUrl}
                    alt={c.courseName}
                    className="w-full h-50 object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                </div>
                <div className="absolute top-8 left-8">
                  <span className="bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Teacher Info & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                      <FaUserTie size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-400">Expert Mentor</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar size={12} />
                    <span className="text-xs font-bold text-gray-700">4.9</span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-gray-800 mb-3 group-hover:text-green-500 transition-colors">
                  {c.courseName}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">
                  {c.courseDescription || "Master this technology with hands-on projects and industry-standard practices."}
                </p>

                {/* Footer with Price and Button */}
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 block uppercase tracking-tighter">Lifetime Access</span>
                    <span className="text-xl font-black text-gray-900">Enrol Now</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate(`/course-details/${c._id}/${c.courseName}`);
                      scrollTop();
                    }}
                    className="bg-green-500 text-white p-4 rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-green-100 group/btn"
                  >
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-500 font-medium italic">
            Don't see what you're looking for? <span className="text-green-500 cursor-pointer hover:underline">Contact us for custom corporate training.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Trainings;