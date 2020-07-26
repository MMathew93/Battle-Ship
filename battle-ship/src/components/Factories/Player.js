function player() {
    let botCoords = []
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
            let nextMove = []
            let board = gb.getBoard()
            let markings = gb.getMarkings()
            if (board[x][y] !== markings.hit && board[x][y] !== markings.miss) {
                gb.receiveAttack(x, y)
                botCoords = []
                botCoords.push(x)
                botCoords.push(y)

                if (board[x][y] === markings.hit) {
                    nextMove.push([(x - 1), y])
                    nextMove.push([(x + 1), y])
                    nextMove.push([x, (y - 1)])
                    nextMove.push([x, (y + 1)])
                    //let randomNextMove = Math.floor(Math.random() * Math.floor(nextMove.length))
                    for (let i = 0; i < nextMove.length; i++) {
                        const spot = document.querySelector(`[bot-coords="${nextMove[i][0]},${nextMove[i][1]}"]`);
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
                    console.log(nextMove)
                    //console.log(randomNextMove)


                    //9,4 returns 10, 4
                    //9.3 returns 10.3
                }
            } else {
                this.botMove(gb)
            }
        },
        getBotCoords() {
            return botCoords
        }
    }
}

export {
    player
}

//if(board[x][y] === marking.ocean) shoot
//if we hit again, verify if horizontal or vertical, then count up till miss or highest boat count that is no sunk