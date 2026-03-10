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
          <span className="text-[#7ED957] font-bold uppercase tracking-widest text-sm mb-4 inline-block">
            Scalable & Secure
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Web <span className="text-[#7ED957]">Development</span>
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
                <div className="absolute -inset-2 bg-gradient-to-r from-[#7ED957] to-[#0F2B5B] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
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
                <div className="w-16 h-1.5 bg-[#7ED957] rounded-full"></div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.desc}
                </p>
                
                <button className="flex items-center gap-2 font-bold text-[#0F2B5B] group hover:text-[#7ED957] transition-colors">
                  View Project Case Studies 
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Methodology Diagram Section --- */}
      <div className="container mx-auto px-6 mb-24">
         
      </div>

      {/* --- Tech Stack Banner --- */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">Our Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* These can be actual Tech icons (React, Node, etc) */}
            <span className="text-xl font-black">REACT</span>
            <span className="text-xl font-black">NODE.JS</span>
            <span className="text-xl font-black">PYTHON</span>
            <span className="text-xl font-black">MONGODB</span>
            <span className="text-xl font-black">NEXT.JS</span>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0F2B5B] to-[#1a4185] p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#7ED957] rounded-full blur-[100px] opacity-20"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Build Something <br /> Extraordinary?
          </h2>
          <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">
            Let's discuss your project and see how we can help your business grow online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#7ED957] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-lg hover:shadow-[#7ed9574d] transition-all">
              Start Your Project
            </button>
            <button className="bg-white/10 text-white backdrop-blur-md px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all border border-white/20">
              Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WebDevelopment;