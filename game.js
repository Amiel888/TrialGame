var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



$(".btn").on("click", function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
 
});

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
 var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColor = buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);
playSound(randomChosenColor);
 $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(name){
    var pS = new Audio("./sounds/" + name + ".mp3");
    pS.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function (){
            nextSequence();
        }, 1000);
    }
 } else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
 }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}