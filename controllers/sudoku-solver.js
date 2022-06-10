class SudokuSolver {
  getCoordinateToIndex(row, column)
  {
    let result = -1;
    switch (row)
    {
      case "A":
        return result += 1 * column;
      case "B":
        return result += 2 * column;
      case "C":
        return result += 3 * column;
      case "D":
        return result += 4 * column;
      case "E":
        return result += 5 * column;
      case "F":
        return result += 6 * column;
      case "G":
        return result += 7 * column;
      case "H":
        return result += 8 * column;
      case "I":
        return result += 9 * column;
    }
  }

  rowNumberToRow(row)
  {
    switch (row)
    {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "G";
      case 7:
        return "H";
      case 8:
        return "I";
    }
  }

  validate(puzzleString) {
    puzzleString.forEach(function(value, index) {
      //Get row & column for each index
      let row, column
      column = index % 0 + 1;

      let i = index, noOfLoop = 0;
      while (i > 9)
      {
        i = i - 9;
        noOfLoop++;
      }

      switch (noOfLoop)
      {
        case 0:
          row = "A";
          break;
        case 1:
          row = "B";
          break;
        case 2:
          row = "C";
          break;
        case 3:
          row = "D";
          break;
        case 4:
          row = "E";
          break;
        case 5:
          row = "F";
          break;
        case 6:
          row = "G";
          break;
        case 7:
          row = "H";
          break;
        case 8:
          row = "I";
          break;
      }

      if (!checkRowPlacement(puzzleString, row, column, puzzleString[index])) return false;
      if (!checkColPlacement(puzzleString, row, column, puzzleString[index])) return false;
      if (!checkRegionPlacement(puzzleString, row, column, puzzleString[index])) return false;
    });

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    /* Row related index:
     A: 0-8 B: 9-17 C: 18-26 
     D: 27-35 E: 36-44 F: 45-53
     G: 54-62 H: 63-71 I: 72-80
    */
   
    //Get current value index
    let currentIndex = this.getCoordinateToIndex(row, column);
    let checkIndexs;
    //Get whole row index
    switch (row)
    {
      case "A":
        checkIndexs = [0,1,2,3,4,5,6,7,8];
      break;
      case "B":
        checkIndexs = [9,10,11,12,13,14,15,16,17];
      break;
      case "C":
        checkIndexs = [18,19,20,21,22,23,24,25,26];
      break;
      case "D":
        checkIndexs = [27,28,29,30,31,32,33,34,35];
      break;
      case "E":
        checkIndexs = [36,37,38,39,40,41,42,43,44];
      break;
      case "F":
        checkIndexs = [45,46,47,48,49,50,51,52,53];
      break;
      case "G":
        checkIndexs = [54,55,56,57,58,59,60,61,62];
      break;
      case "H":
        checkIndexs = [63,64,65,66,67,68,69,70,71];
      break;
      case "I":
        checkIndexs = [72,73,74,75,76,77,78,79,80];
      break;
    }

    for (let i = 0; i < 9; i++ )
    {
      if (checkIndexs[i] === currentIndex) continue;
      if (puzzleString[checkIndexs[i]] === value) return false;
    }

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    /* Column realted index:
      1: 0,9,18,27,36,45,54,63,72
      2: 1,10,19,28,37,46,55,64,73
      3: 2,11,20,29,38,47,56,65,74
      4: 3,12,21,30,39,48,57,66,75
      5: 4,13,22,31,40,49,58,67,76
      6: 5,14,23,32,41,50,59,68,77
      7: 6,15,24,33,42,51,60,69,78
      8: 7,16,25,34,43,52,61,70,79
      9: 8,17,26,35,44,53,62,71,80
    */

    //Get current value index
    let currentIndex = this.getCoordinateToIndex(row, column);
    let checkIndexs;
    //Get whole column index
    switch (column)
    {
      case "A":
        checkIndexs = [0,9,18,27,36,45,54,63,72];
      break;
      case "B":
        checkIndexs = [1,10,19,28,37,46,55,64,73];
      break;
      case "C":
        checkIndexs = [2,11,20,29,38,47,56,65,74];
      break;
      case "D":
        checkIndexs = [3,12,21,30,39,48,57,66,75];
      break;
      case "E":
        checkIndexs = [4,13,22,31,40,49,58,67,76];
      break;
      case "F":
        checkIndexs = [5,14,23,32,41,50,59,68,77];
      break;
      case "G":
        checkIndexs = [6,15,24,33,42,51,60,69,78];
      break;
      case "H":
        checkIndexs = [7,16,25,34,43,52,61,70,79];
      break;
      case "I":
        checkIndexs = [8,17,26,35,44,53,62,71,80];
      break;
    }

    for (let i = 0; i < 9; i++ )
    {
      if (checkIndexs[i] === currentIndex) continue;
      if (puzzleString[checkIndexs[i]] === value) return false;
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
  /* Region realted index:
    ABC1-3: 0,1,2,9,10,11,18,19,20 ABC4-6: 3,4,5,12,13,14,21,22,23 ABC7-9: 6,7,8,15,16,17,24,25,26
    DEF1-3: 27,28,29,36,37,38,45,46,47 DEF4-6: 30,31,32,39,40,41,48,49,50 DEF7-9: 33,34,35,42,43,44,51,52,53
    GHI1-3: 54,55,56,63,64,65,72,73,74 GHI4-6: 57,58,59,66,67,68,75,76,77 GHI7-9: 60,61,62,69,70,71,78,79,80
  */

    let currentIndex = this.getCoordinateToIndex(row, column);
    let checkIndexs;
    if (row === "A" || row === "B" || row === "C") {
      if (column <= 3 ) {
        checkIndexs = [0,1,2,9,10,11,18,19,20];
      } 
      else if (column <= 6 ) {
        checkIndexs = [3,4,5,12,13,14,21,22,23];
      }
      else {
        checkIndexs = [6,7,8,15,16,17,24,25,26];
      }
    } 
    else if (row === "D" || row === "E" || row === "F") {
      if (column <= 3 ) {
        checkIndexs = [27,28,29,36,37,38,45,46,47];
      } 
      else if (column <= 6 ) {
        checkIndexs = [30,31,32,39,40,41,48,49,50];
      }
      else {
        checkIndexs = [33,34,35,42,43,44,51,52,53];
      }
    }
    else if (row === "G" || row === "H" || row === "I") {
      if (column <= 3 ) {
        checkIndexs = [54,55,56,63,64,65,72,73,74];
      } 
      else if (column <= 6 ) {
        checkIndexs = [57,58,59,66,67,68,75,76,77];
      }
      else {
        checkIndexs = [60,61,62,69,70,71,78,79,80];
      }
    }

    for (let i = 0; i < 9; i++ )
    {
      if (checkIndexs[i] === currentIndex) continue;
      if (puzzleString[checkIndexs[i]] === value) return false;
    }
  }

  //Using backtracking aka Brute-force search to solve the sudoku;
  //Reference: https://stackoverflow.com/questions/62309734/sudoku-solver-with-javascript
  solve(puzzleString) {
    for (let row = 0; row < 9; row++ )
    {
      for (let col = 0; col < 9; col++ )
      {
        if (puzzleString[this.getCoordinateToIndex(this.rowNumberToRow(row), col)] === ".")
        {
          //Check from 1-9 if ok, apply the value then loop
          for (let i = 1; i <= 9; i++ )
          {

            if (this.checkColPlacement(puzzleString, this.rowNumberToRow(row), col, i) &&
              this.checkRowPlacement(puzzleString, this.rowNumberToRow(row), col, i) &&
              this.checkRegionPlacement(puzzleString, this.rowNumberToRow(row), col,i))
              {
                puzzleString[this.getCoordinateToIndex(this.rowNumberToRow(row),col)] = i;
                if (this.solve(puzzleString)) return puzzleString;
              }

              puzzleString[this.getCoordinateToIndex(this.rowNumberToRow(row),col)] = ".";
              return false;
          }          
        }
      }
    }
  }
}

module.exports = SudokuSolver;

