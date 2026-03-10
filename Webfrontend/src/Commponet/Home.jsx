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
      <section id="Home" className="bg-white overflow-hidden">
        <div className="container mx-auto px-6 min-h-[calc(100svh-80px)] flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-0">
          
          {/* Left Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1 text-center lg:text-left space-y-6">
            <div className="inline-block">
              <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                New Courses Available
              </span>
            </div>

            <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.1]">
              Master New <span className="text-green-500">Digital Skills</span> <br className="hidden md:block"/>
              Online Anytime, Anywhere
            </h1>

            <div className="h-10">
              <ReactTyped
                strings={[
                  "WEB DEVELOPMENT",
                  "UI/UX DESIGN",
                  "DATA SCIENCE",
                  "DIGITAL MARKETING",
                ]}
                typeSpeed={80}
                backSpeed={60}
                loop
                className="text-gray-400 font-bold text-xl uppercase tracking-widest"
              />
            </div>

            <p className="text-gray-500 max-w-lg mx-auto lg:mx-0 text-lg leading-relaxed">
              Join over <span className="font-bold text-gray-800">50,000+</span> placid learners from world-class mentors. Transform your career with industry-leading courses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <button className="bg-green-500 text-white px-10 py-4 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2 group">
                Start Learning <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
                <FaYoutube className="text-red-500 text-xl" /> YouTube Channel
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start border-t border-gray-50 mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt="student"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">
                  +50k
                </div>
              </div>
              <p className="text-sm text-gray-400 font-medium italic">
                Join our thriving community of learners!
              </p>
            </div>
          </div>

          {/* Right Image/Banner */}
          <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center relative">
            {/* Soft decorative background glow */}
            <div className="absolute -z-10 w-[80%] h-[80%] bg-green-50 rounded-full blur-[100px] top-10"></div>
            
            <img
              src={Img}
              alt="Placid Digital banner"
              className="w-[300px] sm:w-[450px] lg:w-full max-w-[600px] h-auto object-contain "
            />
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