const tiles = document.querySelectorAll(".tile");
const startButton = document.getElementById("start-button");
const toggleCorrect = document.getElementById('correct');
const toggleIncorrect = document.getElementById('incorrect');
const gameScore = document.getElementById('score');
let gameOver = false;
let sequence = [];
let index = 0; //used to keep track of where in the pattern/sequence user is at
let wrongTile = '';
let correctTile ='';
let gameSpeed;
let score = 0;

startButton.addEventListener('click', start);//once clicked disabled until the gameover

function start(){
    score = 0;
    index = 0;
    sequence = [1,1];
    gameOver = false;
    startButton.disabled = true;
    gameScore.textContent = score;//updates score on screen
    gameSpeed = 2000;

    addNewTileToSequence(); 
    play();
}
function addNewTileToSequence() {
    sequence.push(Math.floor(Math.random() * 9)); // Use 9 for a 3x3 grid (0-8)
}

function play(){
        //these reset the color of the displayed 'wrong tile' and 'corrent tile' on game start.
        if (wrongTile){
            wrongTile.classList.remove('wrong-tile');
        }
        if(correctTile){
            correctTile.classList.remove('correct-tile');
        }

        tiles.forEach(tile => {
           tile.classList.add('no-hover');
        });

        removeTileClickListeners();
        displayTile();
}

function displayTile() {
    let displayPeriod = 1000; //how long a tile is displayed

    //calculates how long a tile should be displayed for based on the speed of the game
    if(gameSpeed < displayPeriod){
        displayPeriod = gameSpeed - 100; //there's a 100ms before the next tile shows
    }

    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            tiles[sequence[i]].classList.add("active");
            setTimeout(() => {
                tiles[sequence[i]].classList.remove("active");
            }, displayPeriod); 
        },i* gameSpeed); // Each tile activates beased on gamespeed
    }

    // After displaying the sequence, wait for the user's input
    setTimeout(addTileClickListeners, sequence.length * gameSpeed);
}

function addTileClickListeners() {
    tiles.forEach(tile => {
        tile.addEventListener('click', handleTileClick); //alows u to click
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

            if(gameSpeed >200){//increases speed with each level
                //the transition speed messes with the game eg, tranSITION 0.3s gamespeed 0.1 (tile could be shown 3 times and you wouldnt know because the transition
                tiles.forEach(tile => {
                    if(gameSpeed <= 1400){
                        tile.style.transition = '';
                    }
                    else{
                    tile.style.transition = 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;';
                    }
                });

               gameSpeed -= 200; //game gets faster after each level
            }
            gameScore.textContent = score;//updates score on screen 
            setTimeout(play, 800);
        }
    } else { // Wrong tile clicked
        tile.classList.add('wrong-tile');//adds red glow
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