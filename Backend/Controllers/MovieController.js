const Movie = require("../Models/MovieModel");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  // create folder uploads
  destination: (req, file, cb) => cb(null, 'uploads/'),
  // file renaming
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage }).single('poster');

const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMovie = async (req, res) => {
  const { title, releaseDate, duration, description, category, rating } = req.body;

  try {
    const movie = new Movie({
      title,
      releaseDate,
      duration,
      description,
      category,
      rating,
      poster: req.file ? req.file.path : " ",
    });
    console.log(movie);

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.title = req.body.title || movie.title;
    movie.description = req.body.description || movie.description;
    movie.genre = req.body.genre || movie.genre;
    movie.director = req.body.director || movie.director;
    movie.releaseDate = req.body.releaseDate || movie.releaseDate;
    movie.rating = req.body.rating || movie.rating;

    if (req.file) movie.poster = req.file.path;

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    await movie.remove();
    res.json({ message: 'Movie removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMovie, addMovie, updateMovie, deleteMovie, upload };
