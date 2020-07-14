const apiRouter = require('express').Router();
const chalk = require('chalk');

console.log(chalk.magenta('/api/routers/index.js'))
apiRouter.use('/museums', require('./museums'));
apiRouter.use('/artwork', require('./artwork'));

module.exports = apiRouter;
 