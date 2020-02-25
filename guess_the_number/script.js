let randomNumber = Math.floor(Math.random()) + 1; /*Math.random generates a random decimal number 0 and 1.
Math.floor rounds up the number passed to it down the nearest whole number.

When generating a random number between 0 and 1 will always return 1, so this needs +1 to always return 1.
Then the number needs to be multiplied by 100 to generate a number between 0 and 100.
If the +1 is omitted, the number generated is only 0-99, hence addition of one is required.*/
  const guesses = document.querySelector('.guesses');
  const lastResult = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('lowOrHi'); //Missing class selector (.)
  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('.guessField');

  let guessCount = 1;
  let resetButton;

  function checkGuess() {

    let userGuess = Number(guessField.value);
    if(guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = ''; //TypeError, null is not an object
      setGameOver();
    } else if(guessCount === 10) {
      lastResult.textContent = '!!!GAME OVER!!!';
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }
  guessSubmit.addeventListener('click', checkGuess); //TypeError, This is not a function

  function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  resetButton = document.createElement('button');
	  resetButton.textContent = 'Start new game';
	  document.body.appendChild(resetButton);
	  resetButton.addeventListener('click', resetGame);
  }

  function resetGame() {
	  guessCount = 1;

	  const resetParas = document.querySelectorAll('.resultParas p');
	  for(let i = 0; i < resetParas.length; i++) {
		  resetParas[i].textContent = '';
	  }
	  resetButton.parentNode.removeChild(resetButton);

	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessField.value = '';
	  guessField.focus();

	  lastResult.style.backgroundColor = 'white';

	  randomNumber = Math.floor(Math.random()) + 1;
  }