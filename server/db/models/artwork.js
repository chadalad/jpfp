const { UUID, UUIDV4, STRING, INTEGER, DECIMAL, TEXT } = require('sequelize');
const db = require('../db');

const Artwork = db.define('artwork', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  artist: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  estimatedWorth: {
    type: DECIMAL,
    defaultValue: 1.00,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    
  },
  yearCreated: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: TEXT,
    defaultValue: 'https://www.kindpng.com/picc/m/94-948445_painting-palette-icon-paint-palette-icon-png-transparent.png',
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
});

module.exports = Artwork;
