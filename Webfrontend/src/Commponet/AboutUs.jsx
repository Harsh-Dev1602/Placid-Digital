import React from "react";
// Assuming the doodle image fits the new theme or you have a new asset
import girldoodle from "../../public/girldoodle.svg"; 

function AboutUs() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <span className="bg-green-100 text-[#164676] px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-[#164676]">Placid Digital</span>
          </h1>
        </div>

        {/* Hero Content Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              We help to implement your <br />
              <span className="text-[#164676]">ideas into reality</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We believe that communication is the key and our team of experts
              always follows this principle. We carry out constant communication
              between team members and clients, ensuring transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#164676] text-white px-8 py-3 rounded-full font-bold  transition shadow-lg shadow-green-100">
                Contact Us
              </button>
              <button className="border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center relative">
            {/* Decorative background element */}
            <div className="absolute -z-10 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-70 top-0"></div>
            <img
              src={girldoodle}
              alt="Placid Digital Team"
              className="w-full max-w-md drop-shadow-xl"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: "👨‍💻", title: "Expert People", desc: "We have industry experts in designing and development." },
            { icon: "⭐", title: "Big Experience", desc: "Years of experience delivering world-class digital solutions." },
            { icon: "✅", title: "Quality First", desc: "We deliver high-fidelity products tailored to your needs." }
          ].map((item, index) => (
            <div key={index} className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl hover:shadow-gray-100 transition-all duration-300 group">
              <div className="w-14 h-14 bg-green-50 text-[#164676] flex items-center justify-center rounded-2xl mb-6 text-2xl group-hover:bg-[#164676] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-100 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why choose <span className="text-[#164676]">Placid Digital?</span>
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                Our systematic approach starts with trust. From signing NDAs to 
                agile project delivery, we ensure every step is documented, 
                scheduled, and reported with 100% transparency.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "📊 Business Planning", 
                  "💰 Financial Advice", 
                  "📈 Investment Strategy", 
                  "🔐 Business Security"
                ].map((tag) => (
                  <div key={tag} className="bg-white backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition cursor-default">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center relative">
               <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Our Process"
                className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;