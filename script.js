let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);


/** The playGame function controls all game activities. */
function playGame() {
  // Remove existing homepage content
  playBtn.remove();
  welcome.remove();
  createGameArea();

  // Game variables.
  let generatorStarted = true;
  let gameLevel = 1;
  let attempts = 7;

  // An array to store any highlighted tiles
  let highlightedTilesList = [];
  
  let gameImageSelection = [
      { gameImageName: 'sea harrier', gameImage: 'url(assets/images/sea_harrier_12019.jpg)', photographer: '12019' }
  ];

  setBackgroundImage();

  // Game control buttons
  let startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', startGenerator);

  let stopBtn = document.getElementById('stopBtn');
  stopBtn.addEventListener('click', stopGenerator);

  let quitBtn = document.getElementById('quitBtn');
  quitBtn.addEventListener('click', quitGame);

  // Set message to prompt player to start a game.
  messageArea.innerHTML = `<p>Press Start To Begin Game</p>`;


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
      console.log("current game image now " + currentGameImage.gameImage);
  
      console.log("this is the chosenImageName " + currentGameImage.gameImageName);
  
      answer = currentGameImage.gameImageName;
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
  


  /** This function displays the name of the photographer associated with the currentGameImage.
   *  It adds this info. to the footer of the page and includes a link to the website, Pixabay.
  */
  function displayPhotographer() {

      console.log("this is the photographer of the gameImage " + photographer);
      
      document.getElementById('photographer').innerHTML = `<h6>Photo by ` + photographer + ` via <a href="https://pixabay.com/" target=_"blank">Pixabay</a></h6>`;
        
  }
  
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
  
        tileGenerator();
  
      } else {
        generatorStarted = false;
  
        console.log('generator stopped');
        reveal();
        askForGuess();
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

      console.log(randomTile);
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

      console.log("tile id:" + tile.id);

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
    selectedTile.classList.add('selectorLight')
    console.log(selectedTile);
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
    console.log(highlightedTilesList);

    selectedTile.classList.add('revealed');
    selectedTile.classList.remove('inPlay');

  }

  
  /** This function displays a message to the player.
   *  It then makes a call to the addUserInput function.
   */
  function askForGuess() {

    let msg = document.getElementById('messageArea');
    msg.innerHTML = `<p>Please Enter Your Guess<br>Or Skip...</p>`;

    addUserInput();
  
  }
  

  /** This function adds a text input to the userAnswer element.
   *  It also adds a submit / skip button with event listener.
  */
  function addUserInput() {

    document.getElementById("userAnswer").innerHTML = `<input type="text" style="font-size: 20px;" id='userInputArea' placeholder="Enter Guess Here..."></input><br><button id="userBtn" class="button">Guess / Skip</button>`;
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
    userAnswer = document.getElementById('userInputArea').value.trim().toLowerCase();
    userAnswer = userAnswer.replace(/-|\s/g, ""); // removes hyphens and white space 
    console.log("my regExp userAnswer " + userAnswer);
    
    // removes leading and/or trailing white speace, then sets to lower case
    answer = answer.trim().toLowerCase();
    answer = answer.replace(/-|\s/g, ""); // removes hyphens and white space 
    console.log("my regExp answer " + answer);

    // If player was correct
    if (userAnswer === answer) {
      console.log('winner');
      messageArea.innerHTML = `<p>Congratulations!</p>`;

      finalReveal();
      
      console.log(userAnswer);
      stopGenerator();

      console.log(`game level: ${gameLevel}`);

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
      // If player was incorrect and has no remaining attempts
      if (userAnswer != answer && attempts <= 0) {
        messageArea.innerHTML = `<p>Game Over!</p>`;

        startBtn.removeEventListener('click', startGenerator);
        return;
      }
    }
  }
  

  /** This function displays the players remaining attempts*/
  function updateAttempts() {
    attemptsRemaining.innerHTML = `<h4>Attempts Remaining: ` + `${attempts}</h4>`;
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
    </div>`
  }
}