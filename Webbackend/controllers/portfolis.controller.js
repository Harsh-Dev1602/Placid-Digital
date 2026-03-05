import Portfolis from "../models/Portfolis.model.js";


export const portfolisAdd = async (req, res) => {
  const { portfolisName, portfolisImgUrl } = req.body;
  try {
    const newPortfolis = await new Portfolis({
       portfolisName, portfolisImgUrl
    });
    await newPortfolis.save();
    if (newPortfolis) {
      res.status(201).json({
        message: "Portfolis created successfully",
      });
    }
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allPortfolis = async (req, res) => {
  try {
    const portfolis = await Portfolis.find();
    res.json(portfolis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Portfolio API
export const deletePortfolis = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Portfolis.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Portfolis not found" });
    }
    res.json({ message: "Portfolis deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}