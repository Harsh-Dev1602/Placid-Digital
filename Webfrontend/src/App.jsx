import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './Context/AuthProvider'

import Navbar from './Commponet/Navbar'
import Home from './Commponet/Home'
import Trainings from './Commponet/Trainings'
import ContactUs from './Commponet/ContactUs'
import Footer from './Commponet/Footer'
import AboutUs from './Commponet/AboutUs'
import Portfolio from './Commponet/Portfolio'
import Call from './Commponet/Call'
import Career from './Commponet/Career'
import WebDevelopment from './Services/WebDevelopment'
import AppDevelopment from './Services/AppDevelopment '
import DigitalMarketing from './Services/DigitalMarketing'
import CourseDetails from './Course/CourseDetails'

import LogIn from './Admin/LogIn'
import Dashboard from './Admin/Dashboard'
import AddCourse from './Admin/AddCourse'
import CourseManager from './Admin/CourseManager'
import AddCoursePage from './Admin/AddCoursePage'
import PortfolioManager from './Admin/PortfolioManager'
import AddPortfolio from './Admin/AddPortfolio'
import JobManager from './Admin/JobManager'
import AddJob from './Admin/AddJob'
import CoursePageManager from './Admin/CoursePageManager'


function App() {

  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="leading-none text-gray-950 font-sans">
        <div className={`${authUser ? "hidden" : " "}`}>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/admin-dashboard" /> : <Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/career" element={<Career />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/app-development" element={<AppDevelopment />} />
          <Route path="/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/training-program" element={<Trainings />} />
          <Route path="/course-details/:id/:course-Name" element={<CourseDetails />} />

          <Route path="/admin-login" element={authUser ? <Navigate to="/admin-dashboard" /> : <LogIn />} />

          <Route path="/admin-dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />}>
            <Route index element={<CourseManager />} />
            <Route path='add-course' element={<AddCourse />} />
            <Route path='add-course-page' element={<AddCoursePage />} />
            <Route path='portfolio-manager' element={<PortfolioManager />} />
            <Route path='add-portfolio' element={<AddPortfolio />} />
            <Route path='job-manager' element={<JobManager />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='course-page-manager' element={<CoursePageManager />} />
          </Route>
          <Route path="*" element={authUser ? <Navigate to="/admin-dashboard" /> : <Home />} />
        </Routes>
        <div className={`${authUser ? "hidden" : " "}`}>
          <Footer />
          <Call />
        </div>
      </div>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "100%",
            fontSize: '20px',
            fontWeight: "700",
            borderRadius: "12px",
            color: "#154979",
            border: "solid 2px #154979",
            backgroundColor: "white"
          },
          iconTheme: {
            secondary: 'white',
          },
        }}
      />
    </>
  )
}

export default App