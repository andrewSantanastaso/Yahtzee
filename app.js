/*-------------------------------- Constants --------------------------------*/
const MAX_TURN = 26
const diceArray = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3'), document.getElementById('4'), document.getElementById('5'), document.getElementById('6'),]

const largeStraights = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]]
const smallStraights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
const empty = '\u00A0'
const diceRollingAudio = new Audio("audio/dice-rolling - 6_11_24, 9.46 AM.m4a")
const writingAudio = new Audio("audio/233555-Parched-drawing-rough-paper-canvas-chalk-stroke-scribble-short-V-alt.wav")
const notValidChoiceAudio = new Audio("audio/NotValid.m4a")
/*---------------------------- Variables (state) ----------------------------*/
let player1Score = []
let player2Score = []
let turnNumber
let currentDice = []
let orderedArray = []
let player1Turn = false
let player2Turn = false
let dieUnlocked = true
let rollNumber
let currentPlayer
let winner
let spinAnimationDone = false

/*------------------------ Cached Element References ------------------------*/
const currentPlayerEl = document.querySelector('.current-player')
const scoreCardEl = document.querySelector('.score-card')
const player1ScoreEl = document.querySelector('.player1-score')
const player2ScoreEl = document.querySelector('.player2-score')
const player1TotalEl = document.querySelector('.player1-total')
const player2TotalEl = document.querySelector('.player2-total')
const scoreBoxEls = document.querySelectorAll('.score-box')
const dieEls = document.querySelectorAll('.die')
const diceEl = document.querySelector('.dice')
const btnEL = document.querySelector('button')


/*-------------------------------- Functions --------------------------------*/
const init = () => {
    player1Score = []
    player1TotalEl.innerText = 0
    player2TotalEl.innerText = 0
    player2Score = []
    turnNumber = 1
    currentDice = Array(5).fill(randomNumGenerator())
    dieEls.forEach((die) => {
        die.classList.add('unlocked')
    })
    scoreBoxEls.forEach((scorebox) => {
        scorebox.innerText = empty
    })
    btnEL.innerText = "Roll Dice"
    btnEL.style.height = '80px'
    winner = ''
    player1Turn = true
    rollNumber = 0

    render()

}

const displayCurrentPlayer = () => {
    if (player1Turn) {
        currentPlayer = 'Player 1'
    }
    else {
        currentPlayer = 'Player 2'
    }
    if (rollNumber === 0) {
        currentPlayerEl.innerText = `${currentPlayer}\'s Turn`
    }
    else {
        currentPlayerEl.innerText = `${currentPlayer}\'s Turn. Roll Number: ${rollNumber}`
    }
}


const switchPlayer = () => {
    if (player1Turn) {
        player2Turn = true
        player1Turn = false

    }
    else {
        player1Turn = true
        player2Turn = false

    }
    turnNumber++
    rollNumber = 0
    dieEls.forEach((die) => {
        die.classList.replace('locked', 'unlocked')
    })
    spinAnimationDone = false

}




// --------- DICE LOGIC -----------//
const randomNumGenerator = () => {

    return ((Math.floor(Math.random() * 6)) + 1)
}
const rollDice = () => {

    if (rollNumber > 2) {
        return
    }
    diceRollingAudio.volume = 0.75
    diceRollingAudio.play()
    for (let i = 0; i < currentDice.length; i++) {
        if (diceArray[i].classList.contains('unlocked')) {

            currentDice[i] = randomNumGenerator()

        }


    }
    rollNumber++
    orderedArray = currentDice.toSorted()

    render()


}

const handleDiceClick = (event) => {

    if (event.target.classList.contains(!'die')) {
        return
    }
    if (dieUnlocked) {

        event.target.classList.replace('locked', 'unlocked')

        dieUnlocked = false
    }
    else {
        event.target.classList.replace('unlocked', 'locked')


        dieUnlocked = true
    }

}


const assignDice = () => {
    if (rollNumber >= 0) {
        dieEls.forEach((die) => {

            if (die.classList.contains('unlocked')) {
                die.classList.remove(die.classList[2])
            }


            die.classList.add(`face-${currentDice[die.id - 1]}`)
        })
    }
}
const sumOfAllDice = () => (currentDice.reduce((acc, n, i) => {
    return acc + n
}, 0))

const checkForYahtzee = () => {
    currentDice.every(die => {
        die === currentDice[0]
    })
}
const checkForChance = () => {
    sumOfAllDice()


}
const checkForLargeStraight = () => {
    if (orderedArray.toString() === largeStraights[0].toString() || orderedArray.toString() === largeStraights[1].toString()
    ) {
        return true
    }

}
const checkForSmallStraight = () => {
    let orderedSet = [...new Set(orderedArray)]

    if (orderedSet.toString().includes(smallStraights[0].toString()) || orderedSet.toString().includes(smallStraights[1].toString()) || orderedSet.toString().includes(smallStraights[2].toString())) {

        return true
    }

}

