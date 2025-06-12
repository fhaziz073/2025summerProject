//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import * as movies from '../data/movies.js'

const idValid = async (string) => {
  if (!string){
    throw "Error";
  }
  if (typeof string !== 'string') {
    throw "Error";
  }
  let str = string.trim();
  if (str.string === 0){
    throw "Error";
  }
  return true;
}

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try{
    res.render('./home');
  }
  catch(e){
    res.status(500).render('./error', {error: e});
  }
});

router.route('/moviesearch').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  let movieval = req.body.searchByTitle
  try{
    req.body.searchByTitle = await idValid(req.body.searchByTitle);
  }
  catch(e){
    if (e){
      return res.status(400).render('./error', {Error: "You must enter a search term!", Class: "error"});
    }
  }
  let movieList = 0;
  try{
    movieList = await movies.searchMoviesByTitle(movieval);
  }
  catch(e){
    if (e){
      return res.status(404).render('./error', {Error: `We're sorry, but no results were found for ${movieval}.`, Class: "movie-not-found"});
    }
  }
  try{
    res.render('./searchResults', {movie: movieList});
  }
  catch(e){
    res.status(500).render('./error', {error: e});
  }
});

router.route('/getmovie/:id').get(async (req, res) => {
  //code here for GET a single movie
  let paramval = req.params.id;
  try {
    req.params.id = await idValid(req.params.id);
  }
  catch(e){
    return res.status(400).render('./error', {error: e});
  }
  let movieval = 0
  try{
    movieval = await movies.getMovieById(paramval);
  }
  catch(e){
    if (e){
      return res.status(404).render('./error', {Error: "No movie found with that id!", Class: "error"});
    }
  }
  try{
    res.render("./getmovie", {movie: movieval, title: movieval.Title});
  }
  catch(e){
    res.status(500).render('./error', {error: e});
  }
});

export default router;