const readline = require('readline-sync');
const calcMess = require('./calculator_messages.json');

let lang = 'en';

function prompt(message, message2) {
  message = calcMess[lang][message];
  if (message2) {
    console.log(`=> ${message} ${message2}`);
  } else {
    console.log(`=> ${message}`);
  }
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

let keepGoing = true;

prompt('welcome');

while (keepGoing) {
  prompt('getNum1');
  let number1 = readline.question();
  while (invalidNumber(number1)) {
    prompt('invalidNum');
    number1 = readline.question();
  }

  prompt('getNum2');
  let number2 = readline.question();
  while (invalidNumber(number2)) {
    prompt('invalidNum');
    number2 = readline.question();
  }

  prompt('getOper');
  let operation = readline.question();
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('invalidTryAg');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt('result', output);

  prompt('repeatCalc');
  let calc = readline.question();
  while (invalidNumber(calc)) {
    prompt('invalidOpt');
    calc = readline.question();
  }

  if (calc === '2') {
    keepGoing = false;
  }
}