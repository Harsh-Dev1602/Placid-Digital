import React, { useEffect, useState } from "react";
import { IoLocationSharp, IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import Logo from "../../public/placidlogo.png";

function Navbar() {
  const [openMenu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const location = useLocation();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setOpen(false);
  }, [location.pathname]);

  const navText = [
    { id: 0, text: "Home", link: "/" },
    { id: 1, text: "About Us", link: "/about" },
    { id: 2, text: "Portfolio", link: "/portfolio" },
    { id: 3, text: "Career", link: "/career" },
    { id: 4, text: "Contact", link: "/contact" },
  ];

  return (
    <header className={`z-50 w-full bg-white transition-all duration-300 ${sticky ? "fixed top-0 shadow-xl" : "relative"}`}>

      {/* Top Bar - Clean & Modern */}
      {!sticky && (
        <div className="bg-gray-900 text-gray-300 py-2">
          <div className="container mx-auto px-6 flex justify-between items-center text-xs font-medium">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-green-500 transition cursor-default">
                <IoLocationSharp className="text-green-500" /> Indore (M.P.) 452001
              </span>
              <a href="mailto:info@placiddigital.in" className="flex items-center gap-1.5 hover:text-green-500 transition">
                <MdEmail className="text-green-500" /> info@placiddigital.in
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-green-500 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-green-500 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-green-500 transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className={`${sticky ? "py-3" : "py-5"} transition-all duration-300 border-b border-gray-50`}>
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link onClick={scrollTop} to="/" className="shrink-0">
            <img src={Logo} alt="Placid Digital" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navText.map(({ id, text, link }) => (
              <Link
                key={id}
                to={link}
                onClick={scrollTop}
                className={`text-sm font-bold tracking-tight transition-colors ${location.pathname === link ? "text-green-500" : "text-gray-700 hover:text-green-500"
                  }`}
              >
                {text}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-green-500 transition">
                Services <IoIosArrowDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute top-full left-0 pt-4 w-60 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 overflow-hidden">
                    {["Web Development", "App Development", "Digital Marketing"].map((service) => (
                      <Link
                        key={service}
                        to={`/${service.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition"
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/training-program"
              className="bg-green-500 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-gray-900 transition-all shadow-lg shadow-green-100"
            >
              Training Program
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-3xl text-gray-800"
            onClick={() => setMenu(!openMenu)}
          >
            {openMenu ? <RiCloseFill /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-transform duration-500 ${openMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 b" onClick={() => setMenu(false)}></div>
        <nav className="relative w-70 h-full bg-white shadow-2xl p-8 flex flex-col justify-between items-start">


          <div className="flex flex-col gap-6">
            {navText.map(({ id, text, link }) => (
              <Link
                key={id}
                to={link}
                onClick={() => setMenu(false)}
                className={`text-xl font-bold ${location.pathname === link ? "text-green-500" : "text-gray-800"}`}
              >
                {text}
              </Link>
            ))}

            <div
              className="relative group"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="flex items-center gap-1 text-xl font-bold text-gray-800 hover:text-green-500 transition">
                Services <IoIosArrowDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute top-full -left-8 pt-4 w-60 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 overflow-hidden">
                    {["Web Development", "App Development", "Digital Marketing"].map((service) => (
                      <Link
                        key={service}
                        to={`/${service.toLowerCase().replace(" ", "-")}`}
                        className="block px-4 py-3 text-xl font-semibold text-gray-600 hover:bg-green-50 hover:text-green-600 rounded-xl transition"
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center gap-4">
            <Link
              to="/training-program"
              className="bg-green-500 py-4 text-center text-white w-full rounded-full text-xl font-bold hover:bg-gray-900 transition-all shadow-lg shadow-green-100"
            >
              Training Program
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;