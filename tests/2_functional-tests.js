const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = require('../controllers/puzzle-strings.js')

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('#1 - Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/solve')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0]
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.solution, puzzleStrings.puzzlesAndSolutions[0][1]);
            done();
         });
    });
    test('#2 - Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/solve')
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Required field missing");
            done();
         });
    });
    test('#3 - Solve a puzzle with invalid characters: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/solve')
         .send({
            puzzle: 'AA5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Invalid characters in puzzle" );
            done();
         });
    });
    test('#4 - Solve a puzzle with incorrect length: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/solve')
         .send({
            puzzle: '5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long" );
            done();
         });
    });
    test('#5 - Solve a puzzle that cannot be solved: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/solve')
         .send({
            puzzle: '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Puzzle cannot be solved" );
            done();
         });
    });
    test('#6 - Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "3"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.isTrue(res.body.valid);
            done();
         });
    });
    test('#7 - Check a puzzle placement with single placement conflict: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "8"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.isFalse(res.body.valid);
            assert.deepEqual(res.body.conflict, ["row"]);
            done();
         });
    });
    test('#8 - Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "1"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.isFalse(res.body.valid);
            assert.deepEqual(res.body.conflict, ["row", "region"]);
            done();
         });
    });
    test('#9 - Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "2"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.isFalse(res.body.valid);
            assert.deepEqual(res.body.conflict, ["row", "column", "region"]);
            done();
         });
    });
    test('#10 - Check a puzzle placement with missing required fields: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Required field(s) missing");
            done();
         });
    });
    test('#11 - Check a puzzle placement with invalid characters: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: 'AA5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            coordinate: "A2",
            value: "1"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
         });
    });
    test('#12 - Check a puzzle placement with incorrect length: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: '5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
            coordinate: "A2",
            value: "1"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
            done();
         });
    });
    test('#13 - Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "X2",
            value: "1"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Invalid coordinate");
            done();
         });
    });
    test('#14 - Check a puzzle placement with invalid placement value: POST request to /api/check', function(done){
        chai
         .request(server)
         .post('/api/check')
         .send({
            puzzle: puzzleStrings.puzzlesAndSolutions[0][0],
            coordinate: "A2",
            value: "X"
          })
         .end(function (err,res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');          
            assert.equal(res.body.error, "Invalid value");
            done();
         });
    });
});

