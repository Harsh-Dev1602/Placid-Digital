import Course from "../models/course.model.js";

export const pageAdd = async (req, res) => {
  const { courseId, courseLogoUrl, courseVideoUrl, courseDocuments } = req.body;
  if (!courseId) return res.status(400).json({ error: "courseId is required" });
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const pageObj = { courseLogoUrl, courseVideoUrl, courseDocuments };
    course.coursePage.push(pageObj);
    await course.save();

    const newPage = course.coursePage[course.coursePage.length - 1];
    return res.status(201).json({ message: "Course documents page created", page: newPage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const allPages = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (courseId) {
      const course = await Course.findById(courseId).select('coursePage');
      if (!course) return res.status(404).json({ error: 'Course not found' });
      return res.json(course.coursePage || []);
    }

    const courses = await Course.find().select('courseName coursePage');
    const pages = [];
    courses.forEach((course) => {
      (course.coursePage || []).forEach((p) => {
        pages.push({
          _id: p._id,
          courseId: course._id,
          courseName: course.courseName,
          courseLogoUrl: p.courseLogoUrl,
          courseVideoUrl: p.courseVideoUrl,
          courseDocuments: p.courseDocuments,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        });
      });
    });
    return res.json(pages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const deletePage = async (req, res) => {
  try {
    const { id } = req.params; 
    const updated = await Course.findOneAndUpdate(
      { 'coursePage._id': id },
      { $pull: { coursePage: { _id: id } } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Documents page not found' });
    return res.json({ message: 'Page deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
