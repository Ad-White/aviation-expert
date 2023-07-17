let gameLevel = 1;
let generatorStarted = true;
let answer = "spitfire";
let attempts = 2;

let chosenDisplayArray = [];

let highlightedTilesList = [];

 setBackgroundImage();

let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGenerator);

let stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', stopGenerator);

messageArea.innerHTML = 'Press Start To Begin Game';
  
function startGenerator() {

  if (generatorStarted === true && attempts > 0 && gameLevel <= 3) {
    messageArea.innerHTML = 'Press Stop To Select Your Tile';
    
    tileGenerator();
    
  } else {
    generatorStarted = false;
    
    console.log('generator stopped');
    reveal();
    askForGuess();
   
  }
  
}


function setBackgroundImage() {

let colors = ['pink', 'purple', 'yellow'];
let chosenDisplay = "";
  
for(i=0; i < colors.length; i++) {
 let randomChosenDisplay = colors[Math.floor(Math.random() * colors.length)];

  chosenDisplay = randomChosenDisplay; 
  console.log(chosenDisplay);

if(chosenDisplayArray.indexOf(chosenDisplay)) {
    chosenDisplayArray.push(chosenDisplay);
  } else {
    console.log("This item already exists");
  }
  //console.log(chosenDisplay);
    
  let setDisplay = document.getElementById('tileTable');
    setDisplay.style.background = `${chosenDisplay}`;
  
    
    }
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
  msg.innerText = "Please Enter Your Guess....";

   addUserInput();
  
  startBtn.addEventListener('click', startGenerator);

  generatorStarted = true;
  
}


function addUserInput() {

  document.getElementById("userAnswer").innerHTML = `<input type="text" id='userInputArea'></input><button id="userBtn">submit guess</button>`;
  userBtn.addEventListener('click', checkAnswer);
  }


function checkAnswer() {
  
  userAnswer = document.getElementById('userInputArea').value.trim().toLowerCase();

  if(userAnswer === answer) {
    console.log('winner');
    messageArea.innerHTML = 'Congratulations!';
    console.log(userAnswer);
    stopGenerator();
    
    console.log(`game level: ${gameLevel}`);
   
  messageArea.innerHTML += `Level ${gameLevel} Completed!`;
    startBtn.removeEventListener('click', startGenerator);
stopBtn.removeEventListener('click', stopGenerator);
    
    gameLevel++;

    if(gameLevel > 3) {
      
      startBtn.remove();
      stopBtn.remove();

document.getElementById('userAnswer').innerHTML = "";

      messageArea.innerHTML = "game completed!" + `<br>` + `<h1>You are an Aviation Master!!!!</h1>`;
      
      return;
      
    }
    
  messageArea.innerHTML += "Level Cleared";
    
    document.getElementById('userAnswer').innerHTML = `Level: ${gameLevel}<br><button id='nextLevelBtn'>Next Level</button>`;
let nextLevelBtn = document.getElementById('nextLevelBtn');   
    nextLevelBtn.addEventListener('click', nextLevel); 
  
  } else if  (userAnswer != answer && attempts >= 1) {
    console.log('not quite!');
    messageArea.innerHTML = 'Sorry, thats not right! Try again...';
    attempts--;
    console.log(attempts);
    if(attempts != 1) {
    messageArea.innerHTML += `You have ${attempts} attempts remaining.`;
    } else {
       messageArea.innerHTML += `You have ${attempts} attempt remaining.`;
    }
    
    generatorStarted = true;

    if (userAnswer != answer && attempts <= 0) {
       messageArea.innerHTML = 'Game Over!';

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
  startBtn.addEventListener('click', startGenerator);
  
generatorStarted = true;
  
  document.getElementById('messageArea').innerHTML = "Press start to play";
  stopBtn.addEventListener('click', stopGenerator);

  if(startBtn) {
    document.getElementById('userAnswer').innerHTML = "";
  }
  
  if(gameLevel === 2) {
    setBackgroundImage();
    answer = "bird";  
    
  } else if (gameLevel === 3) {
    setBackgroundImage();
    answer = "plane";
  }

}
