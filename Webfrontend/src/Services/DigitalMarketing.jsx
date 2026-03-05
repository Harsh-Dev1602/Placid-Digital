import React from 'react'

function DigitalMarketing() {
    return (
        <>
            <section className="  py-16 px-5">

                <div className=" container mx-auto">

                    <div className="text-center mb-14">
                        <h1 className="text-[#83C026] text-5xl font-bold mb-3">
                            Digital Marketing
                        </h1>

                        <p className="  max-w-2xl mx-auto">
                            We provide the best Digital Marketing Services in Indore
                        </p>
                    </div>

                    <div className="space-y-16
                               flex flex-col md: md:flex-row-reverse gap-5"  >
                        <div className="bg-white p-6 rounded-xl Box_Shedow md:w-1/2">

                            <p className="   ">
                                Smart Future Step Private Limited is a Social Media Marketing Company in Indore, known for its premium services across the region. We provide all prominent services including Digital Marketing, Web Development, and much more. Our team helps your brand gain traffic and engagement through Facebook, Instagram, Twitter, LinkedIn, and other major platforms. We dedicate our time to your growth and business success.
                            </p>

                        </div>

                        <div className="md:w-1/2">

                            <img
                                src="http://media.istockphoto.com/id/1443560890/photo/digital-marketing-business-technology-concept-website-advertisement-email-social-media.jpg?s=612x612&w=0&k=20&c=S7d_Mof_fEsM69inW540APogoXkz-eA23XE1AIhTaBA="
                                className="rounded-xl shadow-lg w-full h-64 object-cover"
                            />

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DigitalMarketing