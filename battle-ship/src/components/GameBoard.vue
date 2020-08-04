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
          <button class="gameSetup start" v-if="hide" @click="startGame" :disabled="isDisabled"> Start Game</button>
        </div>
        <button class="reset" v-if="seen" @click="restartGame"> Restart</button>
      </div>
      <div>
        <div class="shipBox" v-if="hide">
          <div id="carrier" class="boatPiece 0" draggable="true" :data-length="5" data-position="y"
            @dragstart="onDragStart" @click="flipShipPiece">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div id="cruiser" class="boatPiece 1" draggable="true" :data-length="4" data-position="y"
            @dragstart="onDragStart" @click="flipShipPiece">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div id="battleship" class="boatPiece 2" draggable="true" :data-length="3" data-position="y"
            @dragstart="onDragStart" @click="flipShipPiece">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div id="submarine" class="boatPiece 3" draggable="true" :data-length="3" data-position="y"
            @dragstart="onDragStart" @click="flipShipPiece">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
          </div>
          <div id="patrolboat" class="boatPiece 4" draggable="true" :data-length="2" data-position="y"
            @dragstart="onDragStart" @click="flipShipPiece">
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
        isDisabled: true,
        shipPrePlacement: new Array(5),
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
        let ships= this.human.getShips()
        for(let i = 0; i < ships.length; i++) {
          const spot = document.querySelector(`.human[data-coords="${ships[i].coordinates[0][0]},${ships[i].coordinates[0][1]}"]`);
          if(ships[i].coordinates[0][0] === ships[i].coordinates[1][0]) {
            document.getElementsByClassName(`${i}`)[0].style['grid-auto-flow'] = 'column'
            spot.append(document.getElementsByClassName(`${i}`)[0]) 
          }else {
            document.getElementsByClassName(`${i}`)[0].style['grid-auto-flow'] = 'row'
            spot.append(document.getElementsByClassName(`${i}`)[0]) 
          }
        }
        this.isDisabled = false
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
        document.getElementsByClassName('boatPiece').forEach(x=> x.setAttribute('draggable',false));
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
        this.isDisabled = true
        //establish new Board
        this.human = gameBoard(10)
        this.humanBoard = this.human.getBoard()
        this.bot = gameBoard(10)
        this.botBoard = this.bot.getBoard()
        this.randomBoatsBot()
        this.eraseBoard()
      },

      //DRAG AND DROP FUNCTIONS
      flipShipPiece(e) {
        const ship = e.currentTarget
        const isVertical = ship.dataset.position
        const pos = isVertical === 'y' ? 'x' : 'y'
        ship.dataset.position = pos;
        ship.style['grid-auto-flow'] = pos === 'y' ? 'row' : 'column';
        this.shipValidator()
        this.allShipsPlaced()
      },

      drop(e) {
        let data = JSON.parse(e.dataTransfer.getData('text/plain'))
        const draggableElement = document.getElementById(data.id)
        const coordData = (e.target.dataset.coords).split(',').map(x => Number(x))
        if(data.id !== '') {
        if (data.position === 'x' && coordData[1] + data.length > this.humanBoard.length) {
          throw new Error('This is outside the gameboard')
        } else if (data.position === 'y' && coordData[0] + data.length > this.humanBoard.length) {
          throw new Error('This is outside the gameboard')
        }
        }

        let dropLocation = document.querySelector(`.human[data-coords="${coordData[0]},${coordData[1]}"]`)
        dropLocation.append(draggableElement)
        if (data.id === 'carrier') {
          this.shipPrePlacement[0] = JSON.stringify({
            data,
            coordData
          })
        }
        if (data.id === 'cruiser') {
          this.shipPrePlacement[1] = JSON.stringify({
            data,
            coordData
          })
        }
        if (data.id === 'battleship') {
          this.shipPrePlacement[2] = JSON.stringify({
            data,
            coordData
          })
        }
        if (data.id === 'submarine') {
          this.shipPrePlacement[3] = JSON.stringify({
            data,
            coordData
          })
        }
        if (data.id === 'patrolboat') {
          this.shipPrePlacement[4] = JSON.stringify({
            data,
            coordData
          })
        }
        e.dataTransfer.clearData();
        this.shipValidator()
        this.allShipsPlaced()
      },

      allShipsPlaced() {
        //this will allo start of game when box is empty, HOWEVER we need to keep disabled if ships are outside gameboard or are on top of one another
        let isEmpty = document.querySelector('.shipBox').innerHTML === ''
        if (isEmpty && this.human.getShips().length === 5) {
          this.isDisabled = false
        }else {
          this.isDisabled = true
        }
      },

      shipValidator() {
        this.human = gameBoard(10)
        this.humanBoard = this.human.getBoard()
        this.human.clearShips()
        for (let i = 0; i < this.shipPrePlacement.length; i++) {
          let tempData = JSON.parse(this.shipPrePlacement[i])
          let isHorizontal = tempData.data.position === 'x' ? true : false
          this.human.placeShip(tempData.data.length, tempData.coordData[0], tempData.coordData[1], isHorizontal)
        }
        this.allShipsPlaced()
      },

      onDragStart(e) {
        const position = e.target.dataset.position
        const length = +e.target.dataset.length
        const id = e.target.id
        if(e.target.id !== null) {
        e.dataTransfer.setData('text/plain', JSON.stringify({
          id,
          position,
          length
        }))
        }
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
    cursor: move;
    z-index: 69;
  }
</style>