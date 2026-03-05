import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useForm, useFieldArray } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaRegFileImage } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";

// helper api functions
const uploadCourseImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await axios.post('/sfs-app/upload/upload-img', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};



function AddCoursePage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, setValue, control } = useForm({
    defaultValues: {
      courseDocuments: [{ documentName: '', documentDescription: '' }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courseDocuments"
  })
  const [uploading, setUploading] = React.useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState("")
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/sfs-app/course/all-course')
        setCourses(res.data || [])
        if (res.data && res.data.length) setSelectedCourse(res.data[0]._id)
      } catch (err) {
        console.error('Failed to load courses for AddCoursePage', err)
      }
    }
    fetchCourses()
  }, [])
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit =  async (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first")
      return
    }
    if (!selectedCourse) {
      toast.error('Please select a parent course')
      return
    }

    const userInfo = {
      courseId: selectedCourse,
      courseLogoUrl: data.courseLogoUrl,
      courseVideoUrl: data.courseVideoUrl,
      courseDocuments: data.courseDocuments,
    }

  await axios.post('/sfs-app/course/page-add', userInfo)
      .then(res => {
        toast.success("Course added successfully")
        reset()
        setUploadedImageUrl("")
        setSelectedCourse("")
      })
      .catch(err => {
        toast.error("Failed to add course")
        console.error(err)
      })
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    try {
      setUploading(true)
      const res = await uploadCourseImage(file)
      const { imageUrl } = res
      setUploadedImageUrl(imageUrl)
      setValue('courseLogoUrl', imageUrl)
      toast.success('Image uploaded')
    } catch (err) {
      console.error(err)
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }
  return (
    <>
      <div style={{ height: "calc(100vh - 40px)" }} className="w-full flex justify-center items-center overflow-y-auto py-10">
        <StyledWrapper>
          <form onSubmit={handleSubmit(onSubmit)} className=" p-5 group relative shadow-lg w-2xl mx-auto space-y-4">
            <h1 className=' font-bold text-center text-[#154979d0] text-4xl'> Course Documents</h1>

            <div className="w-full">
              <label className="block mb-2 font-medium text-sm">Select Parent Course</label>
              <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full rounded-md border border-gray-200 px-4 py-2">
                <option className=' border-2 ' value="">-- Select course --</option>
                {courses.map(c => (
                  <option className=' border border-gray-200' key={c._id} value={c._id}>{c.courseName}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="custum-file-upload">
                <div className="icon">
                  <FaRegFileImage className=' text-6xl' />
                </div>
                <div className="text">
                  <span className='text-center'>Click to upload course logo</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
              </label>
              {errors.courseLogoUrl && <span className=' text-red-600 mt-5'>This field is required</span>}
              {uploading && <div className=' text-sm text-gray-500 mt-2'>Uploading...</div>}
              {uploadedImageUrl && <div className=' text-sm text-green-600 mt-2'>Uploaded URL: {uploadedImageUrl}</div>}
            </div>

            <div className="w-full">
              <input className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("courseVideoUrl")} placeholder="Enter video URL " type="text" />
            </div>

            <div className="w-full">
              <label className=" flex items-center justify-between font-semibold text-[#154979d0] mb-2">Course Documents   <button
                type="button"
                onClick={() => append({ documentName: '', documentDescription: '' })}
                className=" px-3 py-2 Box_Shedow cursor-pointer"
              >
                 <IoMdAdd />
              </button></label>
              {fields.map((field, index) => (
                <div key={field.id} className="mb-3">
                  <div className="flex gap-2 mb-2">
                    <input 
                      className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black flex-1" 
                      {...register(`courseDocuments.${index}.documentName`, { required: "Document name required" })} 
                      placeholder="Document name"
                      type="text"
                    />
                    <input 
                      className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black flex-1" 
                      {...register(`courseDocuments.${index}.documentDescription`, { required: "Document description required" })} 
                      placeholder="Document description"
                      type="text"
                    />
                    {fields.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => remove(index)}
                        className="px-3 py-2 text-red-500 cursor-pointer"
                      >
                        <TiDeleteOutline />

                      </button>
                    )}
                  </div>
                  {errors.courseDocuments?.[index] && (
                    <span className='text-red-600 text-sm'>
                      {errors.courseDocuments[index].documentName?.message || errors.courseDocuments[index].documentDescription?.message}
                    </span>
                  )}
                </div>
              ))}
             
            </div>

            <button  className="bg-[#154979] w-full py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">Submit documents</button>
          </form>
        </StyledWrapper>
      </div>
    </>
  )
}


const StyledWrapper = styled.div`
  
  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 20px;
  }

  .title span {
    color: var(--font-color-sub);
    font-weight: 500;
    font-size: 15px;
  }

  .input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid #154979d0;
    background-color: var(--bg-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
  }

  .button-confirm:active {
    box-shadow: 0px 0px #e8e8e8;
    transform: translate(3px, 3px);
  }

  .button-confirm {
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px #e8e8e8;
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .custum-file-upload {
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #154979;
    background-color: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: #154979;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #154979;
  }

  .custum-file-upload input {
    display: none;
  }`;


export default AddCoursePage