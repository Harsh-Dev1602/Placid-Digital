import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img0 from "../../public/Offer_Img/ImgO.jpg"
import Img1 from "../../public/Offer_Img/ImgO1.jpg"
import Img2 from "../../public/Offer_Img/ImgO2.jpg"
import Img3 from "../../public/Offer_Img/ImgO3.png"
import Img4 from "../../public/Offer_Img/ImgO4.png"
import Img5 from "../../public/Offer_Img/ImgO5.png"
import Img6 from "../../public/Offer_Img/ImgO6.png"

function Offer() {
    const OfferCard = [
        {
            id: 0,
            img: Img0,
            text: "Software Development",
            paragraph: "Custom software built to empower your business processes."
        },
        {
            id: 1,
            img: Img1,
            text: " Digital Transformation",
            paragraph: "Modernize your operations with cutting-edge digital solution."
        }, {
            id: 2,
            img: Img2,
            text: " Application Services",
            paragraph: "End-to-end development, maintenance, and optimization."
        }, {
            id: 3,
            img: Img3,
            text: "UI/UX Design",
            paragraph: "Designs that blend aesthetics with seamless usability."
        },
        {
            id: 4,
            img: Img4,
            text: "Testing & QA",
            paragraph: "Ensure quality and performance with robust testing services."
        }, {
            id: 5,
            img: Img5,
            text: "Managed IT Services",
            paragraph: " Reliable IT management that lets you focus on growth."
        }, {
            id: 6,
            img: Img6,
            text: "IT Support",
            paragraph: "24/7 technical support to keep your business running smoothly."
        },
    ]

    return (
        <>
            <div className="container BG-Img1  py-10 px-5 space-y-10 mx-auto">
                <div className=" p-5 flex justify-between gap-10 flex-col md:flex-row">
                    <span className=" lg:w-xl space-y-3">
                        <h3 className=" font-bold italic font-mono">What we offer</h3>
                        <h2 className="text-[#83C026] font-serif font-bold">The best solutions for your business - what we do.</h2>
                    </span>
                    <p className="lg:w-1/2 font-semibold text-[#154979] text-justify">Smart Future Step is a fast-growing IT Company that provides holistic IT solutions to businesses across geographies. We offer IT expertise in software, website, and application (iOS & Android) development; UI/UX design; and digital marketing.</p>
                </div>

                <div className="w-full overflow-hidden py-10">

                    <div className="flex gap-1 lg:gap-5 w-max animate-slide">

                        {OfferCard.map(({ id, img, text, paragraph}) => (

                            <div
                                key={id}
                                className="w-80 group flex flex-col items-center shadow-lg px-5 bg-white"
                            >

                                <div className=" overflow-hidden ">
                                    <img
                                        src={img}
                                        className=" h-50 w-60 object-cover"
                                    />
                                </div>

                                <div className="my-4 flex justify-center">
                                    <div className="border border-white rounded-lg -mt-8  p-1 bg-white">

                                        <h3 className="font-bold text-[#154979] text-center pb-2">
                                            {text}
                                        </h3>

                                        <p className="text-justify text-sm">
                                            {paragraph}
                                        </p>

                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Offer
