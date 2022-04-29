const fs = require("fs");
const Ajv = require("ajv-draft-04");
const ajv = new Ajv(
  { removeAdditional: true },
  { coerceTypes: true }
);
const schemaDef = require("../schema/schema.json");

const jsonHandler = (filePath, callback) => {
  let parsedStatus = false;
  fs.readFile(filePath, "utf8", function (err, fileContents) {
    if (err) {
      return callback(err, null, parsedStatus);
    }
    try {
      const carObject = JSON.parse(fileContents);
      const validate = ajv.compile(schemaDef);

      parsedStatus = validate(carObject);
      if (!parsedStatus) console.log(validate.errors);
     // console.log(carObject);

      return callback(null, carObject, parsedStatus);
    } catch (err) {
      return callback(err, null, parsedStatus);
    }
  });
  fs.unlink(filePath, function (err) {
    if (err) return console.log(err);
  });
};

module.exports = jsonHandler;
