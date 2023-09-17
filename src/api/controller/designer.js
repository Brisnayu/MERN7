const { setError } = require("../../config/error");
const Designer = require("../models/designer");

const getAllDesigners = async (req, res, next) => {
  try {
    const allDesigners = await Designer.find();
    return res.status(200).json({ data: allDesigners });
  } catch (error) {
    return next(setError(400, "Can't find designer"));
  }
};

const getDesignerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designerId = await Designer.findById(id).populate("design");
    return res.status(200).json({ data: designerId });
  } catch (error) {
    return next(setError(400, "Can't find designer by ID 🥹"));
  }
};

const createNewDesigner = async (req, res, next) => {
  try {
    const newDesigner = new Designer(req.body);
    const designerBBDD = await newDesigner.save();
    return res.status(201).json({ data: designerBBDD });
  } catch (error) {
    return next(setError(400, `Can't create new designer 🥹 ${error.message}`));
  }
};

const updateDesigner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateDesigner = req.body;
    const updateDesign = req.body.design;

    if (updateDesign) {
      const update = {
        $addToSet: {
          design: { $each: updateDesign },
        },
      };
      const updateDesigns = await Designer.findByIdAndUpdate(id, update, { new: true });
      return res.status(200).json({ data: updateDesigns });
    }

    const updateAllDesigner = await Designer.findByIdAndUpdate(id, updateDesigner, {
      new: true,
    });
    return res.status(200).json({ data: updateAllDesigner });
  } catch (error) {
    return next(setError(400, "Can't update designer 🥹"));
  }
};

const deleteDesigner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const designer = await Designer.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ data: `Removed: ${designer.name} ${designer.surname}` });
  } catch (error) {
    return next(setError(400, "Can't delete designer 🥹"));
  }
};

module.exports = {
  getAllDesigners,
  getDesignerById,
  createNewDesigner,
  updateDesigner,
  deleteDesigner,
};
