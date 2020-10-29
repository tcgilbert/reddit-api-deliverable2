const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const userInput = document.querySelector('#text-input-box');
const h1 = document.querySelector('#h1');
const h4 = document.querySelector('#h4');
startButton.addEventListener('click', update);


function update() {
  var userInput = document.querySelector('#text-input-box');
  query = userInput.value;
  console.log(query);
  fetchPictures(query);
  var startButton = document.querySelector('#start-button');
  startButton.remove();
  userInput.remove();
  const h4 = document.querySelector('#h4');
  h4.remove();
  const h1 = document.querySelector('#h1');
  h1.remove();
}

function stopUpdate() {
  var bigImg = document.querySelector('.bigImg');
  var stopButton = document.querySelector('#stop-button');
  bigImg.remove();
  stopButton.remove();
  
  const h1 = document.createElement('h1'); 
  h1.setAttribute('id','h1');
  h1.textContent = 'Reddit Picture Generator';
  document.querySelector("body").appendChild(h1);
  
  const h4 = document.createElement('h4'); 
  h4.setAttribute('id','h4');
  h4.textContent = `Choose a topic and we'll display some pictures`;
  document.querySelector("body").appendChild(h4);
  
  const userInput = document.createElement('input');
  userInput.setAttribute('id','text-input-box');
  document.querySelector('body').appendChild(userInput);

  const startButton = document.createElement('button'); 
  startButton.setAttribute('id','start-button');
  startButton.classList.add('btn');
  startButton.classList.add('btn-outline-danger');
  startButton.textContent = "Start";
  document.querySelector("body").appendChild(startButton);
  startButton.addEventListener('click', update);
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
      bigImg.setAttribute('class','bigImg');
      bigImg.style.width = "300px";
      bigImg.style.paddingTop="150px"
      document.querySelector("#container").appendChild(bigImg);

      const stopButton = document.createElement('button');
      stopButton.setAttribute('id','stop-button');
      stopButton.textContent = "Stop";
      stopButton.classList.add('btn');
      stopButton.classList.add('btn-outline-danger');
      stopButton.style.marginTop = "200px";
      document.querySelector(".button-input").appendChild(stopButton);
      stopButton.addEventListener('click', stopUpdate);
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
  }, 2000);
}