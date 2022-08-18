var TARGET_CLASS = 'sudoku_field';
var CELL_COLOR = 'rgba(175, 235, 238, 0.56)';

var tables = document.body.getElementsByTagName( 'table' );
for( var i = 0; i < tables.length; i++ )
{
    if( tables[ i ].className.indexOf( TARGET_CLASS ) != -1 )
    {
        AttachHighlighting( tables[ i ] );
    }
}


function AttachHighlighting( table )
{
    for( var i = 0; i < table.rows.length; i++ )
    {
        var cells = table.rows[ i ].cells;
        for( var k = 0; k < cells.length; k++ )
        {
            var cell = cells[ k ];
            if( cell.tagName != 'TH' )
            {
                cell.onmouseover = function()
                {
                    var row = this.parentNode;
                    var table = row.parentNode.parentNode;
                    var cols = table.getElementsByTagName( 'col' );
                    var num_col = 0;
                    var num_row = 0;

                    // Attach color in col
                    for( var i = 0; i < row.cells.length; i++ )
                    {
                        if (row.cells[ i ] == this)
                        {
                          cols[ i ].style.backgroundColor = CELL_COLOR;
                          num_col = i;
                        } else {
                          cols[ i ].style.backgroundColor = '';
                        }
                    }

                    // Attach color in row
                    for( var i = 0; i < table.rows.length; i++ )
                    {
                      if (table.rows[ i ] == row) {
                        table.rows[ i ].style.backgroundColor =  CELL_COLOR;
                        num_row = i;
                      } else {
                        table.rows[ i ].style.backgroundColor = '';
                      }
                    }

                    // Attach color in square
                    for (var i = 0; i < table.rows.length; i++)
                    {
                      for (var j = 0; j < table.rows[0].cells.length; j++)
                      {
                        if (Math.floor(num_row / 3) == Math.floor(i / 3) && Math.floor(num_col / 3) == Math.floor(j / 3)) {
                          table.rows[ i ].cells[ j ].style.backgroundColor =  CELL_COLOR;
                        } else {
                          table.rows[ i ].cells[ j ].style.backgroundColor =  '';
                        }
                      }
                    }

                }
            }
        }
    }


    var colgroups = table.getElementsByTagName( 'colgroup' );
    for( var i = 0; i < colgroups.length; i++ )
    {
        var colgroup = colgroups[ i ];
        var cols = colgroup.getElementsByTagName( 'col' );

        for( var k = cols.length; k < colgroup.span; k++ )
        {
            var col = document.createElement( 'col' );
            colgroup.appendChild( col );
        }
    }


    table.onmouseout = function()
    {
        var cols = this.getElementsByTagName( 'col' );
        for( var i = 0; i < cols.length; i++ )
        {
            cols[ i ].style.backgroundColor = '';
        }

        for( var i = 0; i < this.rows.length; i++ )
        {
            this.rows[ i ].style.backgroundColor = '';
        }

        for (var i = 0; i < table.rows.length; i++)
        {
          for (var j = 0; j < table.rows[0].cells.length; j++)
          {
            table.rows[ i ].cells[ j ].style.backgroundColor =  '';
          }
        }
        
    }
}
