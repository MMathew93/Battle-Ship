import { player } from '../Factories/Player.js'
import { gameBoard } from '../Factories/Gameboard.js';

test('test that player returns', () => {
    let thisPlayer = player
    expect(thisPlayer).toBeTruthy()
});

test('test makeMove returns', () => {
    let thisPlayer = player
    expect(thisPlayer.playerMove).toEqual(player.playerMove)
});

test('test if board throws an error on prior attacked location', () => {
    let board= gameBoard(8)
    board.receiveAttack(0, 0)
    expect(()=> {
        player().playerMove(board, 0, 0)
    }).toThrow('This has already been marked by an attack, select another coordinate')
});

test('test if player attack goes through', () => {
    let board= gameBoard(8)
    board.receiveAttack(0, 0)
    expect(()=> {
        player().playerMove(board, 0, 1)
    }).toBeTruthy()
});

//testing bot move
test('test if bot move goes through', () => {
    let humanBoard= gameBoard(8)
    expect(()=> {
        player().botMove(humanBoard)
    }).toBeTruthy()
});

test('test that bot move will re-run on duplicate hit', () => {
    let humanBoard= gameBoard(2)
    humanBoard.receiveAttack(0, 0)
    humanBoard.receiveAttack(0, 1)
    humanBoard.receiveAttack(1, 0)
    expect(()=> {
        player().botMove(humanBoard)
    }).toBeTruthy()
});