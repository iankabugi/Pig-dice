/*business logic*/

var player1="";
var player2="";

var rollDice = function () {
  return Math.floor(6*Math.random())+1;
}

function Player(turn) {
  this.roll = 0;
  this.tempscoreOne = 0;
  this.totalscoreOne = 0;
  this.turn = turn;
  this.playerName;
}
Player.prototype.rollone = function() {
  if (this.roll === 1) {
  this.tempscoreOne = 0;
  alert("Sorry " + this.playerName + ", you rolled a 1! Your turn is over!")
  }
  else {
  this.tempscoreOne += this.roll;
  }
}
Player.prototype.hold = function () {
  this.totalscoreOne += this.tempscoreOne;
  this.tempscoreOne = 0;

}

Player.prototype.winnerCheck = function () {
  if (this.totalscoreOne >= 100) {
    alert("Congratulations," + this.playerName + " You WON!");
  }
}

Player.prototype.newGame = function () {
  this.roll = 0;
  this.tempscoreOne = 0;
  this.totalscoreOne = 0;
  this.playerName ="";
}

var clearValues = function(){
  $(".firstPlayer").val("");
  $(".secondPlayer").val("");
}

     /*User Interface*/
$(document).ready(function() {
  $(".console").hide();
  $("button#start").click(function(event){
    player1 = new Player(true);
    player2 =  new Player(false);
    $(".console").show();

    var firstPlayer = $(".firstPlayer").val();
    $("#firstPlayer").text(firstPlayer);

    var secondPlayer = $(".secondPlayer").val();
    $("#secondPlayer").text(secondPlayer);

    player1.playerName=firstPlayer;
    player2.playerName=secondPlayer;

  });
  $("button#new-game").click(function(event){
    $(".console").hide();
    clearValues();
    player1.newGame();
    player2.newGame();
    $("#diceTotal").empty();
    $("#scoreOne").empty();
    $("#rolldice1").empty();
    $("#diceTotal").empty();
    $("#scoreTwo").empty();
    $("#rollDice2").empty();

    $(".menu").show();
  });

  $("button#roll1").click(function(event){
    player1.roll = rollDice();
    $("#rolldice1").text(player1.roll);
    player1.rollone();
    $("#diceTotal").text(player1.tempscoreOne);
  });

  $("button#roll2").click(function(event){
    player2.roll = rollDice();
    $("#rollDice2").text(player2.roll);
    player2.rollone();
    $("#diceTotal").text(player2.tempscoreOne);
  });

  $("button#player1-hold").click(function(event){
    player1.hold();
    $("#scoreOne").text(player1.totalscoreOne);
    $("#diceTotal").empty();
    $("#rolldice1").empty();
    player1.winnerCheck();
  });

  $("button#hold1").click(function(event){
    player2.hold();
    $("#scoreTwo").text(player2.totalscoreOne);
    $("#diceTotal").empty();
    $("#rollDice2").empty();
    player2.winnerCheck();
  });
});
