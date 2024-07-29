let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let started = false;

let userClickedPattern = [];
$(document).on("keypress", function()  {
    if (!started) {
        $("h1").text("Level " + level);
        started = true;
        userClickedPattern = [];
        newSequence();
    }
})
$(".btn").click( function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateClick(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

function animateClick(userChosenColor) {
    $("#" + userChosenColor).fadeIn(500).fadeOut(500).fadeIn(500);
}

function newSequence() {
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosencolor = buttonColors[randomNumber];
    gamePattern.push(randomChosencolor);
    $("#" + randomChosencolor).fadeIn(500).fadeOut(500).fadeIn(500);
    playSound(randomChosencolor);
    
}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function checkAnswer(currentLevel) {
    if ( gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function(){
                newSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Press Any Key to Start");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000)
        startOver();
    }
}






















function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }