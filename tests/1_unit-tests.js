const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const PuzzleStrings = require('../controllers/puzzle-strings.js')
let solver = new Solver;

suite('UnitTests', () => {
    test('#1 - Logic handles a valid puzzle string of 81 characters', function(){
        assert.isTrue(solver.isValidPuzzle(PuzzleStrings.puzzlesAndSolutions[0][0]))
    })
    test('#2 - Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(){
        assert.equal(solver.isValidPuzzle('AA5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'),
        "Invalid characters in puzzle")
    })
    test('#3 - Logic handles a puzzle string that is not 81 characters in length', function(){
        assert.equal(solver.isValidPuzzle('5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'),
        "Expected puzzle to be 81 characters long")
    })
    test('#4 - Logic handles a valid row placement', function(){
        assert.isTrue(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","3"))
    })
    test('#5 - Logic handles an invalid row placement', function(){
        assert.isFalse(solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","1"))
    })
    test('#6 - Logic handles a valid column placement', function(){
        assert.isTrue(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","3"))
    })
    test('#7 - Logic handles an invalid column placement', function(){
        assert.isFalse(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","1"))
    })
    test('#8 - Logic handles a valid region (3x3 grid) placement', function(){
        assert.isTrue(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","1"))
    })
    test('#9 - Logic handles an invalid region (3x3 grid) placement', function(){
        assert.isFalse(solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',"A","1","3"))
    })
    test('#10 - Valid puzzle strings pass the solver', function(){
        let testString = PuzzleStrings.puzzlesAndSolutions[0][1];
        assert.equal(solver.solve(testString), PuzzleStrings.puzzlesAndSolutions[0][1])
    })
    test('#11 - Invalid puzzle strings fail the solver', function(){
        let testString = '15.762984946381257728459613694517832812936745357824196473298561581673429269145378'
        assert.isFalse(solver.solve(testString.split('')))
    })
    test('#12 - Valid puzzle strings pass the solver', function(){
        let testString = PuzzleStrings.puzzlesAndSolutions[0][1];
        assert.equal(solver.solve(testString), PuzzleStrings.puzzlesAndSolutions[0][1])
    })
});
