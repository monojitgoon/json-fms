const fileDataController = require('../controllers').fileDataController;
const carController = require("../controllers").carController;
const fileuploadMiddleware = require("../middlewares/fileupload.middleware");

module.exports = (app) => {

    app.get('/api',(req,res) => {
        res.status(200).send({
            data : "Welcome to JSON FMS"
        })
    })
    app.post("/api/jsonfileupload", fileuploadMiddleware.single("file"), carController.uploadJson);
    app.get("/api/filedata", fileDataController.getAllFileData);

}