function associations(sequelize) {
	const { filedata, car } = sequelize.models;

    filedata.belongsTo(car, {
        onDelete: "CASCADE",
        foreignKey: {
          name: "carId",
          allowNull: true,
        },
        as: "filedata",
      });
      car.hasOne(filedata, {
        foreignKey: {
          name: 'carId',
          allowNull: true
        },
        as: "filedata",
      });
}

module.exports = { associations};