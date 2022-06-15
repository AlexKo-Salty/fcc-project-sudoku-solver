'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  let puzzleRegex = /^[123456789.]$/;

  let coordinateRegex = /^[A-Ia-i][1-9]$/

  let valueRegex = /^[1-9]$/

  app.use(function(req, res, next) {
    console.log(req.body, req.originalUrl, req.method);
    next();
  })

  app.route('/api/check')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      if (!puzzleString || !coordinate || !value)
      {
        res.json({ "error": "Required field(s) missing" });
        return;
      }
      if (puzzleString.length !== 81)
      {
        res.json({ "error": "Expected puzzle to be 81 characters long" });
        return;
      }

      puzzleString = puzzleString.split('');

      if (puzzleString.some(v => !puzzleRegex.test(v)))
      {
        res.json({ "error": "Invalid characters in puzzle" });
        return;
      }
      if (!coordinateRegex.test(coordinate))
      {
        res.json({ "error": "Invalid coordinate" });
        return;
      }
      if (!valueRegex.test(value))
      {
        res.json({ "error": "Invalid value" });
        return;
      }

      let row = coordinate.split('')[0];
      let col = coordinate.split('')[1];
      let isRowVaild = solver.checkRowPlacement(puzzleString, row, col, value);
      let isColVaild = solver.checkColPlacement(puzzleString, row, col, value);
      let isRegionVaild = solver.checkRegionPlacement(puzzleString, row, col, value);

      if (isColVaild && isRowVaild && isRegionVaild)
      {
        res.json({ "valid": true });
        return;
      }
      else
      {
        let invailds = [];
        if (!isRowVaild) invailds.push("row");
        if (!isColVaild) invailds.push("column");
        if (!isRegionVaild) invailds.push("region");

        res.json({ "valid": false, "conflict": invailds});
        return;
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;

      if (!puzzleString)
      {
        res.json({ "error": "Required field missing" });
        return;
      }
      if (puzzleString.length !== 81)
      {
        res.json({ "error": "Expected puzzle to be 81 characters long" });
        return;
      }

      puzzleString = puzzleString.split('');

      if (puzzleString.some(v => !puzzleRegex.test(v)))
      {
        res.json({ "error": "Invalid characters in puzzle" });
        return;
      }

      let solvedPuzzle = solver.solve(puzzleString);
      if (!solvedPuzzle)
      {
        res.json({ "error": "Puzzle cannot be solved" });
        return;
      }
      else
      {
        res.json({ "solution": solvedPuzzle.join('')} )
        return;
      }
    });
};
