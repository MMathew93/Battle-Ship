function player() {
    let botCoords = []
    let nextMove = []
    let initialHit = []
    let lastHit = []
    let movingUp = true
    let counter = 0
    let killingBlow = false
    return {
        playerMove(gb, x, y) {
            let board = gb.getBoard()
            let markings = gb.getMarkings()
            if (board[x][y] !== markings.hit && board[x][y] !== markings.miss) {
                gb.receiveAttack(x, y)
            } else {
                throw new Error('This has already been marked by an attack, select another coordinate')
            }
        },
        botMove(gb) {
            let x = Math.floor(Math.random() * Math.floor(10))
            let y = Math.floor(Math.random() * Math.floor(10))
            let board = gb.getBoard()
            let markings = gb.getMarkings()
            //position will verify if ship is horizontal(true) or vertical(false)
            //we will then start with the last shot and go up/down and then when we miss we go to the initial shot and go the opposite of what we just did
            if (killingBlow) {
                //checking if ship is horizontal
                if (initialHit[1] > lastHit[1] || initialHit[1] < lastHit[1]) {
                    this.killConfirm(true, gb)
                    //else do vertical checks
                } else if (initialHit[0] > lastHit[0] || initialHit[0] < lastHit[0]) {
                    this.killConfirm(false, gb)
                }

            } else if (nextMove.length !== 0) {
                let randomNextMove = Math.floor(Math.random() * Math.floor(nextMove.length))
                let a = nextMove[randomNextMove][0]
                let b = nextMove[randomNextMove][1]
                gb.receiveAttack(a, b)
                botCoords = []
                botCoords.push(a)
                botCoords.push(b)
                if (board[a][b] === markings.hit) {
                    lastHit = []
                    movingUp = true
                    lastHit.push(a)
                    lastHit.push(b)
                    nextMove = []
                    killingBlow = true
                } else {
                    nextMove.splice(randomNextMove, 1)
                }
            } else if (nextMove.length === 0) {
                if (board[x][y] !== markings.hit && board[x][y] !== markings.miss) {
                    gb.receiveAttack(x, y)
                    botCoords = []
                    botCoords.push(x)
                    botCoords.push(y)

                    if (board[x][y] === markings.hit) {
                        initialHit = []
                        initialHit.push(x)
                        initialHit.push(y)
                        nextMove.push([(x - 1), y])
                        nextMove.push([(x + 1), y])
                        nextMove.push([x, (y - 1)])
                        nextMove.push([x, (y + 1)])

                        for (let i = 0; i < nextMove.length; i++) {
                            const spot = document.querySelector(`.human[data-coords="${nextMove[i][0]},${nextMove[i][1]}"]`);
                            if (nextMove[i][0] < 0 || nextMove[i][0] > board.length - 1) {
                                nextMove.splice(i, 1)
                                i = -1
                            } else if (nextMove[i][1] < 0 || nextMove[i][1] > board.length - 1) {
                                nextMove.splice(i, 1)
                                i = -1
                                //need to check surrounding area if it has been marked already
                            } else if (spot.innerHTML === 'X' || spot.innerHTML === 'O') {
                                nextMove.splice(i, 1)
                                i = -1
                            }
                        }
                    }
                } else {
                    this.botMove(gb)
                }
            }
        },
        getBotCoords() {
            return botCoords
        },
        killConfirm(isHorizontal, gb) {
            //check previous shot to see if we hit or miss before proceeding
            const lastTile = document.querySelector(`.human[data-coords="${lastHit[0]},${lastHit[1]}"]`)
            if (lastTile.innerHTML === 'X') {
                if (isHorizontal) {
                    if (movingUp) {
                        lastHit[1] = lastHit[1] + 1
                    } else {
                        lastHit[1] = lastHit[1] - 1
                    }
                } else {
                    if (movingUp) {
                        lastHit[0] = lastHit[0] + 1
                    } else {
                        lastHit[0] = lastHit[0] - 1
                    }
                }
            } else {
                ++counter
                if (counter === 2) {
                    counter = 0
                    killingBlow = false
                    return this.botMove(gb)
                } else {
                    movingUp= false;
                    if (isHorizontal) {
                        lastHit[1] = lastHit[1] - 1
                    } else {
                        lastHit[0] = lastHit[0] - 1
                        }
                    }
                }
            //check if position is still on board
            if (lastHit[0] > 9 || lastHit[1] > 9) {
                movingUp = false
                if(isHorizontal) {
                    lastHit[1] = 9
                }else {
                    lastHit[0] = 9
                }
                return this.killConfirm(isHorizontal, gb)
            } else if (lastHit[0] < 0 || lastHit[1] < 0) {
                killingBlow = false
                return this.botMove(gb)
            }
            //this will check our current shot and see if it has been marked already prior
            const shotTile = document.querySelector(`.human[data-coords="${lastHit[0]},${lastHit[1]}"]`)
            if (shotTile.innerHTML === 'X') {
                return this.killConfirm(isHorizontal, gb)
            } else if (shotTile.innerHTML === 'O') {
                movingUp = false
                return this.killConfirm(isHorizontal, gb)
            }
            gb.receiveAttack(lastHit[0], lastHit[1])
            botCoords = []
            botCoords.push(lastHit[0])
            botCoords.push(lastHit[1])
        }
    }
}

export {
    player
}