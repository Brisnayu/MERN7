const { setError } = require("../../config/error");
const { deleteFile } = require("../../middleware/deletefile");
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
    const design = await Design.findById(id);

    if (!design) {
      return next(setError(400, "Design not found ❌"));
    }

    const designId = await Design.findById(id).populate("designer");
    return res.status(200).json({ data: designId });
  } catch (error) {
    return next(setError(400, "Can't find design by ID 🥹"));
  }
};

const createNewDesign = async (req, res, next) => {
  try {
    const newDesign = new Design(req.body);

    if (req.files && req.files.length > 0) {
      newDesign.images = req.files.map((file) => file.path);
    }

    const designBBDD = await newDesign.save();
    return res.status(201).json({ data: designBBDD });
  } catch (error) {
    console.error("Error", error);
    req.files.map((file) => deleteFile(file.path));
    return next(setError(400, `Can't create new design 🥹 ${error.message}`));
  }
};

const updateDesign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, year, designer, category } = req.body;
    const updateDesign = {};

    const updateDesignBBDD = await Design.findById(id);

    if (!updateDesignBBDD) {
      req.files.map((file) => deleteFile(file.path));
      return next(setError(400, "Design not found ❌"));
    }

    if (req.files && req.files.length > 0) {
      const updateImages = req.files.map((file) => file.path);
      updateDesign.$push = { images: { $each: updateImages } };
    }

    if (name) {
      updateDesign.name = name;
    }
    if (year) {
      updateDesign.year = year;
    }
    if (designer) {
      updateDesign.designer = designer;
    }
    if (category) {
      updateDesign.category = category;
    }

    const updateAllDesign = await Design.findByIdAndUpdate(id, updateDesign, {
      new: true,
    });
    return res.status(200).json({ data: updateAllDesign });
  } catch (error) {
    req.files.map((file) => deleteFile(file.path));
    return next(setError(400, "Can't update design 🥹"));
  }
};

const deleteDesign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldImagesCloudinary = await Design.findById(id);

    if (oldImagesCloudinary.images) {
      oldImagesCloudinary.images.map((image) => deleteFile(image));
    }

    const design = await Design.findByIdAndDelete(id);
    return res.status(200).json({ data: `Removed: ${design.name}` });
  } catch (error) {
    return next(setError(400, "Can't delete design 🥹"));
  }
};

const updateImagesDesign = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldImages = await Design.findById(id);

    if (!oldImages) {
      req.files.map((file) => deleteFile(file.path));
      return next(setError(400, "Design not found ❌"));
    }

    if (oldImages.images && oldImages.images.length > 0) {
      oldImages.images.forEach((image) => deleteFile(image));
    }

    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map((file) => file.path);
      oldImages.images = newImagePaths;
    }

    const updatedDesign = await oldImages.save();

    return res.status(201).json({ data: updatedDesign });
  } catch (error) {
    req.files.map((file) => deleteFile(file.path));
    return next(setError(400, "Loading of new images has failed ❌"));
  }
};

module.exports = {
  getAllDesigns,
  getDesignById,
  createNewDesign,
  updateDesign,
  updateImagesDesign,
  deleteDesign,
};
