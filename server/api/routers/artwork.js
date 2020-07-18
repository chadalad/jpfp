const chalk = require('chalk');
const artworkRouter = require('express').Router();
const { models: { Artwork, Museum } } = require('../../db/index');
const { Op } = require('sequelize');

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

artworkRouter.get('/available', async (req, res) => {
  try {
    const availableArt = await Artwork.findAll({
      where: {
        museumId: null,
      }
    });

    res.status(200).send({
      availableArt,
      message: 'Available art found and sent.'
    })
  } catch (e) {
    console.log(chalk.redBright(`Error fetching artwork from database.`));
    console.error(e);

    res.status(500).send({
      message: 'Error fetching available artwork from database.',
    });
  }
});

artworkRouter.get('/onDisplayHere/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(chalk.yellow(id));

    const artOnDisplayAtId = await Artwork.findAll({
      where: {
        museumId: id,
      }
    });

    res.status(200).send({
      displayed: artOnDisplayAtId,
      message: 'Art on display at found and sent',
    });
  } catch (e) {
    console.log(chalk.redBright(`Error fetching artwork on display here from database.`));
    console.error(e);

    res.status(500).send({
      message: 'Error fetching artwork on display here from database.',
    });
  }
})

artworkRouter.put('/museumIdUpdate', async (req, res) => {
  try {
    const {
      idArt,
      idMuseum,
    } = req.body;
    console.log('idArt: ', idArt);
    console.log('idMuseum:', idMuseum);

    await Artwork.update({ museumId: idMuseum },{
      where: {
        id: idArt,
      },
    });

    const updatedArt = await Artwork.findByPk(idArt);

    console.log('updatedArt', updatedArt);

    res.status(205).send({
      message: `Artwork successfully updated.`,
      updatedMusIdArt: updatedArt,
    });
  } catch (e) {
    console.log(chalk.red('Error updating artwork.'));
    console.error(e);
    res.status(500).send({
      message: 'Error updating artwork.',
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
      typeof yearCreated !== 'number'
    ) {
      res.status(400).send({
        message: "Body of request must include a title, artist of type 'String' and a yearCreated and estimatedWorth of type 'number'.",
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
