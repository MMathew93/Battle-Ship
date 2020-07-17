function player() {
    return {
        playerMove(gb, x, y) {
            let board= gb.getBoard()
            let markings= gb.getMarkings()
            if(board[x][y] !== markings.hit && board[x][y] !== markings.miss ) {
                gb.receiveAttack(x, y)
            }else {
                throw new Error('This has already been marked by an attack, select another coordinate')
            }
        },
        botMove(gb) {
            let x= Math.floor(Math.random() * Math.floor(10))
            let y= Math.floor(Math.random() * Math.floor(10))
            let board= gb.getBoard()
            let markings= gb.getMarkings()
            if(board[x][y] !== markings.hit && board[x][y] !== markings.miss ) {
                gb.receiveAttack(x, y)
            }else {
                this.botMove(gb)
            }
    }
}
}

export { player }