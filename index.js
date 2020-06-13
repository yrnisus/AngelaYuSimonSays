var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var gameRunning = false;
var level = 0;

// Event Listeners

$("#start").click( function ()
{
    startGame();
});

$(document).on("keydown", function(event) { 
    //checks if a key is pressed
        startGame();

    });

$(".btn").click( function () {
    var userChosenColor =$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    //selects itself and addes the pressed class
    $(this).toggleClass("pressed");
    setTimeout(() => { $(this).toggleClass("pressed") }, 100);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(level) {
    if(gamePattern[level] === userClickedPattern[level])
        {
            if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
            }
        }
    else
    {

        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").toggleClass("game-over");
    $("#level-title").text("Game over. Press A to start over.");
    gameRunning = false;
    setTimeout(function() {
        $("body").toggleClass("game-over");
    }, 200);
    startOver();

}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * buttonColors.length);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateButton(randomChosenColor);


}   

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animateButton(color) {
    $("." + color).fadeTo( "fast" , 0.1);
    $("." + color).fadeTo( "fast" , 1.0);
   playSound(color);
}

function startOver() {
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    level = 0;
}

function startGame() {
    nextSequence();
    gameRunning = true;
}