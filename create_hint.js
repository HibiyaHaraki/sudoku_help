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


colorbar_table = document.getElementById(String("colorbar"));
for (let i = 0; i < colorbar_table.rows[0].cells.length; i++)
{
  colorbar_table.rows[0].cells[i].style.backgroundColor = "rgba(" + COLORMAP[i][0] + "," + COLORMAP[i][1] + "," + COLORMAP[i][2] + "0.5)";
}
colorbar_table.style.display = "none";

// Create variable
var SUDOKU = new Array(sudoku_num);
for(let i = 0; i < sudoku_num; i++) {
  SUDOKU[i] = new Array(sudoku_num).fill(0);
}

function create_hint(ref_num)
{
  document.getElementById(String("colorbar")).style.display = "none";
  // Get Inputs
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      input_value = document.getElementById(String(i*sudoku_num+j)).value;
      for (let k = 1; k < 10; k++)
      {
        if (String(k) == input_value)
        {
          SUDOKU[i][j] = k;
          break;
        } else {
          SUDOKU[i][j] = 0;
        }
      }
    }
  }

  // Output field
  table = document.getElementById("sudoku_field");

  // Create Hint (according to ref_num)
  var error_col = [];
  var error_row = [];
  var valNum_counter = 0
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      // Check Possibility
      if (SUDOKU[i][j] == 0)
      {
        if (judge_possibility(SUDOKU,i,j,ref_num) < 1)
          {
            document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = HINT_COLOR;
          } else {
            document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = DEFAULT_COLOR;
          }
      } else {
        valNum_counter += 1;
        // Check Warning
        if (judge_possibility(SUDOKU,i,j,SUDOKU[i][j]) > 3)
        {
          error_col.push(i);
          error_row.push(j);
        } else {
          document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = DEFAULT_COLOR;
        }
      }
    }
  }

  for (let i = 0; i < error_col.length; i++)
  {
    document.getElementById(String(error_col[i]*sudoku_num+error_row[i])).style.backgroundColor = WARNING_COLOR;
  }

  // Change information
  document.getElementById("information").innerHTML = ref_num+"が入る可能性を示しています";
  document.getElementById("information").style.backgroundColor = HINT_COLOR;
  if (error_col.length > 0)
  {
    document.getElementById("warning").innerHTML = error_col.length+"個の間違いがあります";
    document.getElementById("warning").style.backgroundColor = WARNING_COLOR;
  } else {
    document.getElementById("warning").innerHTML = "";
    document.getElementById("warning").style.backgroundColor = DEFAULT_COLOR;
  }

  // Initialize
  if (valNum_counter == 0)
  {
    document.getElementById("information").innerHTML = "値を入れて, 下のボタンを押してください";
    document.getElementById("information").style.backgroundColor = DEFAULT_COLOR;
    for (let i = 0; i < sudoku_num**2; i++)
    {
      document.getElementById(String(i)).style.backgroundColor = DEFAULT_COLOR;
    }
  }

}

function create_count()
{
  document.getElementById(String("colorbar")).style.display = "";
  // Get Inputs
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      input_value = document.getElementById(String(i*sudoku_num+j)).value;
      for (let k = 1; k < 10; k++)
      {
        if (String(k) == input_value)
        {
          SUDOKU[i][j] = k;
          break;
        } else {
          SUDOKU[i][j] = 0;
        }
      }
    }
  }

  // Output field
  table = document.getElementById("sudoku_field");

  // Create Count
  var error_col = [];
  var error_row = [];
  var valNum_counter = 0;
  var counter = 0
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      counter = 0;
      for (let k = 1; k <= sudoku_num; k++)
      {
        // Check Possibility
        if (SUDOKU[i][j] == 0)
        {
          if (judge_possibility(SUDOKU,i,j,k) < 1)
            {
              counter += 1;
            } else {
              document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = DEFAULT_COLOR;
            }
        }
      }
      // Attach Color
      document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = "rgba(" + COLORMAP[counter][0] + "," + COLORMAP[counter][1] + "," + COLORMAP[counter][2] + "0.5)";

      // Check Warning
      if (SUDOKU[i][j] > 0) {
        valNum_counter += 1;
        if (judge_possibility(SUDOKU,i,j,SUDOKU[i][j]) > 3)
        {
          error_col.push(i);
          error_row.push(j);
        } else {
          document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = DEFAULT_COLOR;
        }
      }
    }
  }

  for (let i = 0; i < error_col.length; i++)
  {
    document.getElementById(String(error_col[i]*sudoku_num+error_row[i])).style.backgroundColor = WARNING_COLOR;
  }

  // Change information
  document.getElementById("information").innerHTML = "入る可能性のある数字の個数を示しています";
  document.getElementById("information").style.backgroundColor = DEFAULT_COLOR;
  if (error_col.length > 0)
  {
    document.getElementById("warning").innerHTML = error_col.length+"個の間違いがあります";
    document.getElementById("warning").style.backgroundColor = WARNING_COLOR;
  } else {
    document.getElementById("warning").innerHTML = "";
    document.getElementById("warning").style.backgroundColor = DEFAULT_COLOR;
  }

  // Initialize
  if (valNum_counter == 0)
  {
    document.getElementById("information").innerHTML = "値を入れて, 下のボタンを押してください";
    document.getElementById("information").style.backgroundColor = DEFAULT_COLOR;
    for (let i = 0; i < sudoku_num**2; i++)
    {
      document.getElementById(String(i)).style.backgroundColor = DEFAULT_COLOR;
    }
  }
}

function judge_possibility(field,col,row,ref_num)
{
  var judge = 0;
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      // Check row
      if (i == col && field[i][j] == ref_num)
      {
        judge += 1;
      }

      // Check col
      if (j == row && field[i][j] == ref_num)
      {
        judge += 1;
      }

      // Check square
      if (Math.floor(i/3) == Math.floor(col/3) && Math.floor(j/3) == Math.floor(row/3) && field[i][j] == ref_num)
      {
        judge += 1;
      }
    }
  }
  // Outpout
  return judge;
}
