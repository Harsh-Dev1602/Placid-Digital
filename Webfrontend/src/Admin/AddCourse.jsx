import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegFileImage } from "react-icons/fa";

function AddCourse() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, setValue } = useForm()
  const [uploading, setUploading] = React.useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState("")
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first")
      return
    }

    const userInfo = {
      courseImgUrl: uploadedImageUrl,
      courseName: data.courseName,
      courseDescription: data.courseDescription,
    }

    axios.post("/sfs-app/course/course-add", userInfo)
      .then(res => {
        toast.success("Course added successfully")
        reset()
        setUploadedImageUrl("")
      })
      .catch(err => {
        toast.error("Failed to add course")
        console.error(err)
      })
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    try {
      setUploading(true)
      const res = await axios.post('/sfs-app/upload/upload-img', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const { imageUrl } = res.data
      setUploadedImageUrl(imageUrl)
      setValue('courseImgUrl', imageUrl)
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
      <div style={{ height: "calc(100vh - 40px)" }} className="w-full flex justify-center items-center">
        <StyledWrapper>
          <form onSubmit={handleSubmit(onSubmit)} className=" w-2xl mx-auto space-y-4 p-5 relative shadow-lg">
            <h1 className='text-4xl font-bold  text-center text-[#154979d0]'>Add Course</h1>

            <div className="w-full">
              <label className="custum-file-upload">
                <div className="icon">
                  <FaRegFileImage className=' text-6xl' />
                </div>
                <div className="text">
                  <span className='text-center'>Click to upload course image</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
              </label>
              {errors.courseImgUrl && <span className=' text-red-600 mt-5'>This field is required</span>}
              {uploading && <div className=' text-sm text-gray-500 mt-2'>Uploading...</div>}
              {uploadedImageUrl && <div className=' text-sm text-green-600 mt-2'>Uploaded URL: {uploadedImageUrl}</div>}
            </div>

            <div className="w-full">
              <input  className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("courseName", { required: true })} placeholder="Please enter a course name" type="text" />
              {errors.courseName && <span className=' text-red-600 mt-5'>This field is required</span>}
            </div>
            <div className="w-full">
              <input  className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("courseDescription", { required: true })} placeholder="Please enter course description" type="text" />
              {errors.courseDescription && <span className=' text-red-600 mt-5'>This field is required</span>}
            </div>
            <button className="bg-[#154979] w-full py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">Add Course</button>
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
    color: #6a7282 ;
  }

  .custum-file-upload input {
    display: none;
  }`;


export default AddCourse