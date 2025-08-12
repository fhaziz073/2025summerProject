//import axios, md5
import axios from "axios";
import "dotenv/config";
export const getMoviesByTitleFromAPI = async (title) => {
  const API_KEY = process.env.API_KEY;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
  );
  return data;
};

export const getMoviesByTitleAndPageNumberFromAPI = async (title, num) => {
  const API_KEY = process.env.API_KEY;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${API_KEY}&page=${num}`
  );
  return data;
};

export const getMovieByIdFromAPI = async (id) => {
  const API_KEY = process.env.API_KEY;
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_id=${id}`
  );
  return data;
};

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if (!title) {
    throw "No search term given";
  }
  if (typeof title !== "string") {
    throw "Given search term is not a string";
  }
  let str = title.trim();
  if (str.length === 0) {
    throw "Given search term is empty";
  }
  let movieData = await getMovieByIdFromAPI(str);
  let movieSearchResults = movieData.results;
  let num = 0;
  if (movieData.total_results > 0) {
    num = movieData.total_results - 10;
    let iterator = 2;
    while (num > 0 && iterator < 6) {
      movieData = await getMoviesByTitleAndPageNumberFromAPI(str, iterator);
      movieSearchResults.push(...movieData.results);
      num -= 10;
      iterator += 1;
    }
    for (let movie of movieSearchResults) {
      if (movie.poster_path) {
        movie.truthval = true;
      } else {
        movie.truthval = false;
      }
    }
    return movieSearchResults;
  }
  throw `We're sorry, but no results were found for ${str}.`;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  if (!id) {
    throw "No id given";
  }
  if (typeof id !== "string") {
    throw "Given id is not a string";
  }
  let str = id.trim();
  if (str.length === 0) {
    throw "Given id is empty";
  }
  let data = await getMovieByIdFromAPI(str);
  if (data.Response === "True") {
    let posterval = data.Poster;
    if (posterval === "N/A") {
      data.truthval = false;
    } else {
      data.truthval = true;
    }
    return data;
  }
  throw "No Movie Found";
};
