export default {
  methods: {
    set_stone(x, y) {
      if (this.can_put_here(x, y)) {
        this.board[x][y] = this.turn_wb;
        this.board.push();

        this.directions.forEach(d => {
          if (this.check_direction(x, y, d[0], d[1])) {
            this.reverse_around(x, y, d[0], d[1]);
          }
        });
        this.turn_wb = -1 * this.turn_wb;
      }
    },

    // (x, y)が盤面の内側か
    is_inside(x, y) {
      if (0 <= x && x < 8 && 0 <= y && y < 8) {
        return true;
      } else {
        return false;
      }
    },

    // (x, y)のマスに石を置くことができるか
    can_put_here(x, y) {
      let puttable = false;
      if (this.board[x][y] != this.NONE) {
        return puttable; // すでに石が置かれてたら置けない
      }

      this.directions.forEach(d => {
        if (this.check_direction(x, y, d[0], d[1])) {
          puttable = true;
        }
      });
      return puttable;
    },

    // (x, y)マスの(dx, dy)の方向に裏返せる石が存在するかどうか
    // たしかCMPの資料から引用したやり方？
    check_direction(x, y, dx, dy) {
      if (!this.is_inside(x + dx, y + dy)) {
        return false;
      }

      if (this.board[x + dx][y + dy] == this.NONE) {
        return false;
      } else if (this.board[x + dx][y + dy] != this.turn_wb) {
        return this.check_direction_sub(x + dx, y + dy, dx, dy);
      } else {
        return false;
      }
    },

    check_direction_sub(x, y, dx, dy) {
      if (!this.is_inside(x + dx, y + dy)) return false;

      if (this.board[x + dx][y + dy] == this.NONE) {
        return false;
      } else if (this.board[x + dx][y + dy] != this.turn_wb) {
        return this.check_direction_sub(x + dx, y + dy, dx, dy);
      } else if (this.board[x + dx][y + dy] == this.turn_wb) {
        return true;
      } else {
        return false;
      }
    },

    // 石を裏返す
    reverse_around(x, y, dx, dy) {
      if (!this.is_inside(x + dx, y + dy)) return;
      if (this.board[x + dx][y + dy] != this.turn_wb) {
        this.board[x + dx][y + dy] = this.turn_wb;
        x = x + dx;
        y = y + dy;
        this.reverse_around(x, y, dx, dy);
      }
    },

  },

  computed: {
    black_stones() {
      return this.board.flat().filter(s => s == 1).length;
    },
    white_stones() {
      return this.board.flat().filter(s => s == -1).length;
    },
    player_turn() {
      return this.turn_wb == 1 ? "BLACK" : "WHITE";
    }
  }
};
