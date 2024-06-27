const tiles = document.querySelectorAll(".tile");
const startButton = document.getElementById("start-button");
const toggleCorrect = document.getElementById('correct');
const toggleIncorrect = document.getElementById('incorrect');
let gameOver = false; //isnt used at yet... theres no reason t use it
let sequence = [];
let index = 0; //used to keep track of where in the pattern/sequence user is at
let wrongTile = '';
let correctTile ='';
let gameSpeed = 2000;
let score = 0;

startButton.addEventListener('click', start);//once clicked disabled until the gameover

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

function play(){

        if (wrongTile){
            wrongTile.classList.remove('wrong-tile');
            toggleIncorrect.classList.remove('show-incorrect');
        }
        if(correctTile){
            correctTile.classList.remove('correct-tile');
        }

        tiles.forEach(tile => {
           tile.classList.add('no-hover');
        });
        ;
        removeTileClickListeners();// Remove any existing listener
        displayTile();
}

function displayTile() {
    //alert('called display');
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            tiles[sequence[i]].classList.add("active");
            setTimeout(() => {
                tiles[sequence[i]].classList.remove("active");
            }, 1000); 
        },i* gameSpeed); // Each tile activates beased on gamespeed
    }

    // After displaying the sequence, wait for the user's input
    setTimeout(addTileClickListeners, sequence.length * gameSpeed);
}

function addTileClickListeners() {
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
            toggleCorrect.classList.add('show-correct')

            if(gameSpeed >400){//increases speed with each level
               gameSpeed -= 200; 
            }

            setTimeout(()=>{
                toggleCorrect.classList.remove('show-correct')
            }, 1500)
            setTimeout(play, 800);
        }
    } else { // Wrong tile clicked
        tile.classList.add('wrong-tile');//adds red glow
        toggleIncorrect.classList.add('show-incorrect');
        wrongTile = tile;// stores tile so that tile can be reset when game starts, since it's blinking red when gameOver
        correctTile = document.getElementById('tile-'+ sequence[index]); // connectates 'tile-' to the current tile that is wrong in the sequence 
        correctTile.classList.add('correct-tile'); //adds green glow
        startButton.disabled = false; // Re-enable the start button
        removeTileClickListeners();
    }
}


function removeTileClickListeners() {
    tiles.forEach(tile => {
        tile.removeEventListener('click',handleTileClick);
    });
}


