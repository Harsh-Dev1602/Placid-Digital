import { ReactTyped } from "react-typed";
import Services from "./Services";
import Offer from "./Offer";
import Trainings from "./Trainings";
import ContactUs from "./ContactUs";
import Img from "../../public/banner.svg";
import { FaYoutube, FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="Home" className="bg-white overflow-hidden relative">
        {/* Adjusted padding and added a max-width for ultra-wide screens */}
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-center gap-5 py-16 lg:py-24">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1 text-center lg:text-left space-y-8">
            <div className="inline-block">
              <span className="bg-green-100 text-[#164676] px-4 py-1.5 rounded-full text-sm font-extrabold flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#164676] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#164676]"></span>
                </span>
                New Courses Available
              </span>
            </div>

            <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Master New <span className="text-[#164676]">Digital Skills</span> <br className="hidden xl:block"/>
              Online Anytime
            </h1>

            <div className="h-12">
              <ReactTyped
                strings={["WEB DEVELOPMENT", "UI/UX DESIGN", "DATA SCIENCE", "DIGITAL MARKETING"]}
                typeSpeed={80}
                backSpeed={60}
                loop
                className="text-gray-400 font-black text-xl md:text-2xl uppercase tracking-[0.2em]"
              />
            </div>

            <p className="text-gray-500 max-w-lg mx-auto lg:mx-0 text-lg md:text-xl leading-relaxed">
              Join over <span className="font-bold text-gray-800">50,000+</span> placid learners. Transform your career with industry-leading mentors.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <button className="bg-[#164676] text-white px-10 py-5 rounded-2xl font-black hover:bg-green-600 hover:-translate-y-1 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3 group">
                Start Learning <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center justify-center gap-3 border-2 border-gray-100 text-gray-700 px-10 py-5 rounded-2xl font-black hover:bg-gray-50 hover:border-gray-200 transition-all">
                <FaYoutube className="text-red-500 text-2xl" /> YouTube
              </button>
            </div>
          </div>

          {/* Right Image/Banner - Optimized Viewpoint */}
          <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end relative w-full">
            {/* Soft decorative background glow */}
            <div className="absolute -z-10 w-full h-full bg-green-50 rounded-full blur-[120px] top-0 opacity-60"></div>
            
            <div className="relative group">
              <img
                src={Img}
                alt="Placid Digital banner"

                className="w-full h-[35vh] lg:h-[60vh] xl:h-[65vh] max-w-175 object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <Services />
      <Offer />
      <Trainings />
      <ContactUs />
    </>
  );
}

export default Home;