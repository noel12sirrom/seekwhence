let gameOver = false;
let sequence = [];
let index = 0; //used to keep track of where in the pattern/sequence user is at
let wrongTile = '';
let gameSpeed = 2000;
let score = 0;
//let nextroundStartSpeed = sequence.length * 

const tiles = document.querySelectorAll(".tile");
const startButton = document.getElementById("start-button");

startButton.addEventListener('click', start);
//disable until the whole game is over then enable

function start(){
    score = 0
    index = 0;
    sequence = [];
    gameOver = false;
    startButton.disabled = true;
    gameSpeed = 2000;

    addNewTileToSequence(); 
    play();
}
function addNewTileToSequence() {
    sequence.push(Math.floor(Math.random() * 9)); // Use 9 for a 3x3 grid (0-8)
}

function displayTile() {
    //alert('called display');
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            tiles[sequence[i]].classList.add("active");
            setTimeout(() => {
                tiles[sequence[i]].classList.remove("active");
            }, 1000); 
        },i* gameSpeed); // Each tile activates 2 second apart
    }

    // After displaying the sequence, wait for the user's input
    setTimeout(getSequence, sequence.length * gameSpeed);
}

function getSequence() {
    tiles.forEach(tile => {
        tile.addEventListener('click', handleTileClick); // Add the event listener
        tile.classList.remove('no-hover');//LETS YOU KNOW U CAN START CLICKING
    });

    
}

function handleTileClick(event) {
    const tile = event.target;
    const tileIndex = parseInt(tile.id.replace('tile-', '')); // Get the tile index

    if (tileIndex === sequence[index]) { // Correct tile clicked
        index++;
        if (index === sequence.length) {// User has successfully followed the sequence
            index = 0;//index is at zero because the user is is going to redo pattern from start again
            score += 1;
            addNewTileToSequence();

            if(gameSpeed >800){//increases speed with each level
               gameSpeed -= 200; 
            }
            
            setTimeout(play, 800);
        }
    } else { // Wrong tile clicked
        tile.classList.add('wrong-tile');
        wrongTile = tile;
        gameOver = true;
        startButton.disabled = false; // Re-enable the start button
        removeTileClickListeners();
    }
}

function play(){
    if (!gameOver) {
        if (wrongTile){
            wrongTile.classList.remove('wrong-tile');
        }
        tiles.forEach(tile => {
           tile.classList.add('no-hover');
        });
        ;
        removeTileClickListeners();// Remove any existing listener
        displayTile();
    }
}

function removeTileClickListeners() {
    tiles.forEach(tile => {
        tile.removeEventListener('click',handleTileClick);
    });
}


