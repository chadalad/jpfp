const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = require('./server')

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../../public');
const DIST_PATH=path.join(__dirname, '../../dist');

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));
app.use('/api', require('./routers/index'));


app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_PATH, './index.html'));
})

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
    res();
  });
});

module.exports = {
  app,
  startServer,
};
