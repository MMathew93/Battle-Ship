<template>
<div class="main">
  <h1> {{ title }} </h1>
  <div class="playarea">
    <div class="gameboard">
      <div v-for="(row, rowindex) in humanBoard" :key="rowindex">
        <div class="box" v-for="(col, colindex) in humanBoard" :key="rowindex-colindex" :bot-coords="[colindex, rowindex]"></div>    
      </div>
    </div>
    <div class="gameboard">
      <div v-for="(row, rowindex) in botBoard" :key="rowindex">
        <div class="box" v-for="(col, colindex) in botBoard" :key="rowindex-colindex" :human-coords="[colindex, rowindex]" @click="takingTurns(colindex, rowindex)"></div>     
      </div>
    </div>
  </div>
  </div>
</template>

<script>
//import { beginGame } from './GameLoop/Game'
import { gameBoard } from './Factories/Gameboard.js'
import { player } from './Factories/Player.js'

export default {
  name: 'GameBoard',
  data() {
    return {
      human: null,
      humanBoard: null,
      humanPlayer: null,
      playerLose: false,
      bot: null,
      botBoard: null,
      botPlayer: null,
      botLose: false,
      title: 'BATTLESHIP',
      hit: 'X',
      miss: 'O'
    }
  },
  methods: {
   takingTurns(colindex, rowindex) {
     this.humanPlayer.playerMove(this.bot, colindex, rowindex)
     this.updateBotBoard(colindex, rowindex)
     this.botTurn()
   },

   botTurn() {
     this.botPlayer.botMove(this.human)
     let coords= this.botPlayer.getBotCoords()
     this.updateHumanBoard(coords)
   },

   updateBotBoard(colindex, rowindex) {
    if(this.botBoard[colindex][rowindex] === 'X') {
      const spot= document.querySelector(`[human-coords="${colindex},${rowindex}"]`);
      spot.append('X')
    }
    if(this.botBoard[colindex][rowindex] === 'O') {
      const spot= document.querySelector(`[human-coords="${colindex},${rowindex}"]`);
      spot.append('O')
    }
   },

   updateHumanBoard(coords) {
    if(this.humanBoard[coords[0]][coords[1]] === 'X') {
      const spot= document.querySelector(`[bot-coords="${coords[0]},${coords[1]}"]`);
      spot.append('X')
    }
    if(this.humanBoard[coords[0]][coords[1]] === 'O') {
      const spot= document.querySelector(`[bot-coords="${coords[0]},${coords[1]}"]`);
      spot.append('O')
    }
   },

   statusOfGame() {
        if(this.human.gameLoss() === true) {
            this.playerLose= true
            console.log('YOU LOSE!')
        } else if(this.bot.gameLoss() === true) {
          this.botLose= true
            console.log('YOU WIN!')
        } else {
            return false
        }
    }
    /*gameOver() {
      alert('Implement a gameover screen and a reset button')
    },**/
  },
  mounted() {
    //establish data
    this.human= gameBoard(10)
    this.humanBoard= this.human.getBoard()
    this.humanPlayer= player()
    this.bot= gameBoard(10)
    this.botBoard= this.bot.getBoard()
    this.botPlayer= player()

    //manually setting boats for testng
    this.human.placeShip(5, 0, 0, true)
    this.human.placeShip(4, 6, 9, false)
    this.human.placeShip(3, 3, 3, true)
    this.human.placeShip(3, 5, 2, false)
    this.human.placeShip(2, 2, 8, true)
    this.bot.placeShip(5, 0, 0, true)
    this.bot.placeShip(4, 6, 9, false)
    this.bot.placeShip(3, 3, 3, true)
    this.bot.placeShip(3, 5, 2, false)
    this.bot.placeShip(2, 2, 8, true)
  }
}
</script>

<style scoped>
.main {
  margin: 60px 10%;
  text-align: center;
}

.playarea {
  display: flex;
  justify-content: center;
}
.gameboard {
  display: flex;
  margin: 5%;
}

.box {
  width: 60px; 
  height: 60px; 
  border: 1px solid red; 
  color: white;
  font-size: 50px;
}
</style>
