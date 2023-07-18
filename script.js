// This button starts the game
let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);


/** The playGame function controls all game activities. */
function playGame() {
  // Remove existing homepage content
  playBtn.remove();

  let welcome = document.getElementById('welcome');
  welcome.remove();

  createGameArea();

  // Game variables.
  let generatorStarted = true;
  let gameLevel = 1;
  let attempts = 7;
  let currentGameImage = [];
  let answer = "";
  let photographer = "";
  let selectedTile = "";
  let messageArea = document.getElementById('messageArea');

  // An array to store any highlighted tiles
  let highlightedTilesList = [];
  
  const gameImageSelection = [
    { gameImageName: 'a-10 thunderbolt', gameImage: 'url(assets/images/a-10-thunderbolt_12019.jpg)', photographer: '12019' },
    { gameImageName: 'apache', gameImage: 'url(assets/images/apache-longbow_mrminibike.jpg)', photographer: 'mrminibike' },
    { gameImageName: 'avro vulcan', gameImage: 'url(assets/images/avro-vulcan_neico.jpg)', photographer: 'neico' },
    { gameImageName: 'black hawk', gameImage: 'url(assets/images/black-hawk_AngieJohnston.jpg)', photographer: 'AngieJohnston' },
    { gameImageName: 'blackbird', gameImage: 'url(assets/images/blackbird_wikiImages.jpg)', photographer: 'wikiImages' },
    { gameImageName: 'chinook', gameImage: 'url(assets/images/chinook_sjr4x4.jpg)' },
    { gameImageName: 'f-15', gameImage: 'url(assets/images/f-15_Defence-Imagery.jpg)', photographer: 'Defence-Imagery' },
    { gameImageName: 'f-18', gameImage: 'url(assets/images/f-18-hornet_Military_Material.jpg)', photographer: 'Military_Material' },
    { gameImageName: 'f-22 raptor', gameImage: 'url(assets/images/f22-raptor_陆龙.jpg)', photographer: '陆龙' },
    { gameImageName: 'lancaster', gameImage: 'url(assets/images/lancaster_JonPauling.jpg)', photographer: 'JonPauling' },
    { gameImageName: 'english electric lightning', gameImage: 'url(assets/images/not_sure_english-electric-lightning_Up-Free.jpg)', photographer: 'Up-Free' },
    { gameImageName: 'osprey', gameImage: 'url(assets/images/osprey_sjr4x4.jpg)', photographer: 'sjr4x4' },
    { gameImageName: 'sea harrier', gameImage: 'url(assets/images/sea_harrier_12019.jpg)', photographer: '12019' },
    { gameImageName: 'spitfire', gameImage: 'url(assets/images/spitfire_JonPauling.jpg)', photographer: 'JonPauling' },
    { gameImageName: 'tornado', gameImage: 'url(assets/images/tornado_StevePortugal.jpg)', photographer: 'StevePortugal' }
  ];

  setBackgroundImage();
  updateCurrentLevel();
  updateAttempts();

  // Game control buttons
  let startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', startGenerator);

  let stopBtn = document.getElementById('stopBtn');
  
  let quitBtn = document.getElementById('quitBtn');
  quitBtn.addEventListener('click', quitGame);

  // Set message to prompt player to start a game.
  messageArea.innerHTML = `<p>Press Start To Begin Game</p>`;
  
  /** The startGenerator function checks conditions are true for variables,
   *  generatorStarted, attempts and gameLevel.
   *  If true, the generator starts by calling the tileGenerator function.
   *  If conditions are not met, the generatorStarted variable is set 
   *  to false and the generator is in a stopped state.
   *  It then calls to functions reveal, then askForGuess.
   */
  function startGenerator() {
    if (generatorStarted === true && attempts > 0 && gameLevel <= 3) {
      messageArea.innerHTML = `<p>Press Stop To Select Your Tile</p>`;
      stopBtn.addEventListener('click', stopGenerator);
      tileGenerator();
    } else {
      generatorStarted = false;
      reveal();
      askForGuess();
    }
  }
  
  
  /** The setBackgroundImage function randomly selects an object from the gameImageSelection array.
   *  This object now becomes the currentGameImage.
   *  The answer variable is set by retrieving the gameImageName from the currentGameImage object.
   *  The photographer variable is set to the value retrieved from the currentGameImage photographer key.
   *  The function then takes the currentGameImage gameImage and sets it as the tileTable background.
   *  This background image is styled with a position of 'center', a backgroundSize set to 'cover',
   *  and a 'no-repeat' background.
   *  A call is made to the displayPhotographer function in order to deal with those details.
   *  The last thing this function performs is to take the currentGameImage and remove it from the 
   *  gameImageSelection array. The array reduces with each game completed, stopping the image/answer
   *  from being selected again throughout the rest of the game.
   */
  function setBackgroundImage() {
    currentGameImage = gameImageSelection[Math.floor(Math.random() * gameImageSelection.length)];
    answer = currentGameImage.gameImageName;
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
  }


  /** The tileGenerator function returns all elements with classes of
   *  .tile and .inPlay as an HTML Collection.
   *  It chooses one of these elements at random.
   *  The randomTile is passed to the addHighLight function where it applies
   *  a highlight to the random tile. 
   *  The variable name is then changed to selectedTile, where it then gets 
   *  used in the function, stopGenerator.
   */
  function tileGenerator() {
    // eventListener is removed to prevent multiple starting of the generator
    startBtn.removeEventListener('click', startGenerator);

    let tiles = document.querySelectorAll(".tile" && ".inPlay");

    let randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    addHighLight(randomTile);
    selectedTile = randomTile;
  }


  /** The addHighLight function takes in the randomly selected tile from the tileGenerator.
   *  It sets a class of .highlight to the object.
   *  Then adds a setTimeOut of 300 ms before the function removeHighLight, removes the
   *  class applied.
   *  If the stop button has been pressed, the stopGenerator function is called.
   *  If the stop button hasn not been pressed, the startGenerator fucntion is called.
   */
  function addHighLight(tile) {
    tile.classList.add("highlight");

    const waitAbit = setTimeout(removeHighlight, 300);
    function removeHighlight() {
      tile.classList.remove("highlight");
      clearTimeout(waitAbit);

      if (stopBtn === true) {
        stopGenerator();
      } else {
        startGenerator();
      }
    }
  }

  
  /** The stopGenerator function takes the selectedTile
   *  and adds a class of .selectorLight.
   *  It then removes the event listener from the stop button.
   *  It stops the generator by setting generatorStarted to false.
   */
  function stopGenerator() {
    selectedTile.classList.add('selectorLight');
    stopBtn.removeEventListener('click', stopGenerator);
    generatorStarted = false;
  }   

  
  /** The reveal function first pushes the selectedTile into the
   *  highlightedTilesList array. 
   *  It applies a class of .revealed to remove its visibility then
   *  removes the existing class of .inplay.
   */
  function reveal() {
    highlightedTilesList.push(selectedTile);
    selectedTile.classList.add('revealed');
    selectedTile.classList.remove('inPlay');
    stopBtn.addEventListener('click', stopGenerator);
  }

  
  /** This function removes the event listener from the stop button.
   *  It then displays a message to the player.
   *  Then makes a call to the addUserInput function.
   */
  function askForGuess() {
    stopBtn.removeEventListener('click', stopGenerator);
    let msg = document.getElementById('messageArea');
    msg.innerHTML = `<p>Please Enter Your Guess<br>Or Skip...</p>`;

    addUserInput();
  }
  

  /** This function adds a text input to the userAnswer element.
   *  It also adds a submit / skip button with event listener.
  */
  function addUserInput() {
    document.getElementById("userAnswer").innerHTML = `<input type="text" style="font-size: 20px;" id='userInputArea' placeholder="Enter Guess Here..."></input>
    <br><button id="userBtn" class="button">Guess / Skip</button>`;
    let userBtn = document.getElementById('userBtn');
    userBtn.addEventListener('click', checkAnswer);
  }

  
  /** This function removes any content from the userAnswer element. */
  function removeUserInput() {
    document.getElementById('userAnswer').innerHTML = "";
  }

  
  /** The checkAnswer function checks the answer given by the player
   *  and compares it to the accepted answer.
   *  The function congratulates the player if the answer is correct, game level is incremented
   *  and calls the finalReveal function.
   *  If the game has not exceeded level three. A next level button appears, so as to continue.
   *  If the player has completed all three levels, the player is congratulated again,
   *  and the game has been completed.
   *  If the answer was incorrect and the remaining attempts are above 0.
   *  The player is invited to select another tile and try again.
   *  If the players attempts reach 0, the game is over.
  */
  function checkAnswer() {
    // removes leading and/or trailing white speace, then sets to lower case
    let userAnswer = document.getElementById('userInputArea');
    userAnswer = document.getElementById('userInputArea').value.trim().toLowerCase();
    userAnswer = userAnswer.replace(/-|\s/g, ""); // removes hyphens and white space 
    
    // removes leading and/or trailing white speace, then sets to lower case
    answer = answer.trim().toLowerCase();
    answer = answer.replace(/-|\s/g, ""); // removes hyphens and white space 

    // If player was correct
    if (userAnswer === answer) {
      messageArea.innerHTML = `<p>Congratulations!</p>`;
      finalReveal();
      stopGenerator();

      messageArea.innerHTML += `<p>Level ${gameLevel} Completed!</p>`;
      startBtn.removeEventListener('click', startGenerator);
      stopBtn.removeEventListener('click', stopGenerator);

      gameLevel++;
      // If player game level exceeds the games total levels
      if (gameLevel > 3) {

        startBtn.remove();
        stopBtn.remove();      
        
        document.getElementById('userAnswer').innerHTML = "";

        messageArea.innerHTML = `<p>Game Completed!</p>` + `<br>` + `<h1>You Are An Aviation Expert!!!!</h1>`;

        return;
      }
      // Display next level button if player was correct
      document.getElementById('userAnswer').innerHTML = `<button id='nextLevelBtn' class="button">Next Level</button></p>`;
      let nextLevelBtn = document.getElementById('nextLevelBtn');
      nextLevelBtn.addEventListener('click', nextLevel);
      // If player was incorrect and has more than one remaining attempt
    } else if (userAnswer != answer && attempts >= 1) {
      removeUserInput();
      messageArea.innerHTML = `<p>Better Luck Next Time!<br>Press Start To Try Again...</p>`;
      attempts--;

      if (attempts != 1) {
        messageArea.innerHTML += `<p>You Have ${attempts} Attempts Remaining.</p>`;
      } else {
        messageArea.innerHTML += `<p>You Have ${attempts} Attempt Remaining.</p>`;
      }

      startBtn.addEventListener('click', startGenerator);
      updateAttempts();
      generatorStarted = true;

      // If player was incorrect and has no remaining attempts
      if (userAnswer != answer && attempts <= 0) {
        messageArea.innerHTML = `<h2>Game Over!</h2>
        <br>
        <p>Press Quit Then Exit<br>To Try Again</p>`;
        startBtn.remove();
        stopBtn.remove();   
        return;
      }
    }
  }
  

  /** The nextLevel function first updates attempts and current level.
   *  It removes classes .revealed and .selectorLight, then applies
   *  the .inPlay class to each object in the highLightedTilesList.
   *  This 'resets' any of the tiles revealed within the last game.
   *  If the player chooses to play the next level, the function clears
   *  the userAnswer area. It then selects the next game level depending on the 
   *  existing new current level.
   */
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
      stopBtn.removeEventListener('click', stopGenerator);
      setBackgroundImage();
      attempts = 6;
      updateAttempts();
    } else if (gameLevel === 3) {
      stopBtn.removeEventListener('click', stopGenerator);
      setBackgroundImage();
      attempts = 5;
      updateAttempts();
    }
  }

  
  /** This function displays the players current game level*/
  function updateCurrentLevel() {
    let currentLevel = document.getElementById('currentLevel');
    currentLevel.innerHTML = `<h4>Current Level: ` + `${gameLevel}</h4>`;
  }


  /** This function displays the players remaining attempts*/
  function updateAttempts() {
    let attemptsRemaining = document.getElementById('attemptsRemaining');
    attemptsRemaining.innerHTML = `<h4>Attempts Remaining: ` + `${attempts}</h4>`;
  }


  /** This function selects any tiles not revealed within the game.
   *  For those tiles with classes .tile and .inPlay, it removes the .inPlay
   *  class, then applies the class .revealed.
   *  Causing the background image to become fully visible.
   *  The function then pushes each tile into the highlightedTilesList
   *  array of objects.
   *  This causes them to become 'reset' if another game begins.
   */
  function finalReveal() {
    
    let remainingTiles = document.querySelectorAll(".tile" && ".inPlay");
    for (let t=0; t < remainingTiles.length; t++) {
      remainingTiles[t].classList.remove('inPlay');
      remainingTiles[t].classList.add('revealed');

      highlightedTilesList.push(remainingTiles[t]);
    }
  }
  

  /** This function displays the name of the photographer associated with the currentGameImage.
   *  It adds this info. to the footer of the page and includes a link to the website, Pixabay.
  */
  function displayPhotographer() {
  document.getElementById('photographer').innerHTML = `<h6>Photo by ` + photographer + ` via <a href="https://pixabay.com/" target=_"blank">Pixabay</a></h6>`;
  }
  

  /** The quitGame function adds two buttons, continue game and exit game,
   *  in place of the original quit button.
   *  Each button is set an event listener.
   */
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


  /** The exitGame function reloads the current window
   *  and links back to this sites home page */  
  function exitGame() {
    window.location.href = 'https://ad-white.github.io/aviation-expert/';
    return;
  }


  /** The continueGame function replaces the two buttons, continue and exit.
   *  It adds the original quit button with event listener in their place.
   */
  function continueGame() {
    document.getElementById('quit').innerHTML = 
    `<button id="quitBtn" class="button">Quit</button>`;
    document.getElementById('quitBtn').addEventListener('click', quitGame);
  }


  /** This function creates the gameboard table.
   *  It also adds the message area, user answer area.
   *  Plus player button controls, current level and attempts 
   *  remaining info as html and attaches itself to the element with id 'game-area'.
   */
  function createGameArea() {

    let createGameArea = document.getElementById('game-area');
    createGameArea.innerHTML += `
    <table id="tileTable">
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
    </div>`;
  }
}