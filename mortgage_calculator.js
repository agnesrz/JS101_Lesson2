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
}

function invalid() {
  prompt(invalid);
}

function isInvalidAmount(value) {
  return notNumber.test(value) ||
  isNaN(parseFloat(value)) ||
  countPeriods(value) > 1;
}

function countPeriods(value) {
  let periods = 0;
  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === '.') {
      periods += 1;
    }
  }
  return periods;
}

function getLoanAmount() {
  loanAmount = READLINE.question(MESSAGE.loanAmount);

  if (isInvalidAmount(loanAmount)) {
    invalid();
    getLoanAmount();
  }
}

function getInterestRate() {
  annualInterestRate = READLINE.question(MESSAGE.interestRate);

  if (isInvalidAmount(annualInterestRate)) {
    invalid();
    getInterestRate();
  }
}

function getLoanDuration() {
  loanDurationYears = (READLINE.question(MESSAGE.loanDuration));

  if (isInvalidAmount(loanDurationYears) ||
    (parseFloat(loanDurationYears) === '0')) {
    invalid();
    getLoanDuration();
  }
}

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
   console.log(`Your monthly payment is ${monthlyPayment}.`);
}

function again() {
  console.log(MESSAGE.another);

  answer = READLINE.prompt().toUpperCase();

  if ((answer !== 'Y') && (answer !== 'N')) {
    invalid();
    again();
  }
}

console.log(MESSAGES.welcome);

while (true) {
  getLoanAmount();

  getInterestRate();

  getLoanDuration();

  getMonthlyPayment();

  printResult();

  again();

  if (answer === 'N') {
    break;
  }
}