/*-------------------------------- Constants --------------------------------*/
const MAX_TURN = 26
const diceArray = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4'), document.getElementById('5'), document.getElementById('6'),]
const largeStraight = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]]
const smallStraight = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]

/*---------------------------- Variables (state) ----------------------------*/
let player1Score
let player2Score
let turnNumber
let currentDice = []
let lockedDice = []
let orderedArray = []
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
    orderedArray = currentDice.toSorted()
    render()
    console.log(currentDice)
    console.log(orderedArray)

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
const sumOfAllDice = () => (currentDice.reduce((acc, n, i) => {
    return acc + n
}, 0))

const checkForYahtzee = () => {
    const yahtzee = currentDice.every((elem) => {

        return elem === currentDice[0]
    })

    return yahtzee
}
const checkForChance = () => {
    console.log(sumOfAllDice())
    sumOfAllDice()


}
const checkForLargeStraight = () => {
    if (orderedArray.toString() === largeStraight.toString() || orderedArray.toString() === largeStraight[1].toString()
    ) {
        return true
    } else {
        return false
    }

}
const checkForSmallStraight = () => {
    let orderedString = orderedArray.toString()
    let smallStraightA = smallStraight[0].toString()
    let smallStraightB = smallStraight[1].toString()
    let smallStraightC = smallStraight[2].toString()
    if (orderedString.includes(smallStraightA) || orderedString.includes(smallStraightB) || orderedString.includes(smallStraightC)) {
        return true
    }
    else {
        return false
    }

}
checkForFullHouse = () => {
    if ((orderedArray[0] === orderedArray[1] && orderedArray[0] === orderedArray[2]) && (orderedArray[3] === orderedArray[4])) {

        return true
    }
    if ((orderedArray[2] === orderedArray[3] && orderedArray[2] === orderedArray[4]) && (orderedArray[0] === orderedArray[1])) {

        return true
    }

}
const checkFor4Kind = () => {
    if (orderedArray[0] === orderedArray[3] || orderedArray[1] === orderedArray[4]) {

        return true
    }
}
const checkFor3Kind = () => {
    if (orderedArray[0] === orderedArray[2] || orderedArray[1] === orderedArray[3] || orderedArray[2] === orderedArray[4]) {
        return true
    }
}
const render = () => {
    assignDice()
    lockedDiceSort()
    checkForYahtzee()
    checkForChance()
    checkForLargeStraight()
    checkForSmallStraight()
    checkForFullHouse()
    checkFor4Kind()
}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load', init)
btnEL.addEventListener('click', rollDice)
diceEls.addEventListener('click', handleDiceClick)



