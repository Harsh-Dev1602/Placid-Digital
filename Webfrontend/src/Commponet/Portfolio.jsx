import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../Context/LoadingProvider";
import { FaExternalLinkAlt } from "react-icons/fa";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [, setIsLoading] = useLoading();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/sfs-app/admin/all-portfolio");
        const projects = Array.isArray(res.data) ? res.data : [];
        setProjects(projects);
      } catch (err) {
        console.error(
          "Portfolio fetch failed",
          err.response?.data?.message || err.message
        );
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [setIsLoading]);

  return (
    <section className="bg-white py-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Our <span className="text-green-500">Popular Projects</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Choose from hundreds of successful projects designed by industry experts to help you achieve your goals.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-green-100/40 transition-all duration-500 overflow-hidden group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden p-4 pb-0">
                <div className="overflow-hidden rounded-[1.8rem]">
                  <img
                    src={item.portfolisImgUrl}
                    alt={item.portfolisName}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                </div>
                {/* Floating Tag Overlay */}
                <div className="absolute top-8 left-8">
                  <span className="bg-green-500 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-lg">
                    Live Case
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-500 transition-colors duration-300">
                    {item.portfolisName}
                    </h3>
                </div>


                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Project Details
                  </span>
                  <button className="text-green-500 group-hover:bg-green-500 group-hover:text-white p-3 rounded-full transition-all duration-300 border border-green-50">
                    <FaExternalLinkAlt size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {projects.length > 0 && (
          <div className="mt-16 text-center">
            <button className="border-2 border-gray-100 text-gray-800 font-bold px-10 py-4 rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 shadow-sm">
              View All Projects →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;