import React from 'react'
import  girldoodle from "../../public/girldoodle.svg"

function AboutUs() {
  return (
    <>
        <div className=" mx-auto container  px-5 py-10">

          <h1 className="text-3xl text-[#83C026] font-serif font-bold text-center mb-16">
             About Us
          </h1>

          <div className="grid BG-Img p-5 rounded-2xl bg-[#15497925] md:grid-cols-2 gap-10 items-center mb-20">

            <div>
              <h2 className="text-[#154979] italic font-mono font-bold mb-4">
                We help to implement your ideas into reality
              </h2>

              <p className="  mb-6">
                We believe that communication is the key and our team of experts always follows this principle. We carry out constant communication between team members and clients, ensuring transparency. This also enables us to get greater insights as well as trust from all our clients. All of our projects are delivered at the stated times and our services come within a rather affordable range.
              </p>

              <button className=" bg-[#154979] text-white text-base  hover:bg-transparent duration-300 hover:text-[#154979] border border-[#154979] px-6 py-2 rounded-lg font-semibold hover:cursor-pointer">
                Contact Us
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={girldoodle}
                alt="About"
                className="  w-md"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">

            <div className="card-hover p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-[#154979] text-white flex items-center justify-center rounded-full mx-auto mb-4">
                👨‍💻
              </div>
              <h3 className="font-semibold mb-2">Expert Peoples</h3>
              <p className="  text-sm">
                We have experts in designing and development.
              </p>
            </div>
            <div className="card-hover p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-[#154979] text-white flex items-center justify-center rounded-full mx-auto mb-4">
                ⭐
              </div>
              <h3 className="font-semibold mb-2">Big Experience</h3>
              <p className="  text-sm">
                We have years of experience in web development.
              </p>
            </div>
            <div className="card-hover  p-6 rounded-xl shadow-md text-center">
              <div className="w-12 h-12 bg-[#154979] text-white flex items-center justify-center rounded-full mx-auto mb-4">
                ✅
              </div>
              <h3 className="font-semibold mb-2">Committed to Quality</h3>
              <p className="  text-sm">
                We deliver quality products according to your needs.
              </p>
            </div>

          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="flex justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWfQJTerdm8g2ZnpHTbB4gT2uL5jK0_PjbbbE3dcyCFA&s"
                alt="Why choose us"
                className="w-md  rounded-2xl Box_Shedow"
              />
            </div>

            <div>
              <h2 className="text-3xl italic font-mono font-bold text-[#154979] mb-4">
                Why choose us
              </h2>

              <p className="  mb-6">
               Our development process is seamless and follows a systematic approach. We begin with signing a Non-Disclosure Agreement (NDA) with the client. After that, documentation is done, and responsibilities are shared among team members to ensure a smooth project progression. Proper scheduling and frequent reporting keep everyone, including clients, within the loop. Our agile approach ensures continuous feedback, making us capable of handling complex projects with efficiency.
              </p>

              <div className="grid grid-cols-2 gap-4">

                <div className="card-hover p-6 rounded-xl shadow-md text-center text-sm font-medium">
                  📊 Business Planning
                </div>

                <div className="card-hover p-6 rounded-xl shadow-md text-center text-sm font-medium">
                  💰 Financial Advice
                </div>

                <div className="card-hover p-6 rounded-xl shadow-md text-center text-sm font-medium">
                  📈 Investment Strategy
                </div>

                <div className="card-hover p-6 rounded-xl shadow-md text-center text-sm font-medium">
                  🔐 Business Security
                </div>

              </div>

            </div>

          </div>
        </div>
    </>
  )
}

export default AboutUs