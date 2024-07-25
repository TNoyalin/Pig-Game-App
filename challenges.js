var scores, roundScore, activePlayer, dice, gamePlaying, lastDice;
init();

//For roll dice
document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
        //Get randon number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'src/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'src/dice-' + dice2 + '.png';

        // Update the round score if dice is NOT 1
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

//For Hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'WINNER';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

//Fot new game
document.querySelector('.btn--new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.final-score').value = '';

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';

    document.querySelector('#name--0').textContent = 'PLAYER 1';
    document.querySelector('#name--1').textContent = 'PLAYER 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');
}
