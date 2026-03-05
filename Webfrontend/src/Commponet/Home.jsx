import { ReactTyped } from "react-typed";
import Services from "./Services";
import Offer from "./Offer";
import Trainings from "./Trainings";
import ContactUs from "./ContactUs";
import Img from "../../public/banner.svg"

function Home() {

    return (
        <>

            <section style={{ height: "calc(100vh - 200px)" }} id='Home' className=' flex flex-col  lg:flex-row justify-evenly items-center'>
                <img src={Img} className="size-60 md:size-[500px] order-2 h-auto object-cover" />
                <div className='lg:w-1/2 order-2  lg:order-1 relative px-6 lg:px-5'>
                    <div className='container '>
                        <div className='flex flex-col gap-1 lg:gap-2 text-center'>
                            <ReactTyped
                                strings={[
                                    "WEB DEVELOPMENT",
                                    "APPLICATION DEVELOPMENT",
                                    "DIGITAL MARKETING",
                                ]}
                                typeSpeed={80}
                                backSpeed={70}
                                loop className="text-[#154979] italic font-mono p-2 text-center text-2xl md:text-5xl font-bold"
                            >
                            </ReactTyped>
                            <h3 className=' text-[#83C026] font-serif  font-bold tracking-tight max-w-4xl mx-auto'>
                                Advance your engineering skills with our courses
                            </h3>
                            <p className=' leading-8 text-black'>
                                Build skills with our courses and mentor from world-class
                                companies.
                            </p>
                           
                        </div>


                    </div>
                </div>
            </section>
            <Services />
            <Offer />
            <Trainings />
            <ContactUs />
        </>
    )
}

export default Home
