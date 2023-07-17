
let generatorStarted = true;
let answer = "spitfire";
let attempts = 2;


let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGenerator);

let stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', stopGenerator);

function startGenerator() {

  if
    (generatorStarted === true && attempts > 0) {
    tileGenerator();
  } else {
      generatorStarted = false;
    console.log('generator stopped');
    reveal();
    askForGuess();
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
  hlTile.classList.add('revealed');
  hlTile.classList.remove('inPlay');
  stopBtn.addEventListener('click', stopGenerator);
}


function askForGuess() {

  let msg = document.getElementById('messageArea');
  msg.innerText = "Please enter your guess....";
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
   document.getElementById('userAnswer'). innerHTML = "";
    startBtn.removeEventListener('click', startGenerator);
stopBtn.removeEventListener('click', stopGenerator);
    return;
    
  } else if  (userAnswer != answer && attempts >= 1) {
    console.log('not quite!');
    messageArea.innerHTML = 'Sorry, thats not right! Try again...';
    attempts--;
    console.log(attempts);
    messageArea.innerHTML += `You have ${attempts} attempts remaining.`;
    
    generatorStarted = true;

    if (userAnswer != answer && attempts <= 0) {
       messageArea.innerHTML = 'Game Over!';

startBtn.removeEventListener('click', startGenerator);
      return;
    }
  }
}


    

