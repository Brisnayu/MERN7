const { setError } = require("../../config/error");
const Design = require("../models/design");

const getAllDesigns = async (req, res, next) => {
  try {
    const allDesigns = await Design.find();
    return res.status(200).json({ data: allDesigns });
  } catch (error) {
    return next(setError(400, "Can't find designs 🥹"));
  }
};

const getDesignById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designId = await Design.findById(id).populate("designer");
    return res.status(200).json({ data: designId });
  } catch (error) {
    return next(setError(400, "Can't find design by ID 🥹"));
  }
};

const createNewDesign = async (req, res, next) => {
  try {
    const newDesign = new Design(req.body);
    const designBBDD = await newDesign.save();
    return res.status(201).json({ data: designBBDD });
  } catch (error) {
    console.error("Error", error);
    return next(setError(400, `Can't create new design 🥹 ${error.message}`));
  }
};

const updateDesign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateDesign = req.body;
    const imagesToAdd = req.body.images;

    if (imagesToAdd) {
      const update = {
        $addToSet: {
          images: { $each: imagesToAdd },
        },
      };
      const updateDesign = await Design.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json({ data: updateDesign });
    }

    const updateAllDesign = await Design.findByIdAndUpdate(id, updateDesign, {
      new: true,
    });
    return res.status(200).json({ data: updateAllDesign });
  } catch (error) {
    return next(setError(400, "Can't update design 🥹"));
  }
};

const deleteDesign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const design = await Design.findByIdAndDelete(id);
    return res.status(200).json({ data: `Removed: ${design.name}` });
  } catch (error) {
    return next(setError(400, "Can't delete design 🥹"));
  }
};

module.exports = {
  getAllDesigns,
  getDesignById,
  createNewDesign,
  updateDesign,
  deleteDesign,
};
