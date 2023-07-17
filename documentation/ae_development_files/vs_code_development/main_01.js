let startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', getListOfTiles);

const tilesArray = [];

/**
 * This function retrieves all elements with class name of "tile" and its "id" and returns it.
 * It also displays the list within the "messageArea".
 */
function getListOfTiles() {
    const tiles = document.getElementsByClassName("tile");
    let tileList = "";
    for (let i = 0; i < tiles.length; i++) {
        tileList += tiles[i].className + " " + tiles[i].id + "<br>";
    }
   document.getElementById("messageArea").innerHTML = tileList; 
    // return tileList;
}
   
function addHighlight() {
    
}