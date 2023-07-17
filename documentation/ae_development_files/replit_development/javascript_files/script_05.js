let gameLevel = 1;
let generatorStarted = true;

let attempts = 2;

let chosenDisplay = [];
let chosenDisplayValue = "";
let chosenDisplayName = "";
let answer = "";

let highlightedTilesList = [];

let colors = [
   // {pinkDisplay:  'url(images/spitfire.jpg'},
   {Sea_harrier:  'pink'},
   {yellowDisplay:  'yellow'},
   {purpleDisplay:  'purple'}

];

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
   
  chosenDisplay = colors[Math.floor(Math.random() * colors.length)];
 
  
  for (let colBg in chosenDisplay){
  chosenDisplayValue = chosenDisplay[colBg];
  console.log("this is " + chosenDisplay[colBg]);
  }

  chosenDisplayName = Object.keys(chosenDisplay)[0];
  console.log("this is the " + chosenDisplayName);
 
  answer = chosenDisplayName.replace(/_/g, ' ').toLowerCase();
  
 
  //console.log("this is the answer " + answer);
  
  let setDisplay = document.getElementById('tileTable');
    setDisplay.style.background = `${chosenDisplayValue}`;
  
  //console.log("this is the chosenDisplay " + chosenDisplay);
  
  chosenDisplay = colors.indexOf(chosenDisplay);
  
  if (chosenDisplay > -1) { 
    colors.splice(chosenDisplay, 1);
  }
  
    console.log(colors); 
  
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

  // function regExUserAnswer(userAnswer) {
  //   // return userAnswer = /[\w\s]+/.test(userAnswer);
  //    //return userAnswer = /[a-zA-Z0-9\s]+/.test(userAnswer);
  //    return userAnswer = /^[a-zA-Z0-9]+$/.test(userAnswer);
  // }
  
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
   // answer = "bird";  
    //answer = chosenDisplayName;
    
  } else if (gameLevel === 3) {
    setBackgroundImage();
    //answer = "plane";
  }

}
