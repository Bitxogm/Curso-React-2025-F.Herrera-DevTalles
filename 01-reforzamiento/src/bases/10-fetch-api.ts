import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY = API_KEY .env ;

const myRequest = fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);

// abrir la petcion con una promesa

const createImageInsideDOm = (url: string) => {

  const imgElement = document.createElement('img');
  imgElement.src = url;
  document.body.append(imgElement);
}

myRequest
.then(( response ) => response.json())
.then(( {data}: GiphyRandomResponse) => {

  const imageUrl = data.images.original.url;
  console.log(imageUrl);

  createImageInsideDOm(imageUrl);
})
.catch( error => {
  console.error(error);
});


