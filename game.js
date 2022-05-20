
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false; //might need to make a local variabel to the function if this global level doesn't work

function nextSequence (){
  userClickedPattern = []; //setting userclicked pattern array to an empty array once the sequence is triggered, to be ready for next level
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  var randomButton = $("#" + randomChosenColour + ".btn");
  playSound(randomChosenColour);

}

$(".btn").on("click", function(){
  //console.log(this.id);
  var userChosenColour = this.id;
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log("What in the pattern array? ", userClickedPattern);
  playSound(userChosenColour);
  //console.log("Retrieving last added color index: ",userClickedPattern.indexOf(userChosenColour));
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.indexOf(userChosenColour));

})


//creating playSound function that should work for nextSequence and onclick event
function playSound(name){
  $("#" + name).fadeOut(500).fadeIn(500);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
      $("." + currentColour).removeClass("pressed");
    },100);
}

$(document).on("keypress", function(){

  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  else{
    console.log("The game has already started!");
  }

})



function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    //check to see if user has selected every button in their sequence (array)
    console.log("Current level index: ", currentLevel);
    console.log("Length of user clicked pattern array before reset: ", userClickedPattern.length );
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      //userClickedPattern = [];
    }
  }
  else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();

  }
  //resetting user clicked pattern array
  // console.log("User clicked pattern: ", userClickedPattern);
  // console.log("Game pattern: ", gamePattern);
  // //userClickedPattern = [];
  // console.log("User Clicked Pattern Array should be empty: ", userClickedPattern);

}


function startOver(){
  level = 0;
  started = false;
  gamePattern = []; 
}
