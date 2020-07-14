const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
const VALID_ENTRIES = VALID_CHOICES.map(item => item[0]);

function prompt(message) {
  console.log(`=> ${message}`);
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if ((playerChoice === 'rock' && (computerChoice === 'scissors' ||
                                          computerChoice === 'lizard')) ||
            (playerChoice === 'paper' && (computerChoice === 'rock' ||
                                          computerChoice === 'Spock')) ||
            (playerChoice === 'scissors' && (computerChoice === 'paper' ||
                                             computerChoice === 'lizard')) ||
            (playerChoice === 'lizard' && (computerChoice === 'paper' ||
                                           computerChoice === 'Spock')) ||
            (playerChoice === 'Spock' && (computerChoice === 'rock' ||
                                          computerChoice === 'scissors'))) {
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

function displayGrandWinner(playerWins, computerWins) {
  if (playerWins > computerWins) {
    prompt('Congratulations! You are the Grand Winner!');
  } else {
    prompt('Sorry... The computer is the Grand Winner!');
  }
}

while (true) {
  let playerWins = 0;
  let computerWins = 0;
  let displayInstructions = true;

  prompt("Welcome to 'Rock, Paper, Scissors, Lizard, Spock!");
  prompt("*************************************************\n");
  prompt("The first player to win 5 games wins!\n");

  while ((playerWins < 5) && (computerWins < 5)) {
    prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);

    while (displayInstructions) {
      prompt(`(Enter '${VALID_ENTRIES[0]}' for '${VALID_CHOICES[0]}', '${VALID_ENTRIES[VALID_ENTRIES.length - 1]}' for '${VALID_CHOICES[VALID_CHOICES.length - 1]}, 'etc.)`);
      displayInstructions = false;
    }

    let choice = VALID_CHOICES[VALID_ENTRIES.indexOf(readline.question())];

    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice");
      choice = VALID_CHOICES[VALID_ENTRIES.indexOf(readline.question())];
    }

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    let winner = determineWinner(choice, computerChoice);
    displayWinner(choice, computerChoice, winner);
    if (winner === 'player') {
      playerWins += 1;
    } else if (winner === 'computer') {
      computerWins += 1;
    }
  }

  displayGrandWinner(playerWins, computerWins);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}