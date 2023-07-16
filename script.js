let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);


/** The playGame function controls all game activities. */
function playGame() {
    // Remove existing homepage content
    playBtn.remove();
    welcome.remove();
    createGameArea();
    
    let gameLevel = 1;
    let generatorStarted = true;

    let attempts = 7;

    let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGenerator);

    let stopBtn = document.getElementById('stopBtn');
    stopBtn.addEventListener('click', stopGenerator);

    let quitBtn = document.getElementById('quitBtn');
    quitBtn.addEventListener('click', quitGame);

    messageArea.innerHTML = `<p>Press Start To Begin Game</p>`;
    
    /** The startGenerator function checks conditions are true for variables,
     *  generatorStarted, attempts and gameLevel.
     *  If true, the generator starts by calling the tileGenerator function.
     *  If conditions are not met, the generatorStarted variable is set 
     *  to false and the generator is in a stopped state.
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
    

      /** The tileGenerator function returns all elements with classes of .tile and .inPlay as an HTML Collection.
       *  It chooses one of these elements at random. The randomTile is passed to the addHighLight function
       *  where it applies a highlight to the random tile. 
       *  The variable name is then changed to selectedTile, where it then gets used in the function, stopGenerator.
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