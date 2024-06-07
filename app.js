/*-------------------------------- Constants --------------------------------*/
const MAX_TURN = 26
const diceArray = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4'), document.getElementById('5'), document.getElementById('6'),]

// const convertArrays = (arr, test) => {
//     let arrReduce = arr.reduce((acc, key) => {
//         if (acc[key]) {
//             acc[key]++
//         }
//         else {
//             acc[key] = 1
//         }
//         return acc
//     }, {})
//     let testReduce = test.reduce((acc, key) => {
//         if (acc[key]) {
//             acc[key]++
//         }
//         else {
//             acc[key] = 1
//         }
//         return acc
//     }, {})
//     return [testReduce, arrReduce]
// }
// const compareArrays = (sample,test) =>{
//     for (let i = 0; i<sample.length ;i++){

//     }
// }

/*---------------------------- Variables (state) ----------------------------*/
let player1Score
let player2Score
let turnNumber
let currentDice = []
let lockedDice = []
let player1Turn = false
let player2Turn = false
let dieUnlocked = true
let rollNumber = 1
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
    if (rollNumber > 3) {
        lockedDice = currentDice
        console.log(lockedDiceSort())
        return
    }
    for (let i = 0; i < currentDice.length; i++) {
        if (diceArray[i].classList.contains('unlocked')) {

            currentDice[i] = randomNumGenerator()
        }

        else {
            currentDice[i] = currentDice[i]
        }
    }
    // rollNumber++
    render()

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
        lockedDice.push(currentDice[event.target.id - 1])
        dieUnlocked = true
    }

}


const assignDice = () => {

    dieEls.forEach((die) => {

        if (die.classList.contains('unlocked')) {
            die.classList.remove(die.classList[2])
        }


        die.classList.add(`face-${currentDice[die.id - 1]}`)


    })
}
const lockedDiceSort = () => {
    return lockedDice.sort()
}

const checkforYahtzee = () => {
    const yahtzee = currentDice.every((elem) => {

        return elem === currentDice[0]
    })
    console.log(yahtzee)
    return yahtzee
}

const render = () => {
    assignDice()
    lockedDiceSort()
    checkforYahtzee()
}
console.log(lockedDiceSort(lockedDice))
/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load', init)
btnEL.addEventListener('click', rollDice)
diceEls.addEventListener('click', handleDiceClick)



