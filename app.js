/*-------------------------------- Constants --------------------------------*/
const MAXTURN = 26


/*---------------------------- Variables (state) ----------------------------*/
let player1Score
let player2Score
let turnNumber
let currentDice = []
let lockedDice = []
let player1Turn = false
let player2Turn = false

/*------------------------ Cached Element References ------------------------*/
const scoreCardEl = document.querySelector('.score-card')
const player1ScoreEl = document.querySelector('player1-score')
const player2ScoreEl = document.querySelector('player2-score')
const scoreBoxEls = document.querySelectorAll('.score-box')
const dieEls = document.querySelectorAll('.die')
const btnEL = document.querySelector('button')


/*-------------------------------- Functions --------------------------------*/
const init = () => {
    player1Score = 0
    player2Score = 0
    turnNumber = 1
    currentDice = Array(5).fill('')

}
const randomNumGenerator = () => {

    return ((Math.floor(Math.random() * 6)) + 1)
}
const rollDice = () => {
    for (let i = 0; i < currentDice.length; i++) {
        currentDice[i] = randomNumGenerator()
    }

    console.log(currentDice)
}
/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load', init)
btnEL.addEventListener('click', rollDice)



