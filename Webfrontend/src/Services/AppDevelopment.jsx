import React from 'react'

function AppDevelopment () {

    const features = [
  {
    title: "Creativity",
    desc: "We build innovative and user-friendly mobile applications that enhance business growth and customer engagement.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    reverse: false,
  },
  {
    title: "Responsive",
    desc: "Our apps work smoothly across all devices and platforms with fast loading and seamless performance.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    reverse: true,
  },
  {
    title: "Dynamic",
    desc: "We develop dynamic mobile applications with real-time updates, secure APIs, and scalable architecture.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    reverse: false,
  },
  {
    title: "Customised",
    desc: "We create customized mobile apps tailored to your business requirements and target audience.",
    img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    reverse: true,
  },
];
  return (
    <>
       <section className=" py-16 px-5">

      <div className=" container mx-auto">
        <div className="text-center mb-14">

          <h1 className="text-5xl text-[#83C026] font-bold mb-3">
            App Development
          </h1>

          <p className="  max-w-2xl mx-auto">
            Why are we the best App Development Company in Indore?
          </p>

        </div>

        <div className="space-y-16">

          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                item.reverse ? "md:flex-row-reverse" : ""
              } items-center gap-10`}
            >
              <div className="bg-white p-6 rounded-xl Box_Shedow md:w-1/2">

                <h3 className="text-xl font-semibold mb-3 relative inline-block">


                  <span className="absolute inset-0 rounded"></span>

                  <span className="relative px-1">
                    {item.title}
                  </span>

                </h3>

                <p className="   ">
                  {item.desc}
                </p>

              </div>

              <div className="md:w-1/2 relative">
                <div className="absolute inset-0 rounded-xl"></div>

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

export default AppDevelopment 