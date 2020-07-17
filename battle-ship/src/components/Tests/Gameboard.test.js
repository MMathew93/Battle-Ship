import {
    gameBoard
} from '../Factories/Gameboard.js'


test('returns the gameboard', () => {
    let showBoard = gameBoard(8).getBoard()
    expect(showBoard).toEqual(
        [
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"]
        ]
    )
});

test('should error if y is larger than the board', () => {
    let board = gameBoard(8)
    expect(() => {
        board.placeShip(3, 0, 99, true)
    }).toThrow('This is outside the gameboard')
});

test('should error if x is larger than the board', () => {
    let board = gameBoard(8)
    expect(() => {
        board.placeShip(3, 99, 0, true)
    }).toThrow('This is outside the gameboard')
});

test('should error if ship is being placed on existing ship', () => {
    let board = gameBoard(8)
    board.placeShip(3, 3, 0, true)
    expect(() => {
        board.placeShip(3, 3, 0, true)
    }).toThrow('There is already a ship here')
});

test('returns board with ship at coordinates', () => {
    let board = gameBoard(8)
    let showBoard= board.getBoard()
    board.placeShip(3, 0, 0, true)
    expect(showBoard).toEqual(
        [
            ["#", "#", "#", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"]
        ]
    )
});

test('returns board with ship at coordinates', () => {
    let board = gameBoard(8)
    let showBoard= board.getBoard()
    board.placeShip(3, 0, 0, false)
    expect(showBoard).toEqual(
        [
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"]
        ]
    )
});

//testing receive attack function
test('should throw an error if y coordinates are outside of board size', () => {
    let board = gameBoard(8)
    expect(() => {
        board.receiveAttack(0, 99)
    }).toThrow('Coordinates are exceeding the gameboard size')
});

test('should throw an error if x coordinates are outside of board size', () => {
    let board = gameBoard(8)
    expect(() => {
        board.receiveAttack(99, 0)
    }).toThrow('Coordinates are exceeding the gameboard size')
});

test('checks to verify if ship is hit that it marks it', () => {
    let board = gameBoard(8)
    let showBoard= board.getBoard()
    board.placeShip(3, 0, 0, false)
    board.receiveAttack(0, 0)
    expect(showBoard).toEqual(
        [
            ["X", "$", "$", "$", "$", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"]
        ]
    )
});

test('checks to verify if miss it marks', () => {
    let board = gameBoard(8)
    let showBoard= board.getBoard()
    board.placeShip(3, 0, 0, false)
    board.receiveAttack(0, 4)
    expect(showBoard).toEqual(
        [
            ["#", "$", "$", "$", "O", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["#", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"],
            ["$", "$", "$", "$", "$", "$", "$", "$"]
        ]
    )
});

test('checks to verify missed attack get logged', () => {
    let board = gameBoard(8)
    board.placeShip(3, 0, 0, false)
    board.receiveAttack(0, 4)
    expect(board.getMisses()).toEqual(
        [
            [0, 4]
        ]
    )
});

//gameboard must check to see if all ships have been sunk

/**test('check to see gameloss function exists', () => {
    let board = gameBoard(8)
    expect(board.gameLoss()).toBeTruthy()
});

test('gameLoss function will pull all ships currently on board and spit out an array of which ships show sunk as true or false', () => {
    let board = gameBoard(8)
    board.placeShip(3, 0, 0, false)
    board.placeShip(4, 1, 1, true)
    board.placeShip(5, 2, 2, false)
    expect(board.gameLoss()).toEqual([false, false, false])
});*/

test('when all ships are sunk, we announce that we lose', () => {
    let board = gameBoard(8)
    board.placeShip(3, 0, 0, false)
    board.receiveAttack(0, 0)
    board.receiveAttack(1, 0)
    board.receiveAttack(2, 0)
    expect(board.gameLoss()).toEqual(console.log('All ships have been sunk, you lose!'))
});