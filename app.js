let query;
var startInterval;
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const userInput = document.querySelector('#text-input-box');
startButton.addEventListener('click', update);
stopButton.addEventListener('click', stopPics)

function update() {

  query = userInput.value;
  console.log(query);
  fetchPictures(query);
}

function fetchPictures(query) {
  fetch(`https://www.reddit.com/search.json?nsfw=no&q=${query}`)
    .then((response) => {
      return response.json();
    })
    .then((redditData) => {
      const redditPostsArray = redditData.data.children;
      const picArray = pictureArray(redditPostsArray);
      // console.log(picArray);
  
      const bigImg = document.createElement("img");
      startImageLoop(bigImg, picArray);
      
      bigImg.style.width = "400px";
      bigImg.style.paddingTop="50px"
      document.querySelector("#container").appendChild(bigImg);
    })
    .catch((err) => console.log(err));
}

function randomPost(post) {
  const randomNum = Math.floor(Math.random() * post.length);
  return post[randomNum];
}

function pictureArray(postsArray) {
  const picArray = [];
  for (let i = 0; i < 10; i++) {
    const pic = randomPost(postsArray);
    picArray.push(pic.data.thumbnail);
  }
  return picArray;
}

function startImageLoop(img, array) {
  let count = 0;
  startInterval = setInterval(() => {
    img.src = array[count];
    count++;
    if (count == array.length) {
      count = 0;
    }
  }, 3000);
}

function stopPics() {
  console.log('hii');
  clearInterval(startInterval);
}

