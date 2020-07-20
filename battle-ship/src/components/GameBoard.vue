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
      <div v-for="(row, rowindex) in botBoard" :key="rowindex">
        <div class="box" v-for="(col, colindex) in botBoard" :key="rowindex-colindex" @click="boxCoordinate(colindex, rowindex)"></div>     
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { beginGame } from './GameLoop/Game'


export default {
  name: 'GameBoard',
  data() {
    return {
      human: null,
      playerBoard: null,
      bot: null,
      botBoard: null,
      title: 'BATTLESHIP'
    }
  },
  methods: {
   boxCoordinate(colindex, rowindex) {
     this.human.playerMove(colindex, rowindex)
   }
  },
  beforeMount() {
    beginGame()
    this.playerBoard= beginGame()[0].getBoard()
    this.botBoard= beginGame()[1].getBoard()
    this.human=beginGame()[2]
    this.bot=beginGame()[3]
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
}
</style>
