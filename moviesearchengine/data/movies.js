//import axios, md5
import axios from 'axios';

export const getMoviessearch = async (title) => {
  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${title}`);
  return data;
}

export const getMoviessearch2 = async (title, num) => {
  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${title}&page=${num}`);
  return data;
}

export const getMoviesId = async (id) => {
  const { data } = await axios.get(`http://www.omdbapi.com/?apikey=CS546&i=${id}`);
  return data;
}

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if (!title){
    throw "No search term given";
  }
  if (typeof title !== 'string') {
    throw "Given search term is not a string";
  }
  let str = title.trim();
  if (str.length === 0){
    throw "Given search term is empty";
  }
  let data = await getMoviessearch(str);
  let data2 = data.Search;
  let num = 0;
  if (data.Response === 'True'){
    num = data.totalResults - 10;
    let iterator = 2;
    while (num > 0 && iterator < 6){
      data = await getMoviessearch2(str, iterator);
      data2.push(...data.Search);
      num -= 10;
      iterator += 1;
    }
    for (let movie of data2){
      let posterval = movie.Poster;
      if (posterval === "N/A"){
        movie.truthval = false;
      }
      else{
        movie.truthval = true;
      }
    }
    return data2;
  }
  throw `We're sorry, but no results were found for ${str}.`;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  if (!id){
    throw "No id given";
  }
  if (typeof id !== 'string') {
    throw "Given id is not a string";
  }
  let str = id.trim();
  if (str.length === 0){
    throw "Given id is empty";
  }
  let data = await getMoviesId(str);
  if (data.Response === 'True'){
    let posterval = data.Poster;
    if (posterval === "N/A"){
      data.truthval = false;
    }
    else{
      data.truthval = true;
    }
    return data;
  }
  throw "No Movie Found";
};
