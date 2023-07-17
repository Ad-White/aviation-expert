let gameLevel = 1;
let generatorStarted = true;

let attempts = 2;

let currentGameImage = [];

let answer = "";

let highlightedTilesList = [];

let gameImageSelection = [
   {gameImageName:  'orange', gameImage: 'orangeImg'},
   {gameImageName:  'yellow', gameImage: 'yellowImg'},
   {gameImageName:  'green', gameImage: 'greenImg'}
];

setBackgroundImage();

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGenerator);

let stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', stopGenerator);

messageArea.innerHTML = `<p>Press Start To Begin Game</p>`;
  
function startGenerator() {

  if (generatorStarted === true && attempts > 0 && gameLevel <= 3) {
    messageArea.innerHTML = `<p>Press Stop To Select Your Tile</p>`;
    
    tileGenerator();
    
  } else {
    generatorStarted = false;
    
    console.log('generator stopped');
    reveal();
    askForGuess();
  }
}


function setBackgroundImage() {
   
  currentGameImage = gameImageSelection[Math.floor(Math.random() * gameImageSelection.length)];
 console.log("current game image now " + currentGameImage.gameImage);

  chosenImageName = currentGameImage.gameImageName;
  console.log("this is the chosenImageName " + currentGameImage.gameImageName);
  
  answer = chosenImageName;
  console.log("this is the answer " + answer);

  let setDisplay = document.getElementById('tileTable');
    setDisplay.style.background = `${chosenImageName}`;
  
  currentGameImage = gameImageSelection.indexOf(currentGameImage);
  
  if (currentGameImage > -1) { 
    gameImageSelection.splice(currentGameImage, 1);
  }
    console.log(gameImageSelection); 
}

 
function tileGenerator() {

startBtn.removeEventListener('click', startGenerator);

  let tiles = document.querySelectorAll(".tile" && ".inPlay");

  let randomTile = tiles[Math.floor(Math.random() * tiles.length)];
  addHl(randomTile);
  hlTile = randomTile;
  
  console.log(randomTile);
}


function addHl(tile) {
  tile.classList.add("highlight");
  
  const waitAbit = setTimeout(removeHighlight, 300);
  function removeHighlight() {
    tile.classList.remove("highlight");
    clearTimeout(waitAbit);
    
    console.log("tile id:" + tile.id);
    
    if (stopBtn === true) {
      stopGenerator();
    } else {
      startGenerator();
    }
  }
}


function stopGenerator() {

  hlTile.classList.add('ll');

  let selectedTile = hlTile;
  console.log(selectedTile);
  stopBtn.removeEventListener('click', stopGenerator);

  generatorStarted = false;

}


function reveal() {

  highlightedTilesList.push(hlTile);
  console.log(highlightedTilesList);

  hlTile.classList.add('revealed');
  hlTile.classList.remove('inPlay');
  stopBtn.addEventListener('click', stopGenerator);
  
}


function askForGuess() {

  let msg = document.getElementById('messageArea');
  msg.innerHTML = `<p>Please Enter Your Guess....</p>`;

   addUserInput();
  
  startBtn.addEventListener('click', startGenerator);

  generatorStarted = true;
  
}


function addUserInput() {

document.getElementById("userAnswer").innerHTML = `<input type="text" id='userInputArea'></input><br><button id="userBtn" class="button">submit guess</button>`;
  userBtn.addEventListener('click', checkAnswer);
}


function removeUserInput() {
 document.getElementById('userAnswer').innerHTML = "";
}

function checkAnswer() {
 
  userAnswer = document.getElementById('userInputArea').value.trim().toLowerCase();

  // function regExUserAnswer(userAnswer) {
  //   // return userAnswer = /[\w\s]+/.test(userAnswer);
  //    //return userAnswer = /[a-zA-Z0-9\s]+/.test(userAnswer);
  //    return userAnswer = /^[a-zA-Z0-9]+$/.test(userAnswer);
  // }
  
  if(userAnswer === answer) {
    console.log('winner');
    messageArea.innerHTML = `<p>Congratulations!</p>`;
    console.log(userAnswer);
    stopGenerator();
    
    console.log(`game level: ${gameLevel}`);
   
  messageArea.innerHTML += `<p>Level ${gameLevel} Completed!</p>`;
    startBtn.removeEventListener('click', startGenerator);
stopBtn.removeEventListener('click', stopGenerator);
    
    gameLevel++;

    if(gameLevel > 3) {
      
      startBtn.remove();
      stopBtn.remove();

document.getElementById('userAnswer').innerHTML = "";

      messageArea.innerHTML = `<p>Game Completed!</p>` + `<br>` + `<h1>You Are An Aviation Master!!!!</h1>`;
      
      return;
    }
    
 // messageArea.innerHTML += `<p>Level Cleared</p>`;
    
    document.getElementById('userAnswer').innerHTML = /*`<p>Level: ${gameLevel}<br>*/`<button id='nextLevelBtn' class="button">Next Level</button></p>`;
let nextLevelBtn = document.getElementById('nextLevelBtn');   
    nextLevelBtn.addEventListener('click', nextLevel); 
  
  } else if  (userAnswer != answer && attempts >= 1) {
    console.log('not quite!');
    removeUserInput();
    messageArea.innerHTML = `<p>Sorry, That's Not Right!<br>Press Start To Try Again...</p>`;
    attempts--;
    console.log(attempts);
    if(attempts != 1) {
    messageArea.innerHTML += `<p>You Have ${attempts} Attempts Remaining.</p>`;
    } else {
       messageArea.innerHTML += `<p>You Have ${attempts} Attempt Remaining.</p>`;
    }
    
    generatorStarted = true;

    if (userAnswer != answer && attempts <= 0) {
       messageArea.innerHTML = `<p>Game Over!</p>`;

startBtn.removeEventListener('click', startGenerator);
      return;
    }
  }
} 

function nextLevel() {

   for(let i=0; i < highlightedTilesList.length; i++) {
      highlightedTilesList[i].classList.remove("revealed");
      highlightedTilesList[i].classList.remove("ll");
      highlightedTilesList[i].classList.add('inPlay');
        
  }

  attempts = 2;
  startBtn.addEventListener('click',    startGenerator);
  
  generatorStarted = true;
  
document.getElementById('messageArea').innerHTML = `<p>Press Start To Play</p>`;
  stopBtn.addEventListener('click', stopGenerator);

  if(startBtn) {
    document.getElementById('userAnswer').innerHTML = "";
  }
  
  if(gameLevel === 2) {
    setBackgroundImage();
  } else if (gameLevel === 3) {
    setBackgroundImage();
  }
}