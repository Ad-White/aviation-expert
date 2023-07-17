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

        let stopBtn = document.getElementById('stopBtn');
        stopBtn.addEventListener('click', stopGenerator);
    } 

    let tiles = document.querySelectorAll(".tile");

    let randomTile = tiles[Math.floor(Math.random() * tiles.length)]; 
    addHl(randomTile);
      
    console.log(randomTile);
    
}

function addHl(tile) {
    tile.classList.add("highlight");
    const waitAbit = setTimeout(myTimer, 500);
    function myTimer() {
        tile.classList.remove("highlight");
        clearTimeout(waitAbit);
        tile.nextElementSibling;
        tileGenerator();
    }
}

function stopGenerator() {
    generatorStarted === false; 
}