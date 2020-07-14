const { UUID, UUIDV4, STRING } = require('sequelize');
const db = require('../db');

const Museum = db.define('museum', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
    defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQi4m51e_5-oI511dCgNhATVHg2OEQp1l-0jw&usqp=CAU',
  },
});

module.exports = Museum;