const checkForFullHouse = () => {
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
const checkForBasics = (n) => {
    let output = 0
    for (let x of currentDice) {
        if (x === n) {
            output += x
        }
    }
    return output
}
//-------SCORING LOGIC--------//

const handlePlayerScoreClick = (event) => {
    let player
    let scoreArray
    const scoreBoxName = event.target.id

    if (player1Turn) {
        player = player1ScoreEl
        scoreArray = player1Score
    }
    else {
        player = player2ScoreEl
        scoreArray = player2Score
    }

    if (event.target.parentNode === player && rollNumber > 0) {


        if (event.target.innerText !== empty) {
            notValidChoiceAudio.play()
            return
        }
        writingAudio.play()
        switch (scoreBoxName) {
            case 'chance':

                event.target.innerText = sumOfAllDice()
                scoreArray.push(sumOfAllDice())
                switchPlayer()
                break;
            case 'yahtzee':
                if (checkForYahtzee()) {
                    event.target.innerText = '50'
                    scoreArray.push(50)

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case 'large-straight':
                if (checkForLargeStraight()) {
                    event.target.innerText = '40'
                    scoreArray.push(40)

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case 'small-straight':
                if (checkForSmallStraight()) {
                    event.target.innerText = '30'
                    scoreArray.push(30)

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case 'full-house':
                if (checkForFullHouse()) {
                    event.target.innerText = '25'
                    scoreArray.push(25)

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case '4-kind':
                if (checkFor4Kind()) {
                    event.target.innerText = sumOfAllDice()
                    scoreArray.push(sumOfAllDice())

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case '3-kind':
                if (checkFor3Kind()) {
                    event.target.innerText = sumOfAllDice()
                    scoreArray.push(sumOfAllDice())

                }
                else {
                    event.target.innerText = '0'
                    scoreArray.push(0)

                }
                switchPlayer()
                break;
            case 'sixes':
                event.target.innerText = checkForBasics(6)
                scoreArray.push((checkForBasics(6)))
                switchPlayer()
                break;
            case 'fives':
                event.target.innerText = checkForBasics(5)
                scoreArray.push(checkForBasics(5))
                switchPlayer()
                break;

            case 'fours':
                event.target.innerText = checkForBasics(4)
                scoreArray.push(checkForBasics(4))
                switchPlayer()
                break;
            case 'threes':
                event.target.innerText = checkForBasics(3)
                scoreArray.push(checkForBasics(3))
                switchPlayer()
                break;
            case 'twos':
                event.target.innerText = checkForBasics(2)
                scoreArray.push(checkForBasics(2))
                switchPlayer()
                break;
            case 'aces':
                event.target.innerText = checkForBasics(1)
                scoreArray.push(checkForBasics(1))
                switchPlayer()
                break;
        }

    }

    player1TotalEl.innerText = displayTotals(player1Score)
    player2TotalEl.innerText = displayTotals(player2Score)

    checkForWinner()
}
const displayTotals = (arr) => {
    let totalSum = arr.reduce((acc, n, i) => {
        return acc + n
    }, 0)
    return totalSum
}

const checkForWinner = () => {
    let player1FinalScore = parseInt(player1TotalEl.innerText)
    let player2FinalScore = parseInt(player2TotalEl.innerText)
    if (turnNumber > MAX_TURN) {
        if (player1FinalScore > player2FinalScore) {
            winner = 'Player 1'
        }
        else if (player1FinalScore < player2FinalScore) {
            winner = 'Player 2'
        }
        else {
            winner = "Neither person! It's a tie"
        }
        currentPlayerEl.innerText = `The winner is ${winner}!`
        btnEL.innerText = 'PLAY AGAIN?'
        btnEL.style.height = '100px'
    }

}
const replayBtn = () => {
    if (winner !== '') {
        init()
    }
}

const spinAnimation = () => {
    if (rollNumber <= 3 && !spinAnimationDone) {

        dieEls.forEach(die => {
            if (die.classList.contains('unlocked')) {
                die.classList.add('spin');
                setTimeout(() => die.classList.remove('spin'), 1500);
            }
        });
        if (rollNumber === 3) {
            spinAnimationDone = true
        }


    }
}


const render = () => {
    displayCurrentPlayer()
    assignDice()
    checkForYahtzee()
    checkForChance()
    checkForLargeStraight()
    checkForSmallStraight()
    checkForFullHouse()
    checkFor4Kind()
    checkFor3Kind()
    checkForBasics()


}

/*----------------------------- Event Listeners -----------------------------*/
window.addEventListener('load', init)
btnEL.addEventListener('click', () => {
    rollDice()
    spinAnimation()
    replayBtn()
})
diceEl.addEventListener('click', handleDiceClick)
document.querySelectorAll('.score-box').forEach(box => {
    box.addEventListener('click', handlePlayerScoreClick)
})

