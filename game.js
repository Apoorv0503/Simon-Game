// array of colors
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array to record the patterns from prev rounds
var gamePattern = [];

//empty array to keep the record the pattern given by our users.
var userClickedPattern = [];

// to keep a check wheather this is the first key press from keyborad
var started = false;

// for levels
var level = 0;

//starting the game
$(document).keypress(function() {
  //restart the game onlyif this is the first time.
  if (!started) {
    //at starting of game h1 change to level 1.
    $("#level-title").text("Level " + level);
    //after that starting random color sound must be given.
    nextSequence();
    started = true;
  }

});


//-----checking which of the buttons is clicked when user had clicked any of the buttons--------
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  //'this' will give the recently clicked button.
  //$(this)--> recently clicked button is now selected.
  //and 'id' is also an attribute of html element, so attr will fatch the id of
  // recently clicked button.
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); //code refactor kr diya..nai to baar baar audio play ka code likhte hm.
  //now only 1 function is doing this work..we just need to call that.
  animatePress(userChosenColour); //animation add hoga ab selected button me.

  checkAnswer(userClickedPattern.length - 1); //hr click pr check hoga...ie 1st click-->check, than 2nd click-->check!

});


//function that will give next sound for next level.
function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++; //increase the level by 1 every time nextSequence() is called.

  $("#level-title").text("Level " + level); // update the h1 with this change in the value of level.
  // var our_number = math.random() * 4;
  // var randomNumber = math.floor(our_number);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //--------we will play the audio of that color which is ramdomly generated -------
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // var audio = new Audio("sounds\" + randomChosenColour + ".mp3 ");
  //   audio.play();

  playSound(randomChosenColour);
}


//function that will play sound when we call it.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//function to give animation to a button when it get clicked.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  // to give the animation effect for 100 ms
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//for checking the answer ie. mathc users input with generated pattern by code.
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    
    //if last elemnt + length of both and user generated patterns(ie. Arrays) matches= proceed to next level.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    var over = "wrong";
    playSound(over);   //to play gameover sound

    $("body").addClass("game-over");    //to add gameover effect from premade css class

    setTimeout(function() {
      $("body").removeClass("game-over");  //remove the above effcet after 200 milliseconds
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");  //change main headinng accordingly
    startOver();
  }

  //function to restart the game after game over
  function startOver() {

    //set everything to initial values
    level = 0;
    gamePattern = [];
    started = false;
  }
}
