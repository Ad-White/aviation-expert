let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);


function playGame() {

  playBtn.remove();

  createGameArea();

  let gameLevel = 1;
  let generatorStarted = true;

  let attempts = 7;

  let currentGameImage = [];

  let answer = "";

  let photographer = "";

  let highlightedTilesList = [];

  let gameImageSelection = [
    { gameImageName: 'a-10 thunderbolt', gameImage: 'url(images/a-10-thunderbolt_12019.jpg)', photographer: '12019' },
    { gameImageName: 'apache', gameImage: 'url(images/apache-longbow_mrminibike.jpg)', photographer: 'mrminibike' },
    { gameImageName: 'avro vulcan', gameImage: 'url(images/avro-vulcan_neico.jpg)', photographer: 'neico' },
    { gameImageName: 'black hawk', gameImage: 'url(images/black-hawk_AngieJohnston.jpg)', photographer: 'AngieJohnston' },
    { gameImageName: 'blackbird', gameImage: 'url(images/blackbird_wikiImages.jpg)', photographer: 'wikiImages' },
    { gameImageName: 'chinook', gameImage: 'url(images/chinook_sjr4x4.jpg)' },
    { gameImageName: 'f-15', gameImage: 'url(images/f-15_Defence-Imagery.jpg)', photographer: 'Defence-Imagery' },
    { gameImageName: 'f-18', gameImage: 'url(images/f-18-hornet_Military_Material.jpg)', photographer: 'Military_Material' },
    { gameImageName: 'f-22 raptor', gameImage: 'url(images/f22-raptor_陆龙.jpg)', photographer: '陆龙' },
    { gameImageName: 'lancaster', gameImage: 'url(images/lancaster_JonPauling.jpg)', photographer: 'JonPauling' },
    { gameImageName: 'english electric lightning', gameImage: 'url(images/not_sure_english-electric-lightning_Up-Free.jpg)', photographer: 'Up-Free' },
    { gameImageName: 'osprey', gameImage: 'url(images/osprey_sjr4x4.jpg)', photographer: 'sjr4x4' },
    { gameImageName: 'sea harrier', gameImage: 'url(images/sea_harrier_12019.jpg)', photographer: '12019' },
    { gameImageName: 'spitfire', gameImage: 'url(images/spitfire_JonPauling.jpg)', photographer: 'JonPauling' },
    { gameImageName: 'tornado', gameImage: 'url(images/tornado_StevePortugal.jpg)', photographer: 'StevePortugal' }
  ];

  setBackgroundImage();

  updateCurrentLevel();
  updateAttempts();


  let startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', startGenerator);

  let stopBtn = document.getElementById('stopBtn');
  stopBtn.addEventListener('click', stopGenerator);

  let quitBtn = document.getElementById('quitBtn');
  quitBtn.addEventListener('click', quitGame);

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

    photographer = currentGameImage.photographer;
    
    let setDisplay = document.getElementById('tileTable');
    setDisplay.style.background = `${currentGameImage.gameImage}`;
    setDisplay.style.backgroundPosition = 'center';
    setDisplay.style.backgroundSize = 'cover';
    setDisplay.style.backgroundRepeat = 'no-repeat';

    displayPhotographer();
    
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
    addHighLight(randomTile);
    selectedTile = randomTile;

    console.log(randomTile);
  }


  function addHighLight(tile) {
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
    selectedTile.classList.add('selectorLight')
    console.log(selectedTile);
    stopBtn.removeEventListener('click', stopGenerator);

    generatorStarted = false;

  }


  function reveal() {

    highlightedTilesList.push(selectedTile);
    console.log(highlightedTilesList);

    selectedTile.classList.add('revealed');
    selectedTile.classList.remove('inPlay');
    stopBtn.addEventListener('click', stopGenerator);

  }


  function askForGuess() {

    let msg = document.getElementById('messageArea');
    msg.innerHTML = `<p>Please Enter Your Guess<br>Or Skip...</p>`;

    addUserInput();

  }


  function addUserInput() {

    document.getElementById("userAnswer").innerHTML = `<input type="text" style="font-size: 20px;" id='userInputArea' placeholder="Enter Guess Here..."></input><br><button id="userBtn" class="button">Guess / Skip</button>`;
    userBtn.addEventListener('click', checkAnswer);
  }


  function removeUserInput() {

    document.getElementById('userAnswer').innerHTML = "";
  }

  function checkAnswer() {

    userAnswer = document.getElementById('userInputArea').value.trim().toLowerCase();
    userAnswer = userAnswer.replace(/-|\s/g, ""); // removes hyphens and white space 
    console.log("my regExp userAnswer " + userAnswer);

    answer = answer.replace(/-|\s/g, "");
    console.log("my regExp answer " + answer);


    if (userAnswer === answer) {
      console.log('winner');
      messageArea.innerHTML = `<p>Congratulations!</p>`;

 finalReveal();
      displayPhotographer();
      
      console.log(userAnswer);
      stopGenerator();

      console.log(`game level: ${gameLevel}`);

      messageArea.innerHTML += `<p>Level ${gameLevel} Completed!</p>`;
 startBtn.removeEventListener('click', startGenerator);
      stopBtn.removeEventListener('click', stopGenerator);

      gameLevel++;

      if (gameLevel > 3) {

        startBtn.remove();
        stopBtn.remove();      
        
        document.getElementById('userAnswer').innerHTML = "";

        messageArea.innerHTML = `<p>Game Completed!</p>` + `<br>` + `<h1>You Are An Aviation Expert!!!!</h1>`;

        return;
      }

      document.getElementById('userAnswer').innerHTML = `<button id='nextLevelBtn' class="button">Next Level</button></p>`;
      let nextLevelBtn = document.getElementById('nextLevelBtn');
      nextLevelBtn.addEventListener('click', nextLevel);

    } else if (userAnswer != answer && attempts >= 1) {
      console.log('not quite!');
      removeUserInput();
      messageArea.innerHTML = `<p>Better Luck Next Time!<br>Press Start To Try Again...</p>`;
      attempts--;
      console.log(attempts);
      if (attempts != 1) {
        messageArea.innerHTML += `<p>You Have ${attempts} Attempts Remaining.</p>`;
      } else {
        messageArea.innerHTML += `<p>You Have ${attempts} Attempt Remaining.</p>`;
      }

      startBtn.addEventListener('click', startGenerator);
      stopBtn.addEventListener('click', stopGenerator);

      updateAttempts();

      generatorStarted = true;

      if (userAnswer != answer && attempts <= 0) {
        messageArea.innerHTML = `<p>Game Over!</p>`;

        startBtn.removeEventListener('click', startGenerator);
        return;
      }
    }
  }

  function nextLevel() {

    updateAttempts();
    updateCurrentLevel();

    for (let i = 0; i < highlightedTilesList.length; i++) {
      highlightedTilesList[i].classList.remove("revealed");
      highlightedTilesList[i].classList.remove("selectorLight");
      highlightedTilesList[i].classList.add('inPlay');
    }

    startBtn.addEventListener('click', startGenerator);

    generatorStarted = true;

    document.getElementById('messageArea').innerHTML = `<p>Press Start To Play</p>`;
    stopBtn.addEventListener('click', stopGenerator);

    if (startBtn) {
      document.getElementById('userAnswer').innerHTML = "";
    }
    if (gameLevel === 2) {
      setBackgroundImage();
      attempts = 6;
      updateAttempts();
    } else if (gameLevel === 3) {
      setBackgroundImage();
      attempts = 5;
      updateAttempts();
    }
  }


  function updateCurrentLevel() {

    currentLevel.innerHTML = `<h4>Current Level: ` + `${gameLevel}</h4>`;

  }

  function updateAttempts() {
    attemptsRemaining.innerHTML = `<h4>Attempts Remaining: ` + `${attempts}</h4>`;
  }


  function finalReveal() {
    
   let remainingTiles = document.querySelectorAll(".tile" && ".inPlay");
   for (let t=0; t < remainingTiles.length; t++) {
   remainingTiles[t].classList.remove('inPlay');
remainingTiles[t].classList.add('revealed');

     highlightedTilesList.push(remainingTiles[t]);
  }
  
}


