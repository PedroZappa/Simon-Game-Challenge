
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  // Empty the clicked pattern array
  userClickedPattern = [];
  // Update level
  level++;
  $("#level-title").text("Level " + level);
  // Generate a random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound with the randomChosenColour value
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Right Answer
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Wrong Answer
    // Play wrong.mp3
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    // Apply .game-over class for 200 milisecs when answer is wrong
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change title
    $("h1").html("Game Over, Press Any Key to Restart");
    // Restart the game
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Event Listeners

$(".btn").click( function(event) {
  // to store the #id of the clicked button
  var userChosenColour = event.currentTarget.id;
  // store iy in the userClickedPattern array
  userClickedPattern.push(userChosenColour);
  // Play the sound with the userChosenColour value
  var lastClickIndex = userClickedPattern.length - 1;
  console.log(lastClickIndex);
  checkAnswer(lastClickIndex);
  animatePress(userChosenColour);
  playSound(userChosenColour);
});

// Keyboard press starts the game
$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Animations
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout( function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

// Sound FX
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
