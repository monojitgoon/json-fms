
const Sequelize = require('sequelize');
const { associations } = require('./associations.model');

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:  process.env.DB_DIALECT,
    define: {
      freezeTableName: true,
      underscored: true
    },
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.\n')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

  const modelDefiners = [
    require('./car.model'),
    require('./filedata.model')
  ];
  
  // Define all models according to their files.
  for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
  }
  
  //  adding associations.
  associations(sequelize);


  module.exports = sequelize;