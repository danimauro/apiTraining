const express = require('express');
const app = express();

app.use(require('./evento'));
app.use(require('./organizacion'));
app.use(require('./usuevento'));
app.use(require('./usuario'));
app.use(require('./estudiante'));
app.use(require('./invitado'));
app.use(require('./categoria'));
app.use(require('./login'));

module.exports = app;