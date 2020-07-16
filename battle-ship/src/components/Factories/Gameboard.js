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
            let coordinates = []
            for (let i = 0; i < shipLength; i++) {
                if (xEnd > size - 1 || yEnd > size - 1) {
                    throw new Error('This is outside the gameboard')
                }

                if (this.board[xEnd][yEnd] === markings.ship) {
                    throw new Error('There is already a ship here')
                }

                this.board[xEnd][yEnd] = markings.ship
                coordinates.push([xEnd, yEnd])
                if (isHorizontal) {
                    yEnd += 1
                } else {
                    xEnd += 1
                }
            }

            this.ships.push({
                ship: shipFactory(shipLength),
                coordinates: coordinates
            })
        },
        receiveAttack(x, y) {
            if (x > size - 1 || y > size - 1) {
                throw new Error('Coordinates are exceeding the gameboard size')
            }
            if (this.board[x][y] === markings.ship) {
                this.board[x][y] = markings.hit
                //we need to call hit function on hit ship after we locate the index of the coordinates within the ship object
                let index;
                let target;
                for (let i = 0; i < this.ships.length; i++) {
                    for (let j = 0; j < this.ships[i].coordinates.length; j++) {
                        let a = this.ships[i].coordinates[j]
                        let b = [x, y]
                        if (this.arrayEquals(a, b)) {
                            target = i
                            index = j
                            break;
                        }
                    }
                }
                this.ships[target].ship.hit(index)
                this.ships[target].ship.isSunk()
            } else {
                this.board[x][y] = markings.miss
                this.misses.push([x, y])
            }
        },
        arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index])
        },
        gameLoss() {
            //need gameboards to report whether or not all their ships have been sunk
            //if ship is sunk it is true, else false
            let sunkenShips= this.ships.map(x => x.ship.sunk )
            if(sunkenShips.every(x => x === true)) {
                console.log('All ships have been sunk, you lose!')
            }
        }
    }
}

export {
    gameBoard
}