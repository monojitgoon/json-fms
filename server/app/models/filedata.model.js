const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  let FileData = sequelize.define(
    "filedata",
    {
      fileId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isParsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { updatedAt: false, createdAt: "timeOfUpload" }
  );
  return FileData;
};
