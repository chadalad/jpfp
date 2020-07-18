/**
 * Inspo:
 * 
 * David Zwirner Gallery:
 *    Kusama sculptures
 * Gladstone Gallery:
 *    Ugo Rondinone
 *    Paloma Varga Weis
 *    Ian Cheng (B.O.B)
 * Whitney:
 * Moma:
 * Met:
 * 
 * Madrid:
 *    Guernica by picasso
 * Whitney:
 *    beaded kitchen
 * 
 */

const { sync } = require('./server/db/index');
const { models: { Museum, Artwork }} = require('./server/db/index');
const chalk = require('chalk');

 // Museums
const startingMuseums = [
  {
    name: 'Gladstone Gallery',
  },
  {
    name: 'David Zwirner Gallery',
  },
  {
    name: 'The Whitney Museum of American Art',
  },
];

const startingArtwork = [
  {
    title: 'untitled',
    artist: 'chad',
    estimatedWorth: 10000000.00,
    yearCreated: 2020,
  },
  {
    title: 'numba1',
    artist: 'lou',
    estimatedWorth: 19.95,
    yearCreated: 1994,
  },
  {
    title: 'oops',
    artist: 'homie',
    estimatedWorth: 6000.01,
    yearCreated: 1983,
  },
  {
    title: 'zwirndog',
    artist: 'keith',
    estimatedWorth: 0,
    yearCreated: 1969,
  },
];



const seed = async () => {
  await sync(true);
  try {
    //  get museum art from API. museumart.axios.get()
    //  have an object, map over, and push to db
    
    await Promise.all(startingArtwork.map(piece => Artwork.create(piece)));
    await Promise.all(startingMuseums.map(gallery => Museum.create(gallery)));

    const zwirner = await Museum.findOne({
      where: {
        name: 'David Zwirner Gallery',
      },
    });

    const zwirndog = await Artwork.findOne({
      where: {
        title: 'zwirndog',
      },
    });

    await zwirner.addArtworks([zwirndog]);

    console.log(chalk.greenBright('DB seeded successfully!'));
  } catch (e) {
    console.log(chalk.red('DB seeding failed'));
    throw e;
  }
};

module.exports = {
  seed,
};
