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
        { gameImageName: 'sea harrier', gameImage: 'url(images/sea_harrier_12019.jpg)', photographer: '12019' }
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