// Generate a random number
// Give the user ability to guess
// If they guess and they are wrong, ask to guess again
// If they win - say it

const guessGame = () => {
  let randomNumber = Math.floor(Math.random() * 11);
  let guess;

  do {
    guess = prompt("Guess the number from 0 to 10");
    if (randomNumber > guess) {
      console.log(randomNumber);
      console.log(guess);
      console.log("Your number is too low.");
    } else if (randomNumber < guess) {
      console.log(randomNumber);
      console.log(guess);
      console.log("Your number is too high.");
    }
  } while (guess != randomNumber);

  console.log(guess);
  console.log("You won!");
  console.log(" ");
};
guessGame();
