const READLINE = require('readline-sync');
const MESSAGE = require('./mortgage_calculator_messages.json');

let loanAmount;
let annualInterestRate;
let monthlyInterestRate;
let loanDurationYears;
let loanDurationMonths;
let monthlyPayment;
let answer;
let notNumber = /[^0-9.]/;

let prompt = (key) => {
  console.log('=> ' + MESSAGE[key]);
};

function invalid() {
  prompt('invalid');
}

function isInvalidAmount(value) {
  return notNumber.test(value) ||
  isNaN(parseFloat(value)) ||
  countPeriods(value) > 1;
}

function countPeriods(value) {
  let periods = 0;
  for (let count = 0; count < value.length; count += 1) {
    if (value[count] === '.') {
      periods += 1;
    }
  }
  return periods;
}

let retrieveInput = (inputType) => {
  prompt(inputType);
  let input = READLINE.question();
  while (isInvalidAmount(input) || ((inputType === 'loanDuration') && (parseFloat(input) === 0))) {
    invalid();
    input = READLINE.question();
  }
  return input;
};


function getMonthlyPayment() {
  monthlyInterestRate = (parseFloat(annualInterestRate) / 12) / 100;
  loanDurationMonths = parseFloat(loanDurationYears) * 12;

  if (!monthlyInterestRate) {
    monthlyPayment = parseFloat(loanAmount) / loanDurationMonths;
  } else {
    monthlyPayment = parseFloat(loanAmount) * (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));
  }

  monthlyPayment = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(monthlyPayment);
}

function printResult() {
  console.log(`=> Your monthly payment is ${monthlyPayment}.`);
}

function again() {
  prompt('another');

  answer = READLINE.prompt().toUpperCase();
}

prompt('welcome');

while (true) {

  loanAmount = retrieveInput('loanAmount');

  annualInterestRate = retrieveInput('interestRate');

  loanDurationYears = retrieveInput('loanDuration');

  getMonthlyPayment();

  printResult();

  again();

  while ((answer !== 'Y') && (answer !== 'N')) {
    invalid();
    again();
  }

  if (answer === 'N') {
    break;
  }
}