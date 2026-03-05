import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Offer() {
    const offerCard = [
        {
            id: 0,
            img: "../../public/Offer_Img/ImgO.jpg",
            text: "Software Development",
            paragraph: "Custom software built to empower your business processes."
        },
        {
            id: 1,
            img: "../../public/Offer_Img/ImgO1.jpg",
            text: " Digital Transformation",
            paragraph: "Modernize your operations with cutting-edge digital solution."
        }, {
            id: 2,
            img: "../../public/Offer_Img/ImgO2.jpg",
            text: " Application Services",
            paragraph: "End-to-end development, maintenance, and optimization."
        }, {
            id: 3,
            img: "../../public/Offer_Img/ImgO3.png",
            text: "UI/UX Design",
            paragraph: "Designs that blend aesthetics with seamless usability."
        },
        {
            id: 4,
            img: "../../public/Offer_Img/ImgO4.png",
            text: "Testing & QA",
            paragraph: "Ensure quality and performance with robust testing services."
        }, {
            id: 5,
            img: "../../public/Offer_Img/ImgO5.png",
            text: "Managed IT Services",
            paragraph: " Reliable IT management that lets you focus on growth."
        }, {
            id: 6,
            img: "../../public/Offer_Img/ImgO6.png",
            text: "IT Support",
            paragraph: "24/7 technical support to keep your business running smoothly."
        },
    ]

    var settings = {
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="container  py-10 px-5 mx-auto">
                <div className=" p-5 flex justify-between gap-5 flex-col md:flex-row">
                    <span className=" lg:w-xl space-y-3">
                        <h3 className=" font-bold italic font-mono">What we offer</h3>
                        <h2 className="text-[#83C026] font-serif font-bold">The best solutions for your business - what we do.</h2>
                    </span>
                    <p className="lg:w-1/2 font-semibold text-[#154979] text-justify">Smart Future Step is a fast-growing IT Company that provides holistic IT solutions to businesses across geographies. We offer IT expertise in software, website, and application (iOS & Android) development; UI/UX design; and digital marketing.</p>
                </div>

                <div className="w-full h-auto mx-auto rounded-2xl my-1">
                    <Slider {...settings}>
                        {offerCard.map(({ id, img, text, paragraph }) => (
                            <div key={id} className="w-full  p-4">
                                <div className='group relative card-hover  shadow-lg'>
                                <div className=' w-full overflow-hidden rounded-lg bg-gray-200 '>
                                    <img
                                        src={img}
                                        className='h-50 w-full object-cover object-center  '
                                    />
                                </div>
                                <div className='my-4 flex justify-center '>

                                    <div className='border border-white rounded-lg -mt-8 bg-white p-4 px-5 shadow-mentor Shadow  '>
                                        <p
                                            href='/'
                                            className=' font-bold text-[#154979] text-center'>
                                            {text}
                                        </p>

                                        <p className="  text-justify text-sm">{paragraph}</p>
                                    </div>
                                </div>
                            </div>
                            </div>
                        ))
                        }
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Offer

const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
        <MdKeyboardArrowLeft size={40} color="white" />
    </div>
);

const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
        <MdKeyboardArrowRight size={40} color="white" />
    </div>
);