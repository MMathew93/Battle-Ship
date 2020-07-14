import {
    shipFactory
} from '../Factories/Ship.js'

function gameBoard(size) {
    let markings = {
        ship: '#',
        ocean: '$',
        hit: 'X',
        miss: 'O'
    }
    return {
        board: new Array(size).fill().map(() => Array(size).fill(markings.ocean)),
        ships: [],
        misses: [],
        placeShip(shipLength, x, y, isHorizontal) {
            let xEnd = x;
            let yEnd = y;
            let err;
            for (let i = 0; i < shipLength; i++) {
                if (xEnd > size - 1 || yEnd > size - 1) {
                    err = new Error('This is outside the gameboard')
                }

                if (this.board[xEnd][yEnd] === markings.ship) {
                    err = new Error('There is already a ship here')
                }
                
                this.board[xEnd][yEnd] = markings.ship
                if (isHorizontal) {
                    yEnd += 1
                } else {
                    xEnd += 1
                }
            }

            this.ships.push({
                ship: shipFactory(shipLength),
                start: [x, y],
                end: [xEnd, yEnd]
            })
            return err
        },
        receiveAttack(x, y) {
            let err;
            if (x > this.board.size - 1 || y > this.board.size - 1) {
                err= new Error('This exceeds the current board size')
            }
            if(this.board[x][y] === markings.ship) {
                this.board[x][y] = markings.hit
            }
        }
    }
}

export {
    gameBoard
}

//Gameboards should be able to place ships at specific coordinates by calling the ship factory function
//Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
//Gameboards should keep track of missed attacks so they can display them properly.
//Gameboards should be able to report whether or not all of their ships have been sunk.