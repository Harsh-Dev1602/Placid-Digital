import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Icons and Images
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Img0 from "../../public/Offer_Img/ImgO.jpg";
import Img1 from "../../public/Offer_Img/ImgO1.jpg";
import Img2 from "../../public/Offer_Img/ImgO2.jpg";
import Img3 from "../../public/Offer_Img/ImgO3.png";
import Img4 from "../../public/Offer_Img/ImgO4.png";
import Img5 from "../../public/Offer_Img/ImgO5.png";
import Img6 from "../../public/Offer_Img/ImgO6.png";

function Offer() {
  const OfferCard = [
    { id: 0, img: Img0, text: "Software Development", paragraph: "Custom software built to empower your business processes." },
    { id: 1, img: Img1, text: "Digital Transformation", paragraph: "Modernize your operations with cutting-edge solutions." },
    { id: 2, img: Img2, text: "Application Services", paragraph: "End-to-end development, maintenance, and optimization." },
    { id: 3, img: Img3, text: "UI/UX Design", paragraph: "Designs that blend aesthetics with seamless usability." },
    { id: 4, img: Img4, text: "Testing & QA", paragraph: "Ensure quality and performance with robust testing." },
    { id: 5, img: Img5, text: "Managed IT Services", paragraph: "Reliable IT management that lets you focus on growth." },
    { id: 6, img: Img6, text: "IT Support", paragraph: "24/7 technical support to keep your business running." },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div style={{ bottom: "-45px" }}>
        <ul className="flex justify-center gap-2 m-0"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-gray-200 rounded-full hover:bg-green-500 transition-all duration-300 active-dot:bg-green-500"></div>
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="lg:w-2/3 space-y-4">
            <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Premium Solutions For <br />
              <span className="text-green-500 font-black">Your Global Business</span>
            </h2>
          </div>
          <div className="lg:w-1/3">
            <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-green-500 pl-6">
              Placid Digital is a fast-growing IT power-house delivering
              innovative software, mobile apps, and digital marketing strategies.
            </p>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="flex gap-1 lg:gap-5 animate-slide">
            {OfferCard.map(({ id, img, text, paragraph }) => (
              <div key={id} className="px-4  outline-none">
                <div className="group bg-white rounded-[2.5rem] border border-gray-300 overflow-hidden hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 flex flex-col w-70 md:w-96 h-full">
                  
                  {/* Image with Overlay */}
                  <div className=" relative w-70 md:w-96 h-60">
                    <img
                      src={img}
                      alt={text}
                      className="w-70 md:w-96 h-60 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0  group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <button className="bg-white text-green-500 p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-500 transition-colors">
                      {text}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>

      {/* Global CSS for Slick Dots color */}
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: #22c55e !important;
          width: 30px;
        }
      `}</style>
    </section>
  );
}

export default Offer;