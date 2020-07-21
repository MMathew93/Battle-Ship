import {
    gameBoard
} from '../Factories/Gameboard.js'
import {
    player
} from '../Factories/Player.js'

function beginGame() {
    let humanBoard = gameBoard(10)
    let human = player()
    let botBoard = gameBoard(10)
    let bot = player()

    //manual setup for ships for test purposes
    humanBoard.placeShip(5, 0, 0, true)
    humanBoard.placeShip(4, 6, 9, false)
    humanBoard.placeShip(3, 3, 3, true)
    humanBoard.placeShip(3, 5, 2, false)
    humanBoard.placeShip(2, 2, 8, true)
    botBoard.placeShip(5, 0, 0, true)
    botBoard.placeShip(4, 6, 9, false)
    botBoard.placeShip(3, 3, 3, true)
    botBoard.placeShip(3, 5, 2, false)
    botBoard.placeShip(2, 2, 8, true)

    const statusOfGame = () => {
        if(humanBoard.gameLoss() === true) {
            console.log('YOU LOSE!')
        } else if(botBoard.gameLoss() === true) {
            console.log('YOU WIN!')
        } else {
            false
            takingTurns
        }
    }

    const takingTurns= () => {
        if(statusOfGame === false) {
            human.playerMove(botBoard, 0, 0)
            bot.botMove(humanBoard)
            statusOfGame()
        } else {
            gameOver()
        }
    }

    const gameOver= () => {
        alert('Implement a gameover screen and a reset button')
    }

    return [humanBoard, botBoard, human, bot]
}

export {
    beginGame
}


//Get user input
//Update the game state
//Draw the game