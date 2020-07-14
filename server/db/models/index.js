const Museum = require('./museum');
const Artwork = require('./artwork');

Museum.hasMany(Artwork);
Artwork.belongsTo(Museum);

module.exports = {
  Museum,
  Artwork,
};
