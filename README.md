<img src='images/Black and White Modern Entertainment Logo (3).png' alt='Yahtzee Logo'/>

# Yahtzee

Originally created in 1956 by Milton Bradley, this dice game gets its roots from other games such as Poker, Yacht, and Generala.I chose to re-create this game becuase it seemed challenging yet comprehendable, I was quickly able to list out the parts of the game that I needed to make and figure out

Link to my planning document:
https://generalassembly.instructure.com/courses/296/assignments/3624

## Rules

- The game consists of 13 rounds.
- Each player gets 3 rolls on their turn to score points.
- A player can choose to LOCK or UNLOCK any die between rolls
- There are multiple ways to score, but each category can only be used once.
- If a player chooses a category for which they do not have, the score for that category is 0.
- The game ends after the 13th round, scores are calculated and highest score wins

## Ways to Score

- Basic Values
  - Aces - Sum all the 1's
  - Twos - Sum all the 2's
  - Threes - Sum all the 3's
  - Fours - Sum all the 4's
  - Fives - Sum all the 5's
  - Sixes - Sum all the 6's
- 3 of a Kind
  - If there are 3 of the same number, sum all the dice on the board
- 4 of a Kind
  - If there are 4 of the same number, sum all the dice on the board
- Full House
  - If a player has a pair AND 3 of a kind, score 25 points
- Small Straight
  - If a player has a sequence of 4 consecutive numbers, score 30 points
- Larger Straight
  - If a player has a sequence of 5 consecutive numbers, score 40 points
- Yahtzee
  - If there are 5 of the same number, score 50 points
- Chance
  - Sum all dice on the board

## Technologies

- HTML
- CSS
- Javascript

## Attributions

Yahztee-Score-Card Inspiration:
https://www.eecis.udel.edu/~davis/yahtzee.pdf

Logo Created by Nicole Riccio (my wife <3)

Links I used for reference:

https://stackoverflow.com/questions/1495822/replacing-nbsp-from-javascript-dom-text-node

https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode

https://www.w3schools.com/jsref/met_win_settimeout.asp

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted#comparefn

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Dice Faces:

https://game-icons.net/1x1/delapouite/dice-six-faces-five.html

## Next Steps

- Would like to add a winning animation
- Better sound FX
- Perhaps a score preview before clicking so user knows what that score would be (completed)
- Would like to reduce the scoreclick and preview into one function
