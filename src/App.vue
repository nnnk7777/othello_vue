<template>
  <div
    class="flex flex-col lg:flex-row justify-center h-screen w-screen bg-indigo-100 mt-0 pb-10"
  >
    <div
      class="information flex justify-center items-center rounded shadow-lg bg-white m-20 w-1/2 mx-auto lg:mx-10 h-32 lg:h-64 lg:my-auto"
    >
      <div class=" flex flex-col">
        <p>black: {{ this.black_stones }}</p>
        <p>white: {{ this.white_stones }}</p>
        <p>{{ this.player_turn }}のターンです</p>
      </div>
    </div>

    <div
      class="board flex justify-center items-center w-board m-auto mt-0 lg:m-10 "
    >
      <div v-for="(n, x) in 8">
        <div
          v-for="(n, y) in 8"
          :class="{ highlight: can_put_here(x, y) }"
          class="bg-green-500 border border-black"
        >
          <div class="box" @click="set_stone(x, y)">
            <div
              :class="{ white: board[x][y] == -1, black: board[x][y] == 1 }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/mixins/utils.js";

export default {
  name: "othello",
  mixins: [utils],
  data() {
    return {
      NONE: 0,
      BLACK: 1,
      WHITE: -1,
      board: new Array(8),
      directions: [
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1]
      ],
      skip_count: 0,
      turn_wb: 1
    };
  },
  created() {
    for (let y = 0; y < 8; y++) {
      this.board[y] = new Array(8).fill(0);
    }
    this.board[3][3] = this.board[4][4] = this.WHITE;
    this.board[3][4] = this.board[4][3] = this.BLACK;
  }
};
</script>

<style lang="postcss">
.box {
  height: 40px;
  width: 40px;
  padding: 2px;
}
.white {
  height: 35px;
  width: 35px;
  border-radius: 35px;
  background-color: #fff;
}
.black {
  height: 35px;
  width: 35px;
  border-radius: 40px;
  background-color: #000;
}
.highlight {
  opacity: 0.5;
  background-color: #f00;
}
</style>
