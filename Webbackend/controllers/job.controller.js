import Job from "../models/Job.model.js";

export const jobAdd = async (req, res) => {
  const { jobTitle, jobImgUrl, jobType, location } = req.body;
  try {
    const newJob = new Job({ jobTitle, jobImgUrl, jobType, location });
    await newJob.save();
    return res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const allJob = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Job not found" });
    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

