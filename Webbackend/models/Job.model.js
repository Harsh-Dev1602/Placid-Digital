import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobImgUrl: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
