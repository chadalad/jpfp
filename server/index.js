const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();

const { startServer } = require('./api/index');
const { sync } = require('./db/index');
const { seed } = require('../seedData');

const startApplication = async () => {
  const NODE_ENV = process.env.NODE_ENV;
  console.log(chalk.cyan(`Application starting, env = ${NODE_ENV}`));
  try {
    // const force = process.env.NODE_ENV !== 'production';

    if (NODE_ENV === 'development') {
      await seed();
    } else {
      await sync();
    }


    // await sync(force);
    // await seed();
    await startServer();
    console.log(chalk.cyanBright('Application started!'))
  } catch (e) {
    console.error(e);
    console.log(chalk.redBright('Application failed to start :('))
  }
};

startApplication();
