/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/



function generateWinningNumber(num){
  if (num !== undefined){
    return num
  } else {
    let min = 1
    let max = 101
  return Math.floor(Math.random() * (max - min)) + min;
  }
}

function shuffle(array) {
    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }


class Game {
      constructor(){
        this.playersGuess = null
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
      }

      difference(){
          return Math.abs(this.playersGuess - this.winningNumber)
      }

      isLower(){
        return this.playersGuess < this.winningNumber
      }

      playersGuessSubmission(guess){
        if (guess < 1 || guess > 100 || isNaN(guess)){
          throw 'That is an invalid guess.'
        }
        this.playersGuess = guess
        return this.checkGuess()
      }

      checkGuess(){
        let returnVal = '';
        
        if (this.playersGuess === this.winningNumber){
          this.pastGuesses = []
          returnVal = 'You Win!'
        } else if (this.pastGuesses.length ===4){
          returnVal = 'You Lose.'
          // this.pastGuesses = []
        } else if (this.pastGuesses.includes(this.playersGuess)){
          returnVal = 'You have already guessed that number.'
        } else if (this.difference() < 10){
          returnVal = "You're burning up!"
        } else if (this.difference() < 25){
          returnVal = "You're lukewarm."
        } else if (this.difference() < 50){
          returnVal = "You're a bit chilly."
        } else if (this.difference() < 100){
          returnVal = "You're ice cold!"
        }
        
        this.pastGuesses.push(this.playersGuess)

        // console.log(this.pastGuesses)
        return returnVal
      }

      provideHint(){
        let hintArr = [this.winningNumber]
        let hint1 = generateWinningNumber()
        if (!hintArr.includes(hint1)){
          hintArr.push(hint1)
        } else {
          hintArr.push(hint1 + 3)
        }
        let hint2 = generateWinningNumber()
        if (hint2 !== this.winningNumber){
          hintArr.push(hint1)
        } else {
          hintArr.push(hint2 + 4)
        }
        return shuffle(hintArr)
      }
  }


function newGame(){
    return new Game
}

let game = new Game

let subBtn = document.getElementById('SubmitButton')


function getInputandUpdate(inputElement){
    const text = inputElement.value
    inputElement.value = ''
    let guess = parseInt(text)
   
    let feedText = game.playersGuessSubmission(guess)
    let guess1 = document.getElementById('guess1')
    guess1.textContent = game.pastGuesses[0]
    let guess2 = document.getElementById('guess2')
    guess2.textContent = game.pastGuesses[1]
    let guess3 = document.getElementById('guess3')
    guess3.textContent = game.pastGuesses[2]
    let guess4 = document.getElementById('guess4')
    guess4.textContent = game.pastGuesses[3]
    let guess5 = document.getElementById('guess5')
    guess5.textContent = game.pastGuesses[4]
  
    
    let guesses = document.getElementById('guesses')
    // let newLi = document.createElement('li')
    // newLi.textContent = text
    // guesses.appendChild(newLi)

    let feedback = document.getElementById('feedback')
   
    feedback.textContent = feedText
    

}

subBtn.addEventListener('click', function(){
  
  const inputElement = document.getElementById('usrGuess')
  getInputandUpdate(inputElement)
  // console.log(game.pastGuesses.length)
  console.log(game.pastGuesses)
  
})

let resetButton = document.getElementById('reset')

resetButton.addEventListener('click', function (){
  document.getElementById("guess1").textContent = "";
  document.getElementById("guess2").textContent = "";
  document.getElementById("guess3").textContent = "";
  document.getElementById("guess4").textContent = "";
  document.getElementById("guess5").textContent = "";
  document.getElementById("feedback").innerHTML = "";
  game = newGame()
})