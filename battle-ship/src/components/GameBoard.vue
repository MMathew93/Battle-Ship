<template>
  <div class="main">
    <div class="title"> {{ title }} </div>
    <div class="playarea">
      <div class="display">
        <button class="random" @click="randomBoatsHuman"> Random SetUp </button>
        <div class="gameboard">
          <div v-for="(row, rowindex) in humanBoard" :key="rowindex">
            <div class="box" v-for="(col, colindex) in humanBoard" :key="rowindex-colindex"
              :bot-coords="[colindex, rowindex]"></div>
          </div>
        </div>
        <h1> Your Battalion </h1>
      </div>
      <div class="gameOver" v-show="gameOver"> {{ status }} </div>
      <div class="display">
        <div class="gameboard">
          <div v-for="(row, rowindex) in botBoard" :key="rowindex">
            <div class="box" v-for="(col, colindex) in botBoard" :key="rowindex-colindex"
              :human-coords="[colindex, rowindex]" @click="takingTurns(colindex, rowindex)"></div>
          </div>
        </div>
        <h1> Computer Battalion </h1>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    gameBoard
  } from './Factories/Gameboard.js'
  import {
    player
  } from './Factories/Player.js'

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
        miss: 'O',
        status: '',
        gameOver: true
      }
    },
    methods: {
      takingTurns(colindex, rowindex) {
        this.humanPlayer.playerMove(this.bot, colindex, rowindex)
        this.updateBotBoard(colindex, rowindex)
        this.statusOfGame()
        this.botTurn()
        this.statusOfGame()
      },

      botTurn() {
        this.botPlayer.botMove(this.human)
        let coords = this.botPlayer.getBotCoords()
        this.updateHumanBoard(coords)
      },

      updateBotBoard(colindex, rowindex) {
        if (this.botBoard[colindex][rowindex] === 'X') {
          const spot = document.querySelector(`[human-coords="${colindex},${rowindex}"]`);
          spot.append('X')
        }
        if (this.botBoard[colindex][rowindex] === 'O') {
          const spot = document.querySelector(`[human-coords="${colindex},${rowindex}"]`);
          spot.append('O')
        }
      },

      updateHumanBoard(coords) {
        if (this.humanBoard[coords[0]][coords[1]] === 'X') {
          const spot = document.querySelector(`[bot-coords="${coords[0]},${coords[1]}"]`);
          spot.append('X')
        }
        if (this.humanBoard[coords[0]][coords[1]] === 'O') {
          const spot = document.querySelector(`[bot-coords="${coords[0]},${coords[1]}"]`);
          spot.append('O')
        }
      },

      statusOfGame() {
        if (this.human.gameLoss() === true) {
          this.playerLose = true
          this.status = 'ALL OF YOUR SHIPS HAVE BEEN SUNK! YOU LOSE!'
        } else if (this.bot.gameLoss() === true) {
          this.botLose = true
          this.status = 'YOU SUNK ALL ENEMY SHIPS! YOU WIN!'
        } else {
          return false
        }
      },

      randomBoatsHuman() {
        this.human.placeShipRandomly(5)
        this.human.placeShipRandomly(4)
        this.human.placeShipRandomly(3)
        this.human.placeShipRandomly(3)
        this.human.placeShipRandomly(2)
      }
    },
    mounted() {
      //establish data
      this.human = gameBoard(10)
      this.humanBoard = this.human.getBoard()
      this.humanPlayer = player()
      this.bot = gameBoard(10)
      this.botBoard = this.bot.getBoard()
      this.botPlayer = player()

      //random bot placement on load
      this.bot.placeShipRandomly(5)
      this.bot.placeShipRandomly(4)
      this.bot.placeShipRandomly(3)
      this.bot.placeShipRandomly(3)
      this.bot.placeShipRandomly(2)
    }
  }
</script>

<style scoped>
  h1 {
    margin: 25px;
    color: white;
  }

  .main {
    margin-top: 60px;
    text-align: center;
  }

  .title {
    color: white;
    font-size: 200px;
    margin: 100px;
  }

  .playarea {
    display: flex;
    justify-content: space-evenly;
  }

  .display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .gameboard {
    display: flex;
    margin: 0 50px;
  }

  .gameOver {
    color: white;
    font-size: 50px;
    align-self: center;
    width: 400px;
    line-height: 1.3;
  }

  .box {
    width: 60px;
    height: 60px;
    border: 1px solid red;
    color: white;
    font-size: 50px;
  }

  .random {
    width: 20%;
  }
</style>