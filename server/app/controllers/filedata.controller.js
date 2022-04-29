const { models } = require("../models");
const FileData = models.filedata;

exports.getAllFileData = async (req, res, next) => {
  try {
    const ALL = await FileData.findAll();
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};
