function shipFactory(length) {
    return {
        length,
        damage: new Array(length).fill(false),//where the ship has been hit
        sunk: false,
        hit(i) {
            this.damage[i]= true
            return this.damage
        },
        isSunk() {
            if(this.damage.every(x => x === true)) {
                this.sunk= true
                console.log('This ship has sunk!')
                return this.sunk
            }else {
                console.log('This ship is still active')
                return this.sunk
              }
        }
    }
}

//5, 4, 3, 3, 2

module.exports= shipFactory;