var scores, roundScore, activePlayer, dice, gamePlaying;
init();

//For roll dice
document.querySelector('.btn--roll').addEventListener('click', function () {
    if (gamePlaying) {
        //Get randon number
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'src/dice-' + dice + '.png';

        // Update the round score if dice is NOT 1
        /*if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }*/
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        lastDice = dice;
    }
});

//For Hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
        var winningScore
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
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
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
