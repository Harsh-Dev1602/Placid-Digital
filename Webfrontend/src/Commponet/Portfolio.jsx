import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLoading } from '../Context/LoadingProvider'

function Portfolio() {
    const [projects, setProjects] = useState([])
    const [, setIsLoading] = useLoading()

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get('/sfs-app/admin/all-portfolio')
                const projects = Array.isArray(res.data) ? res.data : []
                setProjects(projects)
            } catch (err) {
                console.error('Portfolio fetch failed', err.response?.data?.message || err.message)
                setProjects([])
            } finally {
                setIsLoading(false)
            }
        }
        fetch()
    }, [setIsLoading])

    return (
        <>
            <section className="bg-white py-16 px-5">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl text-[#154979] font-bold text-center mb-12 tracking-wide">
                        Portfolio
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  xl:gap-8">
                        {projects.map((item, index) => (
                            <div key={index} className='group relative shadow-lg'>
                                <div className=' w-full overflow-hidden rounded-lg bg-gray-200'>
                                    <img
                                        src={item.portfolisImgUrl}
                                        className=' w-full object-cover object-center '
                                    />
                                </div>
                                <div className='my-4 flex justify-center '>

                                    <div className='border border-white rounded-lg -mt-8 bg-white p-4 px-10 shadow-mentor Shadow flex items-center justify-center'>
                                        <div
                                            className='text-xl font-semibold text-gray-700 text-center'>
                                            {item.portfolisName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Portfolio