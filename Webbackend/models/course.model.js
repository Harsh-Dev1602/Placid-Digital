import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
  documentName: { type: String, required: true },
  documentDescription: { type: String, required: true },
});

const coursePageSchema = mongoose.Schema({
  courseLogoUrl: { type: String, required: true },
  courseVideoUrl: { type: String, required: false },
  courseDocuments: [documentSchema],
}, { timestamps: true });

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true, 
    },
    courseImgUrl: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    coursePage:[coursePageSchema]
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;