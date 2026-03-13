import React from "react";
import { IoLocationSharp, IoArrowForward } from "react-icons/io5";
import { MdEmail, MdAccessTimeFilled, MdPhone } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../public/placidlogo.png";

function Footer() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About Us", link: "/about" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "Career", link: "/career" },
    { name: "Contact", link: "/contact" },
  ];

  const services = [
    { name: "Web Development", link: "/web-development" },
    { name: "App Development", link: "/app-development" },
    { name: "Digital Marketing", link: "/digital-marketing" },
    { name: "IT Training", link: "/training-program" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#164676]/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Top Section: Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-800">
          
          {/* Column 1: Company Branding */}
          <div className="space-y-6">
            <img
              src={Logo}
              alt="Placid Digital"
              className="h-12 bg-white p-2 rounded-xl"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Leading the digital frontier with innovative software solutions and 
              industry-standard training programs. We turn complex problems into 
              elegant digital experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
                { icon: <FaInstagram />, color: "hover:bg-pink-600" },
                { icon: <FaLinkedinIn />, color: "hover:bg-blue-700" },
                { icon: <FaYoutube />, color: "hover:bg-red-600" },
              ].map((social, i) => (
                <div key={i} className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center cursor-pointer transition-all duration-300 ${social.color} hover:text-white`}>
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-l-4 border-white pl-4">Company</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    onClick={scrollTop} 
                    to={item.link} 
                    className="text-sm flex items-center gap-2 hover:text-white hover:font-bold transition-all group"
                  >
                    <IoArrowForward className="text-white opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-l-4 border-white pl-4">Expertise</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link 
                    onClick={scrollTop} 
                    to={item.link} 
                    className="text-sm flex items-center  hover:font-bold gap-2 hover:text-white transition-all group"
                  >
                    <IoArrowForward className="text-white opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-l-4 border-white pl-4">Official Info</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#164676]/10 flex items-center justify-center text-white shrink-0">
                  <IoLocationSharp size={20} />
                </div>
                <span>Indore (M.P.) <br /> India, 452001</span>
              </li>
              <li className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#164676]/10 flex items-center justify-center text-white shrink-0 group-hover:bg-[#164676] group-hover:text-white transition-all">
                  <MdEmail size={20} />
                </div>
                <a href="mailto:info@placiddigital.in" className="hover:text-white  hover:font-bold">info@placiddigital.in</a>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#164676]/10 flex items-center justify-center text-white shrink-0">
                  <MdAccessTimeFilled size={20} />
                </div>
                <span>Mon - Sat <br /> 10:00 AM - 07:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} <span className="text-white">Placid Digital Pvt. Ltd.</span> | Built for the Digital Future.
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;