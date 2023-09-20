const { setError } = require("../../config/error");
const { deleteFile } = require("../../middleware/deletefile");
const Designer = require("../models/designer");

const getAllDesigners = async (req, res, next) => {
  try {
    const allDesigners = await Designer.find();
    return res.status(200).json({ data: allDesigners });
  } catch (error) {
    return next(setError(401, "Can't find designer"));
  }
};

const getDesignerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designer = await Designer.findById(id);

    if (!designer) {
      return next(setError(400, "Designer not found ❌"));
    }

    const designerId = await Designer.findById(id).populate({
      path: "design",
      select: "_id name images year category",
    });
    return res.status(200).json({ data: designerId });
  } catch (error) {
    return next(setError(401, "Can't find designer by ID 🥹"));
  }
};

const createNewDesigner = async (req, res, next) => {
  try {
    const newDesigner = new Designer(req.body);

    if (req.file) {
      newDesigner.image = req.file.path;
    }

    const designerBBDD = await newDesigner.save();
    return res.status(201).json({ data: designerBBDD });
  } catch (error) {
    deleteFile(req.file.path);
    return next(setError(401, `Can't create new designer 🥹 ${error.message}`));
  }
};

const updateDesigner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldDesigner = await Designer.findById(id);

    if (!oldDesigner) {
      return next(setError(400, "Designer not found ❌"));
    }

    const updateDesigner = req.body;
    const updateDesign = req.body.design;

    if (updateDesign) {
      const designsToAdd = Array.isArray(updateDesign) ? updateDesign : [updateDesign];

      const update = {
        $addToSet: {
          design: { $each: designsToAdd },
        },
      };

      const updatedDesigner = await Designer.findByIdAndUpdate(id, update, {
        new: true,
      });

      return res.status(200).json({ data: updatedDesigner });
    }

    if (req.file) {
      updateDesigner.image = req.file.path;

      if (oldDesigner.image) {
        deleteFile(oldDesigner.image);
      }
    }

    const updateAllDesigner = await Designer.findByIdAndUpdate(id, updateDesigner, {
      new: true,
    });
    return res.status(200).json({ data: updateAllDesigner });
  } catch (error) {
    return next(setError(401, "Can't update designer 🥹"));
  }
};

const deleteDesigner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designer = await Designer.findByIdAndDelete(id);

    if (designer.image) {
      deleteFile(designer.image);
    }

    return res
      .status(200)
      .json({ data: `Removed: ${designer.name} ${designer.surname}` });
  } catch (error) {
    return next(setError(401, "Can't delete designer 🥹"));
  }
};

module.exports = {
  getAllDesigners,
  getDesignerById,
  createNewDesigner,
  updateDesigner,
  deleteDesigner,
};
