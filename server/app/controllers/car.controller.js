const jsonHandler = require("../utils/jsonHandler.utils");
const { models } = require("../models");
const Car = models.car;
const FileData = models.filedata;

exports.uploadJson = async (req, res, next) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a JSON file!");
    }

    let path = __basedir + process.env.FILE_PATH + req.file.filename;
    jsonHandler(path, (err, car, parsedStatus) => {
      if (err) {
        parsedStatus = false;
      }

      try {
        if (parsedStatus && car != null) {
          Car.create({
            title: car.title,
            description: car.description,
            model: car.model,
            yearOfCreation:car.year_of_creation
          })
            .then((carData) => {
              return FileData.create({
                fileName: req.file.originalname,
                isParsed: parsedStatus,
                carId: carData.carId,
              });
            })
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the car info successfully, from: " +
                  req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import car info into database, from: " +
                req.file.originalname,
                error: error.message,
              });
            });
        } else {
          FileData.create({
            fileName: req.file.originalname,
            isParsed: parsedStatus,
            carId: null,
          })
            .then(() => {
              res.status(200).send({
                message:
                  "Parsing Failed, Uploaded the filedata only, from: " +
                  req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message:
                  "Parsing Failed, Fail to import filedata into database, from: " +
                  req.file.originalname,
                error: error.message,
              });
            });
        }
      } catch (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
