import mongoose from "mongoose";

const portfolisSchema = mongoose.Schema({
    portfolisName : {
        type: String,
        required: true, 
    },
    portfolisImgUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Portfolis = mongoose.model("Portfolis", portfolisSchema);
export default Portfolis;