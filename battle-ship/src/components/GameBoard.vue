<template>
<div class="main">
  <h1> {{ title }} </h1>
  <div class="playarea">
    <div class="gameboard">
      <div v-for="(row, rowindex) in playerBoard" :key="rowindex">
        <div class="box" v-for="(col, colindex) in playerBoard" :key="rowindex-colindex"></div>    
      </div>
    </div>
    <div class="gameboard">
      <div v-for="(row, rowindex) in playerBoard" :key="rowindex">
        <div class="box" v-for="(col, colindex) in playerBoard" :key="rowindex-colindex"></div>     
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { gameBoard } from './Factories/Gameboard'

export default {
  name: 'GameBoard',
  data() {
    return {
      playerBoard: '',
      title: 'BATTLESHIP'
    }
  },
  methods: {
    createBoard: function() {
      let humanBoard= gameBoard(10)
      this.playerBoard= humanBoard.getBoard()
      console.log(this.playerBoard)
    }
  },
  beforeMount() {
    this.createBoard()
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
}
</style>
