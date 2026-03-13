import React from 'react';
import { FaLaptopCode, FaMobileAlt, FaBolt, FaLayerGroup } from 'react-icons/fa';

function WebDevelopment() {
  const features = [
    {
      title: "Visual Creativity",
      desc: "We provide innovative and creative web solutions that enhance user experience and brand value. Our designs aren't just pretty—they're built to convert visitors into customers.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      icon: <FaLaptopCode />,
      reverse: false,
    },
    {
      title: "Responsive First",
      desc: "In a mobile-first world, your website needs to look flawless on every screen. Our websites are fully responsive and optimized for all devices, from smartwatches to giant monitors.",
      img: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/767bc10a0c44b0a67be1a94aea270205-1609336032121/website%20development-min.jpg",
      icon: <FaMobileAlt />,
      reverse: true,
    },
    {
      title: "Dynamic Performance",
      desc: "Speed is a ranking factor. We build dynamic websites with modern frameworks, ensuring fast performance, high-grade security, and seamless API integrations.",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      icon: <FaBolt />,
      reverse: false,
    },
    {
      title: "Custom Solutions",
      desc: "No templates here. We design customized solutions based on your specific business goals, whether it's a complex e-commerce engine or a bespoke enterprise portal.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      icon: <FaLayerGroup />,
      reverse: true,
    },
  ];

  return (
    <div className="bg-white">
      {/* --- Page Header --- */}
      <section className="relative py-28 bg-[#0F2B5B] px-6 text-center overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto relative z-10">
          <span className="bg-[#164676] text-white px-4 py-1  rounded-full font-bold uppercase tracking-widest text-sm mb-4 inline-block">
            Scalable & Secure
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Web Development
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            As Indore's top-rated Web Development Company, we bridge the gap between 
            complex backend systems and intuitive frontend experiences.
          </p>
        </div>
      </section>

      {/* --- Feature Alternating Section --- */}
      <section className="py-24 px-6">
        <div className="container mx-auto space-y-32">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                item.reverse ? "md:flex-row-reverse" : ""
              } items-center gap-12 lg:gap-24`}
            >
              {/* Image Side with floating effect */}
              <div className="md:w-1/2 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#164676] to-[#0F2B5B] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                  />
                  {/* Decorative Icon Overlay */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl text-[#0F2B5B] shadow-xl">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-4xl font-black text-[#0F2B5B] leading-tight">
                  {item.title}
                </h2>
                <div className="w-16 h-1.5 bg-[#164676] rounded-full"></div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.desc}
                </p>
                
                <button className="flex items-center gap-2 font-bold text-[#0F2B5B] group hover:text-[#ccc] transition-colors">
                  View Project Case Studies 
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
  );
}

export default WebDevelopment;