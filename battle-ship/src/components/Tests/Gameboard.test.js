import { gameBoard } from '../Factories/Gameboard.js'

test('returns the gameboard', () => {
    let board= gameBoard(8)
    expect(board.board).toEqual(
        [["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"]]
    )
});

test('should error if y is larger than the board', () => {
    let board= gameBoard(8)
    expect(board.placeShip(3, 0, 99, true)).toEqual(new Error('This is outside the gameboard'))
});

test('should error if x is larger than the board', () => {
    let board= gameBoard(8)
    expect(board.placeShip(3, 99, 0, true)).toEqual(new Error('This is outside the gameboard'))
});

test('should error if ship is being placed on existing ship', () => {
    let board= gameBoard(8)
    board.placeShip(3, 3, 0, true)
    expect(board.placeShip(3, 3, 0, true)).toEqual(new Error('There is already a ship here'))
});

test('returns board with ship at coordinates', () => {
    let board= gameBoard(8)
    board.placeShip(3, 0, 0, true)
    expect(board.board).toEqual(
        [["#", "#", "#", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"]]
    )
});

test('returns board with ship at coordinates', () => {
    let board= gameBoard(8)
    board.placeShip(3, 0, 0, false)
    expect(board.board).toEqual(
        [["#", "$", "$", "$", "$", "$", "$", "$"], 
        ["#", "$", "$", "$", "$", "$", "$", "$"], 
        ["#", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"]]
    )
});

//testing receive attack function
test('returns to see if receive attack takes in the coordinates', () => {
    let board= gameBoard(8)
    expect(board.receiveAttack(0, 0)).toEqual(0, 0)
});

test('checks to verify if ship is hit that it marks it', () => {
    let board= gameBoard(8)
    board.placeShip(3, 0, 0, false)
    board.receiveAttack(0, 0)
    expect(board.board).toEqual(
        [["X", "$", "$", "$", "$", "$", "$", "$"], 
        ["#", "$", "$", "$", "$", "$", "$", "$"], 
        ["#", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"], 
        ["$", "$", "$", "$", "$", "$", "$", "$"]]
    )
});

it.only('ensure coordinates are applicable to board size', () => {
    let board= gameBoard(8)
    expect(board.receiveAttack(0, 90)).toEqual(new Error('This exceeds the current board size'))
});

//need ship to run hit function on hit
