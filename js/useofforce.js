// To set up player1, player 2


  var game = {
  player1: {
    name: 'Player 1',
    score: 0
  },
  player2: {
    name: 'Player 1',
    score: 0
  },
  ellapsedTime: 0,
  currentPlayer: {}
};

// To make the game last only 10 seconds per player, then switch.
// if(game.ellapsedTime > 10){
//   switchTurn();
// }


// To end the game and compare scores to determine winner
// if(player1.score > player2.score){

// }


var message = $('#message');
//var score = 0;
var keyCode = 0;
var images = [
  {url: './images/0gun1.png', answer: 0},
  {url: './images/0gun2.png', answer: 0},
  {url: './images/0gun3.png', answer: 0},
  {url: './images/0gun4.png', answer: 0},
  {url: './images/0gun5.png', answer: 0},
  {url: './images/1angry1.png', answer: 1},
  {url: './images/1angry2.png', answer: 1},
  {url: './images/1angry3.png', answer: 1},
  {url: './images/1angry4.png', answer: 1},
  {url: './images/1angry5.png', answer: 1},
  {url: './images/2calm1.png', answer: 2},
  {url: './images/2calm2.png', answer: 2},
  {url: './images/2calm3.png', answer: 2},
  {url: './images/2calm4.png', answer: 2},
  {url: './images/2calm5.png', answer: 2},
];

function chooseRandomPic(){
  randomPic = Math.floor((Math.random()*images.length));
  $(".bullseye").attr('src', images[randomPic].url );
  message.text('');
}

// DRY Fix: created a function for the right and wrong answer display
function rightAnswer(){
  game.currentPlayer.score++;
  console.log("Right Answer!");
  message.text("Right Answer!");
  setTimeout(chooseRandomPic, 300);
}

function wrongAnswer(){
  console.log("Wrong Answer!");
  message.text('Wrong Answer!');
  setTimeout(chooseRandomPic, 300);
}

// STEP 1: Create random picture to begin
function startGame(player){
  console.log(player);
  //alert('Starting game as ', player.name);
  game.currentPlayer = player;
  //To capture the value of the names that were input
  chooseRandomPic();

  // To set the timer to count up each second of the game
  var seconds = 11;
  var timer = setInterval(function(){
    seconds--;
    console.log('seconds left: ', seconds);
    $('.timer').text('Seconds Left: '+seconds.toString());
    if (seconds === 0){
      clearInterval(timer);
      if (game.currentPlayer == game.player1 ){
          //player1 finished turn, switch to player2
          startGame(game.player2);
      } else {
        //player2 finished turn, compare score
        console.log('Player 1:', game.player1, 'Player 2:', game.player2);
        $('#player1-score').text(game.player1.name  + ' : ' + game.player1.score);
        $('#player2-score').text(game.player2.name  + ' : ' + game.player2.score);
        //remove event listners
      }
    }
  }, 1000)
}
// STEP 2: Event listener keydown when arrow keys are pressed
// Arrow Key Codes: left = 37 (answer = 0) to shoot
//                  down = 40 (answer = 1) to tase
//                  Right = 39 (answer = 2) to pass
function attachKeyDown(){
  document.addEventListener('keydown', function(event){
    console.log(event.keyCode);
    // STEP 3: If there's a match to correct answer, award 1 point, if not 0 points.
    // Then move on to next randomly selected image.  Iterate.
    switch (event.keyCode) {
      case 37 :
        if(images[randomPic].answer == 0) {
          game.currentPlayer.score++;
          $('.bullseye').attr('src', './images/bam.png');
          rightAnswer();
        }else{
          wrongAnswer();
        };
        break;

      case 40 :
        if(images[randomPic].answer == 1) {
          game.currentPlayer.score++;
          $('.bullseye').attr('src', './images/zap.png');
          rightAnswer();
        }else{
          wrongAnswer();
        };
        break;

      case 39 :
        if(images[randomPic].answer == 2) {
          game.currentPlayer.score++;
          $('.bullseye').attr('src', './images/thumbup.png');
          rightAnswer();
        }else{
          wrongAnswer();
        };
        break;

      default:
        alert("Choose The Arrow Keys: Left, Down or Right");
      break;
    }
  });
}

// Starts game with the press of the "Enter" key
$('.startGameBtn').on('click', function(){
  console.log("Clicked start game");
  if(!$('#player1-display').val() || !$('#player2-display').val()){
    message.text('Missing Player Name!');
  } else {
    attachKeyDown();
    game.player1.name = $('#player1-display').val();
    game.player2.name = $('#player2-display').val();
    startGame(game.player1);
  }
});
