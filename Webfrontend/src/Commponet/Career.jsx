import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../Context/LoadingProvider";
import { FaUsers, FaLightbulb, FaRocket, FaCheckCircle, FaArrowRight } from "react-icons/fa";

function Career() {
  const reasons = [
    {
      title: "Friendly Environment",
      desc: "Join a team that values respect, collaboration, and collective growth.",
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Strategic Planning",
      desc: "Map out your professional roadmap with structured career paths.",
      icon: <FaLightbulb />,
      color: "bg-[#164676]",
    },
    {
      title: "Agile Execution",
      desc: "Turn innovative ideas into reality with cutting-edge tech stacks.",
      icon: <FaRocket />,
      color: "bg-purple-500",
    },
    {
      title: "Quality Delivery",
      desc: "Take pride in delivering high-impact solutions to global clients.",
      icon: <FaCheckCircle />,
      color: "bg-orange-500",
    },
  ];

  const [jobs, setJobs] = useState([]);
  const [, setIsLoading] = useLoading();

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/sfs-app/admin/all-job");
        const jobs = Array.isArray(res.data) ? res.data : [];
        setJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [setIsLoading]);

  return (
    <div className="bg-white">
      {/* --- Hero Section --- */}
      <section className="relative py-24 px-6 overflow-hidden bg-gray-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#164676] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="bg-[#164676] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">
            Career Opportunities
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            Build Your <span className="text-[#164676]">Future</span> <br /> 
            With Placid Digital
          </h1>
          <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We don't just offer jobs; we offer a platform to innovate, lead, and 
            transform the digital landscape.
          </p>
        </div>
      </section>

      {/* --- Why Work With Us (Feature Cards) --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Work With Us</h2>
          <div className="w-20 h-1.5 bg-[#164676] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-green-100/30 transition-all duration-500 text-center"
            >
              <div className={`w-16 h-16 ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#164676] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Job Listings --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-black text-[#164676]">Current Openings</h2>
              <p className="text-gray-400 mt-2">Find the role that matches your passion.</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-[#164676] mx-10 mb-4"></div>
            <span className="text-[#164676] font-bold">{jobs.length} Positions Available</span>
          </div>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className=" backdrop-blur-md bg-[#cccccc3f] rounded-[2.5rem]  p-2 group  transition-all duration-500"
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-4xl">
                    <img
                      src={job.jobImgUrl}
                      alt={job.jobTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#164676] mb-6  transition-colors">
                      {job.jobTitle}
                    </h3>
                    
                    <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#164676] hover:text-white transition-all duration-300">
                      Apply Now <FaArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/30 rounded-[3rem] border border-dashed border-gray-700">
              <p className="text-gray-500 text-lg">No active openings at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default Career;