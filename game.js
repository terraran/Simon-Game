var gamePattern = [];
var buttonColor = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gameStart = false;


$(document).keypress(function(){
    if (gameStart === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
        }
    }
);


var level = 0;


function nextSequence(){
    
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColor[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    if (gamePattern.length === userClickedPattern.length){
        checkAnswer();
        userClickedPattern = [];
    }

});

function playSound(name){
    var sfx = new Audio("sounds/" + name + ".mp3");
    sfx.play();
};

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }

function checkAnswer(){
    var currentLevel = gamePattern.length;
    if (gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]){
        setTimeout(() => {
            nextSequence()
        }, 1000);
    }
    else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        var wrongSFX = new Audio("./sounds/wrong.mp3");
        wrongSFX.play();
        restartGame()
    }
}

function restartGame(){
    gameStart = false;
    level = 0;
    userClickedPattern = []
    gamePattern = [];
}

    


