// Constants
const sudoku_num = 9;
const max_color = 255;

// Color Data
var HINT_COLOR = 'rgba(104, 232, 140, 0.5)';
var WARNING_COLOR = 'rgba(236, 32, 32, 0.7)';
var DEFAULT_COLOR = 'rgba(255,255,255,0)';

var COLORMAP = [[  0,  0,132],
                [  0,  0,243],
                [  0,102,255],
                [  0,215,255],
                [ 72,255,183],
                [187,255, 68],
                [255,211,  0],
                [255,100,  0],
                [239,  0,  0],
                [128,  0,  0]];

// Create variable for sudoku data
var SUDOKU = new Array(sudoku_num);
for(let i = 0; i < sudoku_num; i++) {
  SUDOKU[i] = new Array(sudoku_num).fill(0);
}
