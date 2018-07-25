const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { name, nascimento } = req.body;
  const idade = moment().diff(nascimento, 'years', true);

  if (idade >= 18) {
    res.redirect(`/major?name=${name}&nascimento=${nascimento}`);
  } else {
    res.redirect(`/minor?name=${name}&nascimento=${nascimento}`);
  }
});

app.get('/major', (req, res) => {
  const { name } = req.query;
  res.render('major', { name });
});

app.get('/minor', (req, res) => {
  const { name } = req.query;
  res.render('minor', { name });
});

app.listen(3000);
