import React from 'react';
import { FaChartLine, FaSearch, FaShareAlt, FaEnvelopeOpenText, FaArrowRight } from 'react-icons/fa';

function DigitalMarketing() {
  const marketingServices = [
    {
      title: "Social Media Marketing",
      desc: "Dominate platforms like Instagram, Facebook, and LinkedIn with engaging content and targeted ad campaigns.",
      icon: <FaShareAlt />,
    },
    {
      title: "SEO Optimization",
      desc: "Rank on the first page of Google. We optimize your technical SEO and content to drive organic traffic.",
      icon: <FaSearch />,
    },
    {
      title: "Performance Marketing",
      desc: "ROI-driven PPC and lead generation campaigns designed to convert clicks into loyal customers.",
      icon: <FaChartLine />,
    },
    {
      title: "Email & Content",
      desc: "Strategic storytelling and email automation that keeps your brand top-of-mind for your audience.",
      icon: <FaEnvelopeOpenText />,
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* --- Hero Header --- */}
      <section className="relative py-24 bg-[#0F2B5B] px-6 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <span className="bg-[#164676] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block">
            Growth Accelerated
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Digital Marketing
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Placid Digital (Smart Future Step) is the premier Social Media Marketing Company 
            in Indore, dedicated to scaling your business through data-driven strategies.
          </p>
        </div>
      </section>

      {/* --- Main Content Section --- */}
      <section className="py-24 px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          {/* Image with Decorative Glow */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#164676] rounded-[2.5rem] -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Digital Marketing Analysis"
              className="rounded-[2.5rem] shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          {/* About Text */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#0F2B5B] leading-tight">
              Boost Your Brand <br /> 
              <span className="text-[#164676] text-2xl md:text-3xl italic font-serif">Visibility & Engagement</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Known for premium services across the region, our team helps your brand gain 
              massive traffic through Facebook, Instagram, Twitter, and LinkedIn. We don't 
              just post content; we build communities around your business.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <div className="flex items-center gap-2 font-bold text-[#0F2B5B]">
                  <div className="w-2 h-2 bg-[#164676] rounded-full"></div> Brand Strategy
               </div>
               <div className="flex items-center gap-2 font-bold text-[#0F2B5B]">
                  <div className="w-2 h-2 bg-[#164676] rounded-full"></div> Ad Management
               </div>
            </div>
          </div>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketingServices.map((service, index) => (
            <div key={index} className="group p-8 bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-green-100 transition-all duration-500 border border-transparent hover:border-green-100">
              <div className="text-4xl text-[#164676] mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F2B5B] mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default DigitalMarketing;