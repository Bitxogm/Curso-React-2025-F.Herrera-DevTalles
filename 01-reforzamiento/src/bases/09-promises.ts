
const myPromise = new Promise<number>((resolve, reject) => {

  setTimeout(() => {
    // resolve(100);
    reject(`Todo se perdio`)
  }, 2000);

});

myPromise
  .then((value) => {
    console.log(`My moeny is back ${value}`);
  }).catch((reason) => {
    console.log(reason)
  }).finally(( ) => {
    console.log(`Aprende amigo`)
  })