import React from 'react'
import { FaLaptopCode } from "react-icons/fa6";
import { FaBullhorn } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { FaChalkboardUser } from "react-icons/fa6";


function Services() {

    const Cards = [
        {
            id: 0,
            icon: <FaLaptopCode />,
            text: "Web Development",
            paragraph: "We always provide people a complete solution upon focused of any business"
        },
        {
            id: 1,
            icon: <FaBullhorn />,
            text: "Digital Marketing",
            paragraph: "We always provide people a complete solution upon focused of any business"
        }, {
            id: 2,
            icon: <CiMobile3 />,
            text: "Application Development",
            paragraph: "We always provide people a complete solution upon focused of any business"
        }, {
            id: 3,
            icon: <FaChalkboardUser />,
            text: "Training Services",
            paragraph: "We always provide people a complete solution upon focused of any business"
        },
    ]
    return (
        <>
            <div className=" container mx-auto py-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 gap-6">
                {
                    Cards.map(({ id, text, paragraph, icon }) => (
                        <div key={id} className="space-y-4 rounded-2xl group relative shadow-lg hover:scale-95 border-[#154979] duration-200 hover:border-2 p-4">
                            <div className=' mx-auto text-[#154979] text-5xl size-10'>{icon}</div>
                            <p className="text-xl text-center font-bold text-[#154979]">
                                {text}
                            </p>
                            <p className="text-sm  ">
                                {paragraph}
                            </p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Services