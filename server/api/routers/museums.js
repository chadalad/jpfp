const chalk = require('chalk');
const museumRouter = require('express').Router();
const { models : { Museum } } = require('../../db/index');

museumRouter.get('/', async (req, res) => {
  try {
    const museums = await Museum.findAll();

    res.send({
      museums,
    });
  } catch (e) {
    console.log(chalk.redBright(`Error fetching museums from database.`));
    console.error(e);

    res.status(500).send({
      message: `Error fetching museums from database.`,
    });
  }
});

museumRouter.post('/', async (req, res) => {
  try {
    const { 
      name,
      imageURL,
     } = req.body;

    const createdMuseum = await Museum.create({
      name,
      imageURL,
    });

    res.status(201).send({
      museum: createdMuseum,
      message: `Museum ${name} was created successfully!`,
    });
  } catch (e) {
    console.log(chalk.red('Error creating museum.'));
    console.error(e);
    res.status(500).send({
      message: 'Error creating museum.',
    });
  }
});

museumRouter.put('/', async (req, res) => {
  try {
    const { id, name, imageURL } = req.body;
  
    if (!imageURL || !name) {
      res.status(400).send({
        message: `Must include an image URL or museum name to be updated in the request.`,
      })
    } else {
      const updatedMuseum = await Museum.findByPk(req.body.id)

      await updatedMuseum.update({
        name: name || req.museum[id].name,
        imageURL: imageURL || req.museum[id].imageURL,
      })

      res.status(205).send({
        museum: updatedMuseum,
        message: `Museum ${name} updated successfully!`,
      })
    }
  } catch (e) {
    console.log(chalk.red('Error updating museum.', req.museum));
    console.error(e);
    res.status(500).send({
      message: 'Error updating museum.',
    });
  }
});

museumRouter.delete('/', async (req, res) => {
  try{
    const { id } = req.body;
    console.log(chalk.yellow('body:', id, typeof id));
    const destroyedMuseum = await Museum.findByPk(id);
    await destroyedMuseum.destroy();
    res.status(204).send({
      message: `Museum ${destroyedMuseum.name} deleted.`,
    });
  } catch (e) {
    console.log(chalk.red('Error deleting museum.'));
    console.error(e);
    res.status(500).send({
      message: 'Error deleting museum.',
    });
  }
});

module.exports = museumRouter;
