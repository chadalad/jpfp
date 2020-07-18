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
    //  is there a safer way?
    const { 
      name,
      imageURL,
     } = req.body;

    console.log(chalk.yellow(`name: ${name}, imageURL: ${imageURL}`));
    // if (typeof name !== 'string' && typeof imageURL !== 'string') {
    //   res.status(400).send({
    //     message: 'Body of request must include a "name" of type "string" and URL of type "string".',
    //   });
    // } else {
      const createdMuseum = await Museum.create({
        name,
        imageURL,
      });

      console.log('Create Museum Request: ', req.body);
      res.status(201).send({
        museum: createdMuseum,
        message: `Museum ${name} was created successfully!`,
      });
    // } 
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
    // console.log(chalk.yellow('here'));
    // if (!req.museum[id]) {
    //   res.status(400).send({
    //     message: `Museum ${name} does not exist in database.`,
    //   });
    console.log(chalk.cyanBright('Put Museum Reques: ', req.body))
    if (!imageURL || !name) {
      res.status(400).send({
        message: `Must include an image URL or museum name to be updated in the request.`,
      })
    } else {
      // first: find museum (findOne) (find by PK) .then, instance.update
      // try {
      //   await Museum.findOne({
      //     where: {
      //       name: name,
      //     },
      //   });
      // } catch (e) {
      //   console.log(chalk.red(`Museum ${name} not found.`))
      //   console.error(e);
      //   res.status(404).send({
      //     message: `Museum ${name} not found.`
      //   })
      // }

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
