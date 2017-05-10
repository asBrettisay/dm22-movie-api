const movies = require('./movies');

exports.index = function(req, res) {

  const results = movies.getBy(req.query);
  res.status(200).send(results);
}

exports.show = function(req, res) {
  let movie_id = req.params.id;
  let movie = movies.getMovieById(movie_id);

  res.status(200).json(movie);
}

exports.create = function(req, res) {
  const newMovie = req.body;

  movies.addMovie(newMovie);

  res.status(200).send('ok');
}

exports.update = function(req, res) {
  const movie_id = req.params.id;
  const movie_update = req.body;

  movies.updateMovie(movie_id, movie_update);

  res.status(200).send('ok');
}

exports.destroy = function(req, res, next) {
  const movie_id = req.params.id;

  movies.destroyMovie(movie_id);
  res.status(200).send('ok');
}