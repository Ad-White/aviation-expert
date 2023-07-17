
let generatorStarted = true;

let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGenerator);

let stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', stopGenerator);

function startGenerator() {

    if
    (generatorStarted === true) {
    tileGenerator();
    } else {
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
    const waitAbit = setTimeout(removeHighlight, 500);

    function removeHighlight() {
        tile.classList.remove("highlight");
        clearTimeout(waitAbit);
    
        tile.nextElementSibling;

        console.log("tile id:" + tile.id);

        if(stopBtn === true) {
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
    
    startBtn.addEventListener('click', startGenerator);
    
    generatorStarted = true;
}