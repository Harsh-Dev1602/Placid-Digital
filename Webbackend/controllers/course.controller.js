import Course from "../models/course.model.js";

//  Course add API
export const courseAdd = async (req, res) => {
  const { courseName, courseImgUrl, courseDescription } = req.body;
  try {
    const newCourse = await new Course({
      courseName, courseImgUrl, courseDescription
    });
    await newCourse.save();
    if (newCourse) {
      res.status(201).json({
        message: "Course created successfully",
      });
    }
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allCourse = async (req, res) => {
  try {
    const course = await Course.find();
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Course API
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