function displayPhotographer() {

  let chosenImagePhotographer = photographer;
  console.log("this is the chosenImagePhotographer " + chosenImagePhotographer);
  
  document.getElementById('photographer').innerHTML = `<h6>Photo Credit : ` + 
  chosenImagePhotographer + `</h6>`;
    
}
  
  
function quitGame() {
    
  let quitArea = document.getElementById('quit');
  quitArea.innerHTML = 

  `<button class="button" id="contBtn">Continue</button>
  <button class="button" id="exitBtn">Exit</button>`;

  let continueBtn = document.getElementById('contBtn');
  continueBtn.addEventListener('click', continueGame);  
  
  let exitBtn = document.getElementById('exitBtn');
  exitBtn.addEventListener('click', exitGame);
    
}

  
function exitGame() {

  window.location.href =  href='https://stopme-now12.chalkalino.repl.co';
  return;
}

    
function continueGame() {
  document.getElementById('quit').innerHTML = 
  `<button id="quitBtn" class="button">Quit</button>`;
  document.getElementById('quitBtn').addEventListener('click', quitGame);
 
}


  function createGameArea() {

    let createGameArea = document.getElementById('game-area');
    createGameArea.innerHTML +=
      `<table id="tileTable">
    <tr>
      <td id="1" class="tile inPlay">?</td>
      <td id="2" class="tile inPlay">?</td>
      <td id="3" class="tile inPlay">?</td>
    </tr>
    <tr>
      <td id="4" class="tile inPlay">?</td>
      <td id="5" class="tile inPlay">?</td>
      <td id="6" class="tile inPlay">?</td>
    </tr>
    <tr>
      <td id="7" class="tile inPlay">?</td>
      <td id="8" class="tile inPlay">?</td>
      <td id="9" class="tile inPlay">?</td>
    </tr>
     <tr>
      <td id="10" class="tile inPlay">?</td>
      <td id="11" class="tile inPlay">?</td>
      <td id="12" class="tile inPlay">?</td>
    </tr>
  </table>
  <div id="messageArea"></div>
  <div id="userAnswer"></div>
  
  <div id="buttons">
     
 
  
  <button id="startBtn" class="button">Start</button>
  <button id="stopBtn" class="button">Stop</button>

    </div>
        
   <div id="currentLevel">
      current level
   </div>
   <div id="attemptsRemaining">
      attempts remaining
   </div>

   <div id="quit">

<button id="quitBtn" class="button">Quit</button>
  
    </div>
    `
  }
}