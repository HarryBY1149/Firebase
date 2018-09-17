$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyD2SBmtiek8DnvjoOdvr1n4NxwNOgZWi2A",
    authDomain: "rock-paper-scissors-mult-e74b4.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-mult-e74b4.firebaseio.com",
    projectId: "rock-paper-scissors-mult-e74b4",
    storageBucket: "rock-paper-scissors-mult-e74b4.appspot.com",
    messagingSenderId: "952980673702"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var connectionsRef = database.ref("/connections")
  var connectedRef = database.ref(".info/connected")
  var resultsRef = database.ref("/results")
  var wins1Ref = database.ref("/results/wins1")
  var wins2Ref = database.ref("/results/wins2")
  var guessRef1 = database.ref("/guesses/guess1/guess")
  var guessRef2 = database.ref("/guesses/guess2/guess")
  var playerGuess;
  var playerReady;
  var guess1;
  var guess2;
  var ready1;
  var ready2;
  var wins1Text;
  var wins2Text;
  var drawsText;
  var wins1;
  var wins2;
  var draws;
  var i;


  // an example from homework to check if user is online. How does it work?  No one knows. Firebase docs?  Not helpful. 
  connectedRef.on("value", function (snap) {
    if (snap.val() === true) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    };
  });

  //promise from firebase that sets player number base on order of connection, if player one refreshes you get stuck with 2 player 2's.
  connectionsRef.once("value").then(function (snap) {
    $("#player").text(snap.numChildren());
    i = parseInt(($("#player").text()));
    if (i === 1) {
      console.log(i);
      playerGuess = "guess1";
      playerReady = "ready1";
      $("#chat").append('<p class="card-text">Console: You are player 1, prepare for battle both verbal and foul!</p>');
      ;
    } else if (i === 2) {
      console.log(i);
      playerGuess = "guess2";
      playerReady = "ready2";
      $("#chat").append('<p class="card-text">Console: You are player 2, prepare to destroy your opponent with both words and things you found in your yard!</p>');
      i++;
    } else {
      console.log(i);
      $("#chat").append('<p class="card-text">Console: You are now an observer, prepare to talk trash!</p>');
    }
  });



  // var guessPromise= new Promise(function(resolve){
  // guessRef1.once("value").then(function (snap) {guess1 = snap.val()});
  // guessRef2.once("value").then(function (snap) {guess2 = snap.val()});
  // if(((guess1 === "r")||(guess1 === "p")||(guess1 === "s"))&&((guess2==="r")||(guess2==="p")||(guess2==="s")))
  // {
  //   resolve(true);
  // }});
  // guessPromise.then(function(result){
  //   console.log("hitting boolean")
  // if (result === true){
  //   gameLogic();}


  $(document).on("click", ".fluid-image", function (event) {
    var guess = $(this).attr("data-value");
    database.ref("guesses/" + playerGuess + "").update({
      guess: guess,
    });
    database.ref("ready/" + playerReady + "").update({
      ready: true,
    });
    database.ref("/ready/ready1/ready").once("value").then(function (snap) { ready1 = snap.val() });
    database.ref("/ready/ready2/ready").once("value").then(function (snap) { ready2 = snap.val() });
    setTimeout(function () {
      if ((ready1 === true) && (ready2 === true)) {
        guessRef1.once("value").then(function (snap) { guess1 = snap.val() });
        guessRef2.once("value").then(function (snap) { guess2 = snap.val() });
        setTimeout(function () {
          console.log("you called game logic!");
          console.log(guess1, guess2);
          if (guess1 == guess2) {
          database.ref("/results/draws").once("value").then(function(snap){draws =snap.val()});
          setTimeout(function(){draws++;
          resultsRef.update({draws:draws})}, 300);
          } else if ((guess1 == "r") && (guess2 == "s")) {
            wins1Ref.once("value").then(function(snap){wins1 =parseInt(snap.val())});
            setTimeout(function(){wins1++;
            resultsRef.update({wins1:wins1});},300)
          } else if ((guess1 == "s") && (guess2 == "p")) {
            wins1Ref.once("value").then(function(snap){wins1 =parseInt(snap.val())});
            setTimeout(function(){wins1++;
            resultsRef.update({wins1:wins1});},300)
          } else if ((guess1 == "p") && (guess2 == "r")) {
            wins1Ref.once("value").then(function(snap){wins1 =parseInt(snap.val())});
            setTimeout(function(){wins1++;
            resultsRef.update({wins1:wins1});},300)
          } else if ((guess1 == "r") && (guess2 == "p")) {
            wins2Ref.once("value").then(function(snap){wins2=parseInt(snap.val())});
            setTimeout(function(){wins2++;
            resultsRef.update({wins2:wins2});},300)
          } else if ((guess1 == "s") && (guess2 == "r")) {
            wins2Ref.once("value").then(function(snap){wins2=parseInt(snap.val())});
            setTimeout(function(){wins2++;
            resultsRef.update({wins2:wins2});},300)
          } else if ((guess1 == "p") && (guess2 == "s")) {
            wins2Ref.once("value").then(function(snap){wins2=parseInt(snap.val())});
            setTimeout(function(){wins2++;
            resultsRef.update({wins2:wins2});},300)
          } else {
            console.log("guesses not recognized");
          };
          database.ref("/ready/ready1/").update({ ready: false });
          database.ref("/ready/ready2/").update({ ready: false });
          setTimeout(function () {
            database.ref("/results/wins1").once("value").then(function (snap) { wins1Text = snap.val() });
            database.ref("/results/wins2").once("value").then(function (snap) { wins2Text = snap.val() });
            database.ref("/results/draws").once("value").then(function (snap) { drawsText = snap.val() });
            setTimeout(function () {
              $("#wins1").text("Player1 Wins: " + wins1Text);
              $("#wins2").text("Player2 Wins: " + wins2Text);
              $("#draws").text("Draws: " + drawsText);
              console.log(wins1, wins2, draws);
              console.log(wins1Text, wins2Text, drawsText)
          
            }, 500)
          }, 400)
        }, 450)
      }
    }, 400);

  });
})