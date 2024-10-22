const fs = require("fs");

const inputFile = "./10000-common-passwords.csv";
const outputFile = "./statistics.csv";
const delimiter = ",";

function deleteExistingOutputFile() {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}

function processData() {
  const data = fs.readFileSync(inputFile, "utf-8");
  const lines = data.split(/\n/);

  let passwords = [];
  for (let line of lines) {
    let elements = line.split(delimiter);
    passwords.push(elements[1]) // Append to Passwords each password in the [index, password] line array
    console.log(elements);
  }
  console.log(passwords)
  writeToOutputFile(passwords, outputFile)
}

function writeToOutputFile(arrayOfPasswords, outputFilePath) {
  let counts = {};

  for (let password of arrayOfPasswords) {    // For each password in the array
    let length = password.length;             // length = password's length
    if (Object.keys(counts).includes(length.toString())) {  // If the password's length is a key in the dictionary,
      counts[length] += 1;                                  // Increase the password length count by 1
    } else {
      counts[length] = 1;                                   // Otherwise create a key named the password's length and set its value to 1
    }
  }

  fs.appendFileSync(outputFilePath, `Number Passwords: ${numberPasswords(arrayOfPasswords)}\n`)
  for (let length in counts) {  // Iterate over keys of the counts object
    fs.appendFileSync(outputFilePath, `Chars: ${length}, Count: ${counts[length]}\n`);
  }
  fs.appendFileSync(outputFilePath, appendAlphabetStats(arrayOfPasswords))
}

function appendAlphabetStats(arrayOfPasswords) {
  let alphabetStarts = {};
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  // for (let password of arrayOfPasswords) {  // Iterate through each password
  //   for (let i=0;i<alphabet.length;i++) {   // And through each letter of the alphabet
  //     if (password[0].toLowerCase() === alphabet[i]) {    // To check if the password starts with the letter
  //       if (alphabetStarts[alphabet[i]]) { // Does the letter as a key already exist?
  //         alphabetStarts[alphabet[i]] += 1
  //       } else {
  //         alphabetStarts[alphabet[i]] = 1
  //       }
  //       break;
  //     }
  //   }
  // }

  for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
    alphabetStarts[letter] = 0;
  }
  for (let password of arrayOfPasswords) {
    for (let i=0;i<alphabet.length;i++) {
      if (password[0].toLowerCase() === alphabet[i]) {
        alphabetStarts[alphabet[i]] += 1
      }
    }
  }

  
  let statsToLog = '';
  for (let i=0; i<alphabet.length;i++) {
    statsToLog += `Letter: ${alphabet[i].toUpperCase()}, Count: ${alphabetStarts[alphabet[i]]}\n`
  }
  return statsToLog
}

function numberPasswords(arrayOfPasswords) {
  const digit = /^[0-9]+$/;

  let numberPasswords = 0;
  for (let password of arrayOfPasswords) {
    numberPasswords += (digit.test(password[0]) ? 1 : 0)
  }
  return numberPasswords

}

// Main execution
deleteExistingOutputFile(); 
processData();
