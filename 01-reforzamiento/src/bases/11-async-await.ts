import type { GiphyRandomResponse } from "../data/giphy.response";
require('dotenv').config()

const API_KEY = process.env.API_KEY;


// abrir la petcion con una promesa

const createImageInsideDOm = (url: string) => {
  
  const imgElement = document.createElement('img');
  imgElement.src = url;
  document.body.append(imgElement);
}

const getRandomGif = async (): Promise<string>  => {
  const response  = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);

  const {data}: GiphyRandomResponse = await response.json();

  return data.images.original.url

};

// getRandomGif().then(
//   url => createImageInsideDOm(url)
// )
getRandomGif().then(createImageInsideDOm);


