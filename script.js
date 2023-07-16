let playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', playGame);


/** The playGame function controls all game activities. */
function playGame() {
    // Remove existing homepage content
    playBtn.remove();
    welcome.remove();
    createGameArea();


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
    </div>
    `
    }
}