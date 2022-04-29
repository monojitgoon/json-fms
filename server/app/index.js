const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')

const errorMiddleware = require('./middlewares/error.middleware');
const HttpException = require('./utils/HttpException.utils');
const sequelize = require("./models");

global.__basedir = __dirname;

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// enabling cors for all requests by using cors middleware
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  next();
});


require('./routes')(app);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
app.use(errorMiddleware);
(async () => {
  try {
    await sequelize.sync({ force: false });
   // set port, listen for requests
    const PORT = process.env.ENV_PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(error);
  }
})();
