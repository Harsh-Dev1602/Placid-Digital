import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegFileImage } from "react-icons/fa";

function AddJob() {
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

    const payload = {
      jobImgUrl: uploadedImageUrl,
      jobTitle: data.jobTitle,
      jobType: data.jobType || '',
      location: data.location || ''
    }

    axios.post("/sfs-app/admin/job-add", payload)
      .then(res => {
        toast.success("Job added successfully")
        reset()
        setUploadedImageUrl("")
      })
      .catch(err => {
        toast.error("Failed to add job")
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
      setValue('jobImgUrl', imageUrl)
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
            <h1 className='text-4xl font-bold  text-center text-[#154979d0]'>Add Job</h1>

            <div className="w-full">
              <label className="custum-file-upload">
                <div className="icon">
                  <FaRegFileImage className=' text-6xl' />
                </div>
                <div className="text">
                  <span className='text-center'>Click to upload job image</span>
                </div>
                <input id="file" type="file" onChange={handleFileChange} />
              </label>
              {errors.jobImgUrl && <span className=' text-red-600 mt-5'>This field is required</span>}
              {uploading && <div className=' text-sm text-gray-500 mt-2'>Uploading...</div>}
              {uploadedImageUrl && <div className=' text-sm text-green-600 mt-2'>Uploaded URL: {uploadedImageUrl}</div>}
            </div>

            <div className="w-full">
              <input  className="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("jobTitle", { required: true })} placeholder="Please enter job title" type="text" />
              {errors.jobTitle && <span className=' text-red-600 mt-5'>This field is required</span>}
            </div>

            <div className="w-full flex gap-3">
              <input className="w-1/2 rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("jobType")} placeholder="Job type (Full-time)" type="text" />
              <input className="w-1/2 rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-[#154979] focus-visible:shadow-none text-black" {...register("location")} placeholder="Location" type="text" />
            </div>

            <button className="bg-[#154979] w-full py-3 rounded-lg text-18 font-medium border text-white border-[#154979] hover:text-[#154979] hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out">Add Job</button>
          </form>
        </StyledWrapper>
      </div>
    </>
  )
}


const StyledWrapper = styled.div`
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
  .custum-file-upload .icon svg { height: 80px; fill: #154979; }
  .custum-file-upload input { display: none; }
`;

export default AddJob
