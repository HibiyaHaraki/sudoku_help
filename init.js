init_sudoku_help();

// Initialize
function init_sudoku_help()
{
  // Sudoku map
  for (let i = 0; i < sudoku_num; i++)
  {
    for (let j = 0; j < sudoku_num; j++)
    {
      document.getElementById(String(i*sudoku_num+j)).style.backgroundColor = DEFAULT_COLOR;
    }
  }

  // Explanation
  document.getElementById("information").innerHTML = "値を入れて, 下のボタンを押してください";
  document.getElementById("information").style.backgroundColor = DEFAULT_COLOR;

  // Colorbar
  colorbar_table = document.getElementById(String("colorbar"));
  for (let i = 0; i < colorbar_table.rows[0].cells.length; i++)
  {
    colorbar_table.rows[0].cells[i].style.backgroundColor = "rgba(" + COLORMAP[i][0] + "," + COLORMAP[i][1] + "," + COLORMAP[i][2] + "0.5)";
  }
  colorbar_table.style.display = "none";
}
