<template>
  <div class="main">
    <div class="title"> {{ title }} </div>
    <div class="playarea">
      <div class="display">
        <div class="ycoord">
          <div v-for="(col, colindex) in humanBoard" :key="colindex"> {{ colindex }} </div>
        </div>
        <div class="gameboard">
          <div class="xcoord">
            <div v-for="(row, rowindex) in humanBoard" :key="rowindex"> {{ rowindex }} </div>
          </div>
          <div v-for="(row, rowindex) in humanBoard" :key="rowindex">
            <div class="box human" v-for="(col, colindex) in humanBoard" :key="rowindex-colindex"
              :data-coords="[colindex, rowindex]" @dragover.prevent @drop="drop">
            </div>
          </div>
        </div>
        <div class="boardDetails">
          <h1> Your Battalion </h1>
        </div>
      </div>
      <div class="gameOver" v-show="gameOver">
        {{ status }}
        <div class="gameButtons">
          <button class="gameSetup random" v-if="hide" @click="randomBoatsHuman"> Random Ship Placement </button>
          <button class="gameSetup start" v-if="hide" @click="startGame"> Start Game</button>
        </div>
        <button class="reset" v-if="seen" @click="restartGame"> Restart</button>
      </div>
      <div>
        <div class="shipBox" v-if="hide" @dragstart="dragStart">
          <div class="boatPiece 5" draggable="true" :data-length="5" data-position="y">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div class="boatPiece 4" draggable="true" :data-length="4" data-position="y">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div class="boatPiece 3-1" draggable="true" :data-length="3" data-position="y">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div class="boatPiece 3-2" draggable="true" :data-length="3" data-position="y">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div class="boatPiece 2" draggable="true" :data-length="2" data-position="y">
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
        </div>
      </div>
      <div class="display" v-if="!hide">
        <div class="ycoord">
          <div v-for="(col, colindex) in botBoard" :key="colindex"> {{ colindex }} </div>
        </div>
        <div class="gameboard">
          <div class="xcoord">
            <div v-for="(row, rowindex) in botBoard" :key="rowindex"> {{ rowindex }} </div>
          </div>
          <div v-for="(row, rowindex) in botBoard" :key="rowindex">
            <div class="box pc" v-bind:class="{ 'disabled': disabled }" v-for="(col, colindex) in botBoard"
              :key="rowindex-colindex" :data-coords="[colindex, rowindex]" @click="takingTurns(colindex, rowindex)">
            </div>
          </div>
        </div>
        <div class="boardDetails">
          <h1> Computer Battalion </h1>
        </div>
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
        status: 'Drag your ships onto your board and click them to flip, or randomize the placement! Click on the Bot\'s board to shoot!',
        seen: false,
        hide: true,
        disabled: false,
        draggedShip: null,
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
          const spot = document.querySelector(`.pc[data-coords="${colindex},${rowindex}"]`);
          spot.append('X')
        }
        if (this.botBoard[colindex][rowindex] === 'O') {
          const spot = document.querySelector(`.pc[data-coords="${colindex},${rowindex}"]`);
          spot.append('O')
        }
      },

      updateHumanBoard(coords) {
        if (this.humanBoard[coords[0]][coords[1]] === 'X') {
          const spot = document.querySelector(`.human[data-coords="${coords[0]},${coords[1]}"]`);
          spot.append('X')
        }
        if (this.humanBoard[coords[0]][coords[1]] === 'O') {
          const spot = document.querySelector(`.human[data-coords="${coords[0]},${coords[1]}"]`);
          spot.append('O')
        }
      },

      statusOfGame() {
        if (this.human.gameLoss() === true) {
          this.disabled = true
          this.playerLose = true
          this.status = 'ALL OF YOUR SHIPS HAVE BEEN SUNK! YOU LOSE!'
          this.seen = true
        } else if (this.bot.gameLoss() === true) {
          this.disabled = true
          this.botLose = true
          this.status = 'YOU SUNK ALL ENEMY SHIPS! YOU WIN!'
          this.seen = true
        } else {
          return false
        }
      },

      randomBoatsHuman() {
        this.human = gameBoard(10)
        this.humanBoard = this.human.getBoard()
        this.human.clearShips()
        this.human.placeShipRandomly(5)
        this.human.placeShipRandomly(4)
        this.human.placeShipRandomly(3)
        this.human.placeShipRandomly(3)
        this.human.placeShipRandomly(2)
      },

      randomBoatsBot() {
        this.bot.placeShipRandomly(5)
        this.bot.placeShipRandomly(4)
        this.bot.placeShipRandomly(3)
        this.bot.placeShipRandomly(3)
        this.bot.placeShipRandomly(2)
      },

      startGame() {
        this.hide = false
        this.status = ''
        this.disabled = false
      },

      eraseBoard() {
        let erase = document.getElementsByClassName("box")
        Array.from(erase).forEach(x => x.innerHTML = '')
      },

      restartGame() {
        this.disabled = false
        this.hide = true
        this.seen = false
        this.status =
          'Drag your ships onto your board, or randomize the placement! Click on the Bot Board to begin after setting your ship!'
        //establish new Board
        this.human = gameBoard(10)
        this.humanBoard = this.human.getBoard()
        this.bot = gameBoard(10)
        this.botBoard = this.bot.getBoard()
        this.randomBoatsBot()
        this.eraseBoard()
      },

      flipShipPiece(e) {
        const ship = e.currentTarget
        const isHorizontal = ship.dataset.position
        const pos = isHorizontal === 'x' ? 'y' : 'x'
        ship.dataset.position = pos;
        ship.style['grid-auto-flow'] = pos === 'x' ? 'row' : 'column';
      },

      //DRAG AND DROP FUNCTIONS
      drop(e) {
        const coordData = (e.target.dataset.coords).split(',').map(x => Number(x))
        let allShips = document.querySelectorAll(".boatPiece")
        let ships = Array.from(allShips)
        ships.forEach(x => x.addEventListener('dragStart', this.dragStart))
        ships.forEach(x => x.addEventListener('click', this.flipShipPiece))
        document.querySelector(`.human[data-coords="${coordData[0]},${coordData[1]}"]`).append(this.draggedShip)
        this.draggedShip = null
      },

      dragStart(e) {
        const isHorizontal = e.target.dataset.position
        const length = e.target.dataset.length
        this.draggedShip = e.target
        console.log(this.draggedShip)
        console.log(isHorizontal)
        console.log(length)
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
      this.randomBoatsBot()
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

  .shipBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 350px;
    height: 350px;
    align-items: center;
    margin: 25px;
  }

  .cell {
    width: 60px;
    height: 60px;
    border: 1px solid black;
    background: darkgreen;
    z-index: 1;
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

  .boardDetails {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gameOver {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 50px;
    align-self: center;
    width: 600px;
    line-height: 1.2;
  }

  .reset {
    width: 50%;
    font-size: 20px;
  }

  .box {
    width: 60px;
    height: 60px;
    border: 1px solid red;
    color: white;
    font-size: 50px;
  }

  .pc {
    cursor: crosshair;
  }

  .disabled {
    pointer-events: none;
  }

  .xcoord {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 60px;
    color: white;
    font-size: 50px;
  }

  .ycoord {
    display: flex;
    justify-content: space-evenly;
    height: 60px;
    color: white;
    font-size: 50px;
    width: 650px;
    margin-left: 60px;
  }

  .gameButtons {
    display: flex;
  }

  .gameSetup {
    font-size: 14px;
    padding: 5px 10px;
    height: 30px;
    margin: 10px;
  }

  .overlay {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
  }

  .boatPiece {
    display: grid;
    grid-auto-flow: column;
    cursor: move;
    z-index: 69;
  }
</style>