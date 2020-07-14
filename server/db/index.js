const chalk = require('chalk');
const { Museum, Artwork } = require('./models/index');
const db = require('./db');

const sync = async (force = false) => {
  try {
    await db.sync({ force });
    console.log(chalk.green(`Database synced successfully! Force: ${force}`));
  } catch (e) {
    console.log(chalk.red(`Database failed to sync. Force: ${force}`));
    throw e;
  }
}

module.exports = {
  sync,
  models: {
    Museum,
    Artwork,
  },
};
