const chalk = require('chalk');
const artworkRouter = require('express').Router();
const { models: { Artwork } } = require('../../db/index');

artworkRouter.get('/', async (req, res) => {
  try {
    const artwork = await Artwork.findAll();

    res.send({
      artwork,
    });
  } catch (e) {
    console.log(chalk.redBright(`Error fetching artwork from database.`));
    console.error(e);

    res.status(500).send({
      message: 'Error fetching artwork from database.',
    });
  }
});

artworkRouter.post('/', async (req, res) => {
  try {
    const { 
      title, 
      artist, 
      estimatedWorth, 
      yearCreated, 
      imageURL 
    } = req.body;

    if (
      typeof title !== 'string' &&
      typeof artist !== 'string' &&
      typeof estimatedWorth !== 'number' &&
      typeof yearCreated !== 'number' &&
      typeof imageURL !== 'string'
    ) {
      res.status(400).send({
        message: "Body of request must include a title, artist, and URL of type 'String' and a yearCreated and estimatedWorth of type 'number'.",
      })
    } else {
      const createdArtwork = await Artwork.create({
        title,
        artist,
        estimatedWorth,
        yearCreated,
        imageURL,
      });

      res.status(201).send({
        artwork: createdArtwork,
        message: `Artwork ${title} by ${artist} was created successfully!`,
      });
    } 
  } catch (e) {
    console.log(chalk.red('Error creating Artwork.'));
    console.error(e);
    res.status(500).send({
      message: 'Error creating Artwork.',
    });
  }
});

artworkRouter.put('/', async (req, res) => {
  try {
    const {
      id,
      title,
      artist,
      estimatedWorth,
      yearCreated,
      imageURL,
    } = req.body;

    if (!title && !artist && !estimatedWorth && !yearCreated && !imageURL) {
      res.status(400).send({
        message: 'Request must include title, artist, estimatedWorth, yearCreated, and imageURL.',
      });
    } else {
      const updatedArtwork = await Artwork.findByPk(id);

      await updatedArtwork.update({
        title: title || req.artwork[id].title,
        artist: artist || req.artwork[id].artist,
        estimatedWorth: estimatedWorth || req.artwork[i].estimatedWorth,
        yearCreated: yearCreated || req.artwork[id].yearCreated,
        imageURL: imageURL || req.artwork[id].imageURL,
      });

      res.status(205).send({
        artwork: updatedArtwork,
        message: `Artwork ${title} successfully updated!`,
      });
    }
  } catch (e) {
    console.log(chalk.red('Error updating artwork.'));
    console.error(e);
    res.status(500).send({
      message: 'Error updating artwork.',
    });
  }
});

artworkRouter.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const destroyedArtwork = await Artwork.findByPk(id);
    await destroyedArtwork.destroy();

    res.status(204).send({
      message: `Artwork ${destroyedArtwork} successfully removed!`,
    });
  } catch (e) {
    console.log(chalk.red('Error deleting artwork.'));
    console.error(e);
    res.status(500).send({
      message: 'Error deleting artwork',
    });
  }
})

module.exports = artworkRouter;
