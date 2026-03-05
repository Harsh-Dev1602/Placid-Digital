import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Trainings() {
  const [courses, setCourses] = useState([]);
   const navigate = useNavigate();
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/sfs-app/course/all-course");
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
    <>
      <div className="my-5 container mx-auto px-10">
        <h1 className="text-5xl text-center font-bold text-[#154979]">
          Popular Trainings
        </h1>
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((c) => (
            <div key={c._id || c.id} className="card-hover  group relative shadow-lg p-5">
              <div className=" overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={c.courseImgUrl}
                  width={700}
                  className=" h-auto object-cover object-center lg:h-full lg:w-full "
                  alt={c.courseName}
                />
              </div>
              <div className=" flex justify-center ">
                <div className="border border-white rounded-lg -mt-8 bg-white p-4 shadow-mentor Shadow flex items-center justify-center">
                  <div className="text-xl font-semibold text-[#154979] text-center">
                    {c.courseName}
                  </div>
                </div>
              </div>
              <p className="p-2 text-center text-gray-700">{c.courseDescription}</p>
              <div className="flex justify-center items-center">
                <button onClick={()=> navigate(`/course-details/${c._id}/${c.courseName}`)}
                  className="bg-[#154979] px-10 py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
                >
                     <span onClick={scrollTop}> View Details</span> 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trainings