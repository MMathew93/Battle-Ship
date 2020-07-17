import { gameBoard } from '../Factories/Gameboard.js'
import { shipFactory } from '../Factories/Ship.js'
import { player } from '../Factories/Player.js'

function beginGame() {
    let playerBoard= gameBoard(10)
    let human= player()
    let botBoard= gameBoard(10)
    let bot= player()
}

//Get user input
//Update the game state
//Draw the game