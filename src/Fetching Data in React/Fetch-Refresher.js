// A bsaic fetch request.

const image = document.querySelector("img");

fetch("https://picsum.photos/v2/list")
  .then((response) => response.json())
  .then((response) => {
    image.src = response[0].download_url;
  })
  .catch((error) => console.error(error));


// Including an identification header.
const imageTwo = document.querySelector('img');

fetch("https://picsum.photos/v2/list", {
    headers: {
        "User-Agent": "the-odin-project"
    }
})  
  .then((response) => response.json())
  .then((response) => {
    imageTwo.src = response[0].download_url;
  })
  .catch((error) => console.error(error));

