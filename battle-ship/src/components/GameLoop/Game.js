import { gameBoard } from '../Factories/Gameboard.js'
//import { shipFactory } from '../Factories/Ship.js'
import { player } from '../Factories/Player.js'

function beginGame() {
    let humanBoard= gameBoard(10)
    let human= player()
    let botBoard= gameBoard(10)
    let bot= player()

    function setBoards() {
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
    }
    setBoards()

    return [humanBoard, botBoard, human, bot]
}

export {
    beginGame
}

//Get user input
//Update the game state
//Draw the game