let startBtn = document.getElementById('startBtn');
let generatorStarted = false;

if(generatorStarted === false) {
    startBtn.addEventListener('click', startGame);
} 

function startGame() {
   
    tileGenerator();
    
   
}


function tileGenerator() {
    
    generatorStarted = true;

    if (generatorStarted === true) {
        startBtn.removeEventListener('click', startGame);
        startBtn.remove();

        let stopBtn = document.getElementById('stopBtn');
        stopBtn.addEventListener('click', selectTile);

        let tiles = document.querySelectorAll(".tile");

        let randomTile = tiles[Math.floor(Math.random() * tiles.length)]; 
        addHl(randomTile);
        hlTile = randomTile;
        
        console.log(randomTile);

    } 
}


function addHl(tile) {
    tile.classList.add("highlight");
    const waitAbit = setTimeout(removeHighlight, 500);
    function removeHighlight() {
        tile.classList.remove("highlight");
        clearTimeout(waitAbit);
        try { 
        tile.nextElementSibling;
      
          tileGenerator(); 
        }
        catch(err) {
          console.log("Game stopped");
          console.log("tile id:" + tile.id);
          playerQuestion();
        }
    }
    
}


function selectTile() {
   hlTile.classList.add('ll');
 
   let selectedTile = hlTile;
   console.log(selectedTile);
   tileGenerator = false;

   stopBtn.removeEventListener('click', selectTile);
   
   
}

function playerQuestion(msg) {
    
    let msg = document.getElementById('messageArea');
    msg.innerHTML = 
    `
    <p>Hello player! Please enter your guess.....</p>
    `
    ;
    
}