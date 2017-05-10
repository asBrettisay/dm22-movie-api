const express = require('express');
const movies = require('./movies');
const movieCtrl = require('./moviesCtrl');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(isAuthed);
app.use(cors());

app.options('*', cors());

function logIncomingRequest(req, res, next) {
  console.log('Incoming Request!');

  next();
}

function logBody(req, res, next) {
  console.log(req.body);

  next();
}


function isAuthed(req, res, next) {
  if (req.query.username == 'brett' && req.query.password == 'ilovedogs') {
    next();
  } else {
    res.status(403).send('Nope');
  }
}


app.get('/api/movies', logIncomingRequest, movieCtrl.index);
app.get('/api/movie/:id', movieCtrl.show);
app.post('/api/movie', logBody, logIncomingRequest, movieCtrl.create);
app.put('/api/movie/:id', logIncomingRequest, logBody, movieCtrl.update);
app.delete('/api/movie/:id', movieCtrl.destroy);


app.listen(8000, function() {
  console.log('Listening on 8000');
});