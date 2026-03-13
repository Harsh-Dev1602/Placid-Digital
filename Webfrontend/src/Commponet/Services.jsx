import React from "react";
import { FaLaptopCode, FaBullhorn, FaMobileAlt, FaChalkboardTeacher } from "react-icons/fa";

function Services() {
  const Cards = [
    {
      id: 0,
      icon: <FaLaptopCode />,
      text: "Web Development",
      paragraph: "Complete web development solutions to build fast, secure, and scalable websites.",
      color: "bg-blue-50 text-blue-500", // Soft pastel backgrounds like the image
    },
    {
      id: 1,
      icon: <FaBullhorn />,
      text: "Digital Marketing",
      paragraph: "Grow your brand with powerful digital marketing strategies and online campaigns.",
      color: "bg-green-50 text-[#164676]",
    },
    {
      id: 2,
      icon: <FaMobileAlt />,
      text: "App Development",
      paragraph: "Custom Android and iOS apps designed for performance and user experience.",
      color: "bg-purple-50 text-purple-500",
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher />,
      text: "Training Services",
      paragraph: "Professional IT training programs designed to build industry-ready skills.",
      color: "bg-orange-50 text-orange-500",
    },
  ];

  return (
    <section className="bg-white py-24 px-6">
      <div className="container mx-auto">
        
        {/* Section Header to match the design style */}
        <div className="text-center mb-16">
          <span className="text-[#164676] font-bold tracking-widest uppercase text-sm">Our Expertise</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Solutions for your <span className="text-[#164676]">Digital Growth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {Cards.map(({ id, text, paragraph, icon, color }) => (
            <div
              key={id}
              className="group bg-white rounded-[2rem] border border-gray-100 p-8 text-center transition-all duration-500 hover:shadow-2xl hover:shadow-gray-100 hover:-translate-y-2"
            >
              {/* Icon Container - Pill shaped as per image (e.g. Cloud Analytics card) */}
              <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-3xl mb-6 transition-transform duration-500 group-hover:rotate-12 ${color}`}>
                {icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#164676] transition-colors">
                {text}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {paragraph}
              </p>

              {/* Action Link - matching the "Enroll Now" style */}
              <div className="flex items-center justify-center gap-2 text-[#164676] font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;