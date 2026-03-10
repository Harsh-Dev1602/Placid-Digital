import React from 'react';
import { FaMobileAlt, FaRocket, FaCode, FaCogs } from 'react-icons/fa';

function AppDevelopment() {
  const features = [
    {
      title: "Creative Innovation",
      desc: "We build innovative and user-friendly mobile applications that enhance business growth and customer engagement. Our design-first approach ensures your app stands out in a crowded marketplace.",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c", // Focused on Mobile UI
      icon: <FaMobileAlt />,
      reverse: false,
    },
    {
      title: "Responsive Performance",
      desc: "Our apps work smoothly across all devices and platforms with fast loading and seamless performance. We optimize every line of code for speed and battery efficiency.",
      img: "https://images.unsplash.com/photo-1551650975-87deedd944c3", // Focused on App Testing/Multi-device
      icon: <FaRocket />,
      reverse: true,
    },
    {
      title: "Dynamic Architecture",
      desc: "We develop dynamic mobile applications with real-time updates, secure APIs, and scalable architecture that grows alongside your user base without hiccups.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", // Focused on Code/Backend
      icon: <FaCode />,
      reverse: false,
    },
    {
      title: "Tailored Customization",
      desc: "We create customized mobile apps tailored to your specific business requirements and target audience, ensuring a personalized experience for every user.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // Focused on Team/Collaboration
      icon: <FaCogs />,
      reverse: true,
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* --- Page Header --- */}
      <section className="relative py-24 bg-gray-900 px-6">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <span className="text-green-500 font-black tracking-widest uppercase text-sm mb-4 inline-block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            App <span className="text-green-500">Development</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Placid Digital is the leading App Development Company in Indore, 
            transforming complex ideas into high-performance mobile experiences.
          </p>
        </div>
      </section>

      {/* --- Feature Sections --- */}
      <section className="py-24 px-6">
        <div className="container mx-auto space-y-32">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                item.reverse ? "md:flex-row-reverse" : ""
              } items-center gap-16 lg:gap-24`}
            >
              {/* Image Side */}
              <div className="md:w-1/2 relative group">
                {/* Decorative Background Shape */}
                <div className={`absolute -inset-4 bg-green-500/10 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500`}></div>
                
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-gray-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* Floating Icon Badge */}
                  <div className={`absolute bottom-6 ${item.reverse ? 'left-6' : 'right-6'} bg-white p-5 rounded-3xl shadow-xl text-green-500 text-3xl animate-bounce-slow`}>
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-3 text-green-600 font-bold uppercase tracking-tighter text-sm">
                  <div className="w-10 h-[2px] bg-green-500"></div>
                  Feature 0{index + 1}
                </div>
                
                <h2 className="text-4xl font-black text-gray-900 leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-gray-500 text-lg leading-relaxed italic border-l-4 border-green-500 pl-6">
                  {item.desc}
                </p>

                <div className="pt-6">
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-500 transition-all shadow-xl shadow-gray-200 flex items-center gap-3 group">
                        Learn More 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Simple Process Banner --- */}
      <section className="py-20 bg-green-500 mx-6 mb-20 rounded-[3rem] text-center text-white px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to launch your app?</h2>
          <p className="text-green-50 text-lg mb-10 max-w-xl mx-auto">From wireframing to App Store deployment, we handle the entire lifecycle of your mobile project.</p>
          <button className="bg-white text-green-600 px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-900 hover:text-white transition-all">
              Get a Free Quote
          </button>
      </section>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AppDevelopment;