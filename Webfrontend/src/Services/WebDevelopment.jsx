import React from 'react'

function WebDevelopment() {

    const features = [
        {
            title: "Creativity",
            desc: "We provide innovative and creative web solutions that enhance user experience and brand value.",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            reverse: false,
        },
        {
            title: "Responsive",
            desc: "Our websites are fully responsive and optimized for all devices and screen sizes.",
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
            reverse: true,
        },
        {
            title: "Dynamic",
            desc: "We build dynamic websites with modern features, fast performance, and secure systems.",
            img: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
            reverse: false,
        },
        {
            title: "Customised",
            desc: "We design customized solutions based on your business goals and customer needs.",
            img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
            reverse: true,
        },
    ];
    return (
        <>
            <section className="  py-16 px-5">

                <div className=" container mx-auto">

                    <div className="text-center mb-14">
                        <h1 className="text-[#83C026] text-5xl font-bold mb-3">
                            Web Development
                        </h1>

                        <p className="  max-w-2xl mx-auto">
                            Why are we the best Web Development Company in Indore?
                        </p>
                    </div>

                    <div className="space-y-16">

                        {features.map((item, index) => (
                            <div
                                key={index}
                                className={` flex flex-col md:flex-row ${item.reverse ? "md:flex-row-reverse" : ""
                                    } items-center gap-10`}
                            >
                                <div className="bg-white p-6 rounded-xl group relative shadow-lg md:w-1/2">

                                    <h3 className="text-xl font-semibold mb-3">
                                        {item.title}
                                    </h3>

                                    <p className="   ">
                                        {item.desc}
                                    </p>

                                </div>

                                <div className="md:w-1/2">

                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="rounded-xl shadow-lg w-full h-64 object-cover"
                                    />

                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </section>
        </>
    )
}

export default WebDevelopment