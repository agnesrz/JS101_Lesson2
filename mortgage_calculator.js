/*
input:
  -loan amount
  -APR
    -as percentage (5%)
  -loan duration
output:
  -monthly payment
rules:
  -should loan duration be in months? years?
  -use this formula: let m = p * (j / (1 - Math.pow((1 + j), (-n))));
    -m = monthly payment
    -p = loan amount
    -j = monthly interest rate
    -n = loan duration in months
    -don't use the above letters; use names instead (e.g., 'loanAmount')
      -will need to calculate the monthly interest rate
      -will need to calculate the loan duration in months
    -print the payment amount as a dollar and cents amount,
     e.g., $123.45 or $371.00
    -validate input?
model: Get the loan amount, APR, and loan duration in months and years.
        Convert the APR to a monthly interest rate. Convert the loan duration
        to months. Use the formula to calculate the monthly payment, and print
        the result to the console.
examples:
  -$0, 5%, 3 years => $0.00
  -$1, 5%, 3 years => $0.02
  -$15,726, 0%, 30 years => $43.68
  -$12,192, 1%, 10 years => $106.81
  -$5,111, 3%, 0 years => error
  -$5,111, 3%, 0 years, 0 months => error
  -$5,111, 3%, 1 years, 0 mo => $432.87
  -$405,123, 1.54%, 25 years, 3 mo => $1,614.65
  -$405,123, 1.54%, 0 years, 24 mo => $17,152.24
  -$2,500,000, .01, 4 mo => $625,013
  -$5.00, 5%, 5 years => $0.09
  -$$5, 5%, 5 years => $0.09
  -$5, 5%%, 5 years => $0.09
  -$5, 5, 5 years => $0.09
  -$ , 5%, 5 years => error
  -$5, %, 5 years => error
  -$5, 5%, years => error\
  -$5, 5%, years,  months => error
  -$5, 5%, .5 years => error
  -$5, 5%, 0 years, .5 months => error

  algorithm:
    -Get the loan amount and set to variable loanAmount
      -use readline-sync
      -preface entry with dollar sign
      -validate input
    -Get the annual percentage rate (APR) and set to variable annualInterestRate
      -use readline-sync
      -ask for percentage in this format: for 5%, enter '5'
      -validate input
    -Convert annualInterestRate to monthly interest rate then to decimal
      -monthlyInterestRate = annualInterestRate / 12
      -monthlyInterestRate = monthlyInterestRate / 100
    -Get the loan duration
      -use readline-sync
      -get loan duration in years and months; first years, then months
        -loanDurationYears
        -loanDurationMonths
        -loanDurationMonths = loanDurationMonths + (loanDurationYears * 12)
        -validate iput
        -if loan duration in years && months === 0
          -return error
            -"You must enter a duration for the loan. Please try again."
            -loop back to get loan duration
    -Calculate monthly payment
      -monthlyPayment = loanAmount * (monthlyInterestRate /
        (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));
    -Print monthly payment to the console
      -use .toFixed(2)
*/

const readline = require('readline-sync');

let loanAmount;
let annualInterestRate;
let monthlyInterestRate;
let loanDurationYears;
let loanDurationMonths;
let monthlyPayment;
let notNumber = /[^0-9.]/;
let notNumber2 = /[^0-9]/;

function invalid() {
  console.log('Invalid entry. Please try again.');
}

function getLoanAmount() {
  loanAmount = readline.question('Enter the loan amount (in USD):\n$');

  while (loanAmount.includes(',')) {
    loanAmount = loanAmount.replace(',', '');
  }

  if (notNumber.test(loanAmount)) {
    invalid();
    getLoanAmount();
  }

  loanAmount = parseFloat(loanAmount);

  if (isNaN(loanAmount)) {
    invalid();
    getLoanAmount();
  }
}

function getInterestRate() {
  annualInterestRate = readline.question('Enter the annual percentage rate (APR) (e.g., for 5%, enter \'5\'):\n');

  while (annualInterestRate.includes(',')) {
    annualInterestRate = annualInterestRate.replace(',', '');
  }

  if (notNumber.test(annualInterestRate)) {
    invalid();
    getInterestRate();
  }

  annualInterestRate = parseFloat(annualInterestRate);

  if (isNaN(annualInterestRate)) {
    invalid();
    getInterestRate();
  }

  monthlyInterestRate = (annualInterestRate / 12) / 100;
}

function getLoanDurationYears() {
  loanDurationYears = (readline.question('Years: '));

  while (loanDurationYears.includes(',')) {
    loanDurationYears = loanDurationYears.replace(',', '');
  }

  if (notNumber2.test(loanDurationYears)) {
    invalid();
    getLoanDurationYears();
  }

  loanDurationYears = parseFloat(loanDurationYears);
}

function getLoanDurationMonths() {
  loanDurationMonths = readline.question('Months: ');

  while (loanDurationMonths.includes(',')) {
    loanDurationMonths = loanDurationMonths.replace(',', '');
  }

  if (notNumber2.test(loanDurationMonths)) {
    invalid();
    getLoanDurationMonths();
  }

  loanDurationMonths = parseFloat(loanDurationMonths);
}

function getTotalLoanDuration() {
  if (!loanDurationMonths && !loanDurationYears) {
    console.log('You must enter the loan duration.');
    getLoanDurationYears();
    getLoanDurationMonths();
    getTotalLoanDuration();
  } else if ((isNaN(loanDurationMonths)) || (loanDurationMonths === 0)) {
    loanDurationMonths = loanDurationYears * 12;
  } else if (loanDurationMonths && loanDurationYears) {
    loanDurationMonths += (loanDurationYears * 12);
  }
}

function getMonthlyPayment() {
  if (!monthlyInterestRate) {
    monthlyPayment = loanAmount / loanDurationMonths;
  } else {
    monthlyPayment = loanAmount * (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));
  }

  monthlyPayment = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(monthlyPayment);
}

function again() {
  console.log('Would you like to perform another calculation? Type \'Y\' for \'Yes\' and \'N\' for \'No\'.');

  let answer = readline.prompt().toUpperCase();

  if (answer === 'Y') {
    calculator();
  } else if (answer === 'N') {
    return;
  } else {
    invalid();
    again();
  }
}

function calculator() {
  getLoanAmount();

  getInterestRate();

  console.log('Enter the loan duration in years and/or months:');

  getLoanDurationYears();

  getLoanDurationMonths();

  getTotalLoanDuration();

  getMonthlyPayment();

  console.log(`Your monthly payment is ${monthlyPayment}.`);

  again();
}

console.log('Welcome to Mortgage Calculator \n * * * * * * * * * * * * * *\n');

calculator();