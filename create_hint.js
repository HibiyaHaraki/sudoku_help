// Function for getting latest sudoku information
function get_sudoku_info()
{
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
}

// Function for counting valuable numbers in SUDOKU
function valNum_counter()
{
  // Count valuable numbers
  var valNum_counter = 0;
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      if (SUDOKU[i][j] > 0 && SUDOKU[i][j] < sudoku_num+1)
      {
        valNum_counter += 1;
      }
    }
  }
  return valNum_counter;
}

// Change the explanation
function explanation(ref_num,error_num)
{
  if (valNum_counter() > 0)
  {
    // Change information
    if (ref_num > 0)
    {
      document.getElementById("information").innerHTML = ref_num+"が入る可能性を示しています";
      document.getElementById("information").style.backgroundColor = HINT_COLOR;
    } else {
      document.getElementById("information").innerHTML = "入る可能性のある数字の個数を示しています";
      document.getElementById("information").style.backgroundColor = DEFAULT_COLOR;
    }
    if (error_num > 0)
    {
      document.getElementById("warning").innerHTML = error_num+"個の間違いがあります";
      document.getElementById("warning").style.backgroundColor = WARNING_COLOR;
    } else {
      document.getElementById("warning").innerHTML = "";
      document.getElementById("warning").style.backgroundColor = DEFAULT_COLOR;
    }
  }
}

// Find and show warning cells
function find_show_warning()
{
  // Set variables
  var error_col = [];
  var error_row = [];

  // Check Warning
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      if (SUDOKU[i][j] > 0)
      {
        if (judge_possibility(SUDOKU,i,j,SUDOKU[i][j]) > 3)
        {
          error_col.push(i);
          error_row.push(j);
        }
      }
    }
  }

  // Show Warning
  for (let i = 0; i < error_col.length; i++)
  {
    document.getElementById(String(error_col[i]*sudoku_num+error_row[i])).style.backgroundColor = WARNING_COLOR;
  }

  return error_col.length;
}

// Function for judge possibility
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

// Function Create hints
function create_hint(ref_num)
{
  // Initialize Field
  init_sudoku_help();

  // Get Sudoku information
  get_sudoku_info();

  // Create Hint (according to ref_num)
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
          }
      }
    }
  }

  // Find and Show warning cells
  error_num = find_show_warning();

  // Change explanation
  explanation(ref_num,error_num);
}

// Function for creating counters
function create_count()
{
  // Initialize Field
  init_sudoku_help();

  // Get Sudoku information
  get_sudoku_info();

  // Create Count
  var counter = 0
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      counter = 0;
      // Check Possibility
      if (SUDOKU[i][j] == 0)
      {
        for (let k = 1; k <= sudoku_num; k++)
        {
          if (judge_possibility(SUDOKU,i,j,k) < 1)
          {
            counter += 1;
          }
        }
        // Attach Color
        document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = "rgba(" + COLORMAP[counter][0] + "," + COLORMAP[counter][1] + "," + COLORMAP[counter][2] + "0.5)";
      }
    }
  }

  // Show colorbar
  document.getElementById(String("colorbar")).style.display = "";

  // Find and Show warning cells
  error_num = find_show_warning();

  // Change explanation
  explanation(-1,error_num);
}
