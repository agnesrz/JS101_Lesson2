const readline = require('readline-sync');
const ROUNDS = 5;
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
const VALID_ENTRIES = VALID_CHOICES.map(item => item[0].toLowerCase());

const SCORE = {
  player: 0,
  computer: 0
};

const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  Spock:    ['rock',     'scissors'],
};

function displayWelcomeInfo() {
  prompt("Welcome to 'Rock, Paper, Scissors, Lizard, Spock!");
  prompt("*************************************************");
  prompt('');
  prompt(`The first player to win ${ROUNDS} games wins!`);
  prompt('Press any key to continue');
  prompt('');
  readline.question();
  console.clear();
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayInstructions() {
  prompt(`(Enter '${VALID_ENTRIES[0]}' for '${VALID_CHOICES[0]}', '${VALID_ENTRIES[1]}' for '${VALID_CHOICES[1]}, 'etc.)`);
}

function getUserChoice() {
  let entry = readline.question();

  while (invalidChoice(entry)) {
    prompt("That's not a valid choice");
    entry = readline.question();
  }

  if (entry === 's') {
    prompt("Enter '1' for 'scissors' and '2' for 'Spock'");
    entry = readline.question();
    while (entry !== '1' && entry !== '2') {
      prompt("Enter '1' for 'scissors' and '2' for 'Spock'");
      entry = readline.question();
    }
  }

  return entryToChoice(entry);
}

function invalidChoice(choice) {
  return !VALID_ENTRIES.includes(choice.toLowerCase()) &&
         (choice !== '1') &&
         (choice !== '2');
}

function entryToChoice(entry) {
  if (entry === '1') {
    return 'scissors';
  } else if (entry === '2') {
    return 'Spock';
  } else {
    return VALID_CHOICES[VALID_ENTRIES.indexOf(entry.toLowerCase())];
  }
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  return VALID_CHOICES[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (WINNING_COMBOS[playerChoice].includes(computerChoice)) {
    return 'player';
  } else {
    return 'computer';
  }
}

function displayWinner(playerChoice, computerChoice, winner) {
  prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);

  switch (winner) {
    case 'tie':
      prompt("It's a tie!\n");
      break;
    case 'player':
      prompt('You win this round!\n');
      break;
    case 'computer':
      prompt('The computer wins this round!\n');
      break;
  }
}

function updateScore(winner) {
  if (winner === 'player') {
    SCORE.player += 1;
  } else if (winner === 'computer') {
    SCORE.computer += 1;
  }
}

function displayScore() {
  prompt('Current Score');
  prompt(`Player: ${SCORE['player']}`);
  prompt(`Computer: ${SCORE['computer']}\n`);
}

function displayGrandWinner() {
  if (SCORE.player === ROUNDS) {
    prompt('Congratulations! You are the Grand Winner!');
  } else {
    prompt('Sorry... The computer is the Grand Winner!');
  }
}

function playAgainAnswer() {
  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer !== 'n' &&
         answer !== 'y' &&
         answer !== 'no' &&
         answer !== 'yes') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  return answer[0] === 'y';
}

while (true) {
  SCORE.player = 0;
  SCORE.computer = 0;
  let welcomeInfo = true;
  let instructions = true;

  while ((SCORE.player < ROUNDS) && (SCORE.computer < ROUNDS)) {

    while (welcomeInfo) {
      displayWelcomeInfo();
      welcomeInfo = false;
    }

    prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);

    while (instructions) {
      displayInstructions();
      instructions = false;
    }

    let userChoice = getUserChoice();
    console.clear();

    let computerChoice = getComputerChoice();

    let winner = determineWinner(userChoice, computerChoice);
    displayWinner(userChoice, computerChoice, winner);

    updateScore(winner);
    displayScore();

    prompt("Press any key to continue to the next round");
    readline.question();
    console.clear();
  }

  displayGrandWinner();

  let playAgain = playAgainAnswer();

  if (!playAgain) break;
}