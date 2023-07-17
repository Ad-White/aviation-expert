function startGame()
{
    const tileOne = 'document.getElementById("1")';
    const tileTwo = 'document.getElementById("2")';
    const tileThree = 'document.getElementById("3")';
    const tiles = [];
    tiles.push(tileOne);
    tiles.push(tileTwo);
    tiles.push(tileThree);
    
    let selectedTile = selectATile(tiles);
    
    document.getElementById("2").classList.add("highlight");

    console.log(selectedTile);
    
    document.getElementById("messageArea").innerHTML = selectedTile;
    

    function selectATile(arr) {
        let randomItem = Math.floor(Math.random() * arr.length);  
        let randomTile = arr[randomItem];
        return randomTile;  
    }



}

let startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame);
