/*-------------------------------- Constants --------------------------------*/
const MAX_TURN = 26
const diceArray = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4'), document.getElementById('5'), document.getElementById('6'),]


/*---------------------------- Variables (state) ----------------------------*/
let player1Score
let player2Score
let turnNumber
let currentDice = []
let lockedDice = []
let player1Turn = false
let player2Turn = false
let dieUnlocked = false

/*------------------------ Cached Element References ------------------------*/
const scoreCardEl = document.querySelector('.score-card')
const player1ScoreEl = document.querySelector('player1-score')
const player2ScoreEl = document.querySelector('player2-score')
const scoreBoxEls = document.querySelectorAll('.score-box')
const dieEls = document.querySelectorAll('.die')
const diceEls = document.querySelector('.dice')
const btnEL = document.querySelector('button')


/*-------------------------------- Functions --------------------------------*/
const init = () => {
    player1Score = 0
    player2Score = 0
    turnNumber = 1
    currentDice = Array(5).fill('')
    dieEls.forEach((die) => {
        die.classList.add('unlocked')
    })

}


const randomNumGenerator = () => {

    return ((Math.floor(Math.random() * 6)) + 1)
}
const rollDice = () => {
    for (let i = 0; i < currentDice.length; i++) {

        currentDice[i] = randomNumGenerator()
    }

    render()
    console.log(currentDice)
}
const handleDiceClick = (event) => {
    if (event.target.classList.contains('dice')) {
        return
    }
    if (dieUnlocked) {

        event.target.classList.add('locked')
        event.target.classList.remove('unlocked')
        dieUnlocked = false
    }
    else {
        event.target.classList.add('unlocked')
        event.target.classList.remove('locked')
        dieUnlocked = true
    }


}


const assignDice = () => {

    dieEls.forEach((die) => {
        console.log(die.classList)
        die.classList.remove(die.classList[2])
        die.classList.add(`face-${currentDice[die.id - 1]}`)
        console.log(die.classList)

    })
}
const render = () => {
    assignDice()
}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load', init)
btnEL.addEventListener('click', rollDice)
diceEls.addEventListener('click', handleDiceClick)



