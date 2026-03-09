import { useEffect, useState } from 'react'

import axios from 'axios'
import { useLoading } from '../Context/LoadingProvider'

function Career() {
  const reasons = [
    {
      title: "Friendly Environment",
      desc: "Join a team that values respect, collaboration, and growth.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "Planning",
      desc: "Plan your work effectively and grow your career with us.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    {
      title: "Execution",
      desc: "Turn ideas into reality with structured execution.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      title: "Delivery",
      desc: "Deliver quality solutions on time, every time.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    },
  ];

  const [jobs, setJobs] = useState([])
  const [, setIsLoading] = useLoading()

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get('/sfs-app/admin/all-job');
        const jobs = Array.isArray(res.data) ? res.data : []
        setJobs(jobs)
      } catch (err) {
        console.error('Failed to fetch jobs', err)
        setJobs([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [setIsLoading])
  return (
    <>
      <div className="bg-white">

        <section className="pt-10 text-center">
          <h1 className="text-3xl italic font-mono text-[#154979] font-bold tracking-wide">CAREER</h1>
        </section>

        <section className="pt-2 px-5">
          <h3 className="text-center text-[#83C026] font-serif   font-semibold mb-10">
            WHY CAREER WITH US
          </h3>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {reasons.map((item, index) => (

              <div key={index} className="space-y-4 rounded-2xl group relative shadow-lg hover:scale-95 border-[#154979] duration-200 hover:border-2 p-4">

                <img
                  src={item.img}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4"

                />
                <p className="text-xl text-center font-bold text-[#154979]">
                  {item.title}
                </p>
                <p className="text-sm  ">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>

        <section className="py-20 px-5">

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

            {jobs.map((job) => (
              <div key={job._id} className='card-hover  group relative shadow-lg p-5'>
                <div className=' overflow-hidden rounded-lg bg-gray-200'>
                  <img
                    src={job.jobImgUrl}
                    width={700}
                    className=' h-auto object-cover object-center lg:h-full lg:w-full '
                    alt={job.jobTitle}
                  />
                </div>
                <div className=' flex justify-center '>

                  <div className='border border-white rounded-lg -mt-8 bg-white p-4 shadow-mentor Shadow flex items-center justify-center'>
                    <div
                      className='text-xl font-semibold text-[#154979] text-center'>
                      {job.jobTitle}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-3">
                  <button className="bg-[#154979] px-10 py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">
                    Apply now !
                  </button>
                </div>
              </div>

            ))}

          </div>

        </section>

      </div>
    </>
  )
}

export default Career