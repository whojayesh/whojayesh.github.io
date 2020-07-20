/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0, 0];
var roundScore = 0;
var activePlayer = 0;


document.querySelector('.dice').style.display = 'none';




document.querySelector('.btn-roll').addEventListener('click', function() {

       // 1. GENERATE A RANDOM NUMBER
       var random = Math.floor( Math.random() * 6 ) + 1;

       //2. DISPLAY THE RESULTS
       var dice = document.querySelector('.dice');
       dice.style.display = 'block';
       dice.src = `dice-${random}.png`;

       //3. UPDATE THE ROUND SCORE, IF ROLLED NO IS NOT 1.
       if(random !== 1)
       {
              roundScore = roundScore + random;
              document.getElementById(`current-${activePlayer}`).textContent = roundScore;
       }
       else
       {
              // 1. UPDATE THE SCORES ARRAY.
              scores[activePlayer] = scores[activePlayer] + roundScore;
              
              // 2. DISPLAY SCORES INTO THE DOM.
              document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

              // 3. INITIALIZE THE ROUNDSCORE BACK TO = 0.
              roundScore = 0;

              // 4. DISPLAY THE ROUNDSCORE INTO THE DOM
              document.getElementById(`current-${activePlayer}`).textContent = 0;

              // CHANGE IN CSS
              document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
              //toggle = add the class, then remove, then add, then remove.
              

              // 5. CHANGE THE PLAYER
              activePlayer = 1 - activePlayer;

              // 6. SWITCH THE RED DOT TO THE ACTIVE PLAYER.

              document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");

              document.querySelector('.dice').style.display = 'none';
       }

});


document.querySelector('.btn-hold').addEventListener('click', function() {

        // 1. UPDATE THE SCORES ARRAY.
        scores[activePlayer] = scores[activePlayer] + roundScore;
              
        // 2. DISPLAY SCORES INTO THE DOM.
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // 3. INITIALIZE THE ROUNDSCORE BACK TO = 0.
        roundScore = 0;

        // 4. DISPLAY THE ROUNDSCORE INTO THE DOM
        document.getElementById(`current-${activePlayer}`).textContent = 0;

        // CHANGE IN CSS
        document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
        //toggle = add the class, then remove, then add, then remove.



       // 5. CHANGE THE PLAYER
       activePlayer = 1 - activePlayer;

       // 6. SWITCH THE RED DOT TO THE ACTIVE PLAYER
       document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
              
       document.querySelector('.dice').style.display = 'none';
       console.log('hi');

       

});


document.querySelector('.btn-new').addEventListener('click', function(){

       document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
       document.getElementById(`score-${activePlayer}`).textContent = 0;
       document.getElementById(`current-${activePlayer}`).textContent = 0;
       
       scores = [0,0];
       roundScore = 0;
       activePlayer = 0;

       document.querySelector(`.player-${activePlayer}-panel`).classList.toggle("active");
       document.getElementById(`score-${activePlayer}`).textContent = 0;
       document.getElementById(`current-${activePlayer}`).textContent = 0;



       document.querySelector('.dice').style.display = 'none';




});



