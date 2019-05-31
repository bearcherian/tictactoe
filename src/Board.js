import React, {useState} from 'react';
import './Board.css'
import Row from './Row';
import Winner from './Winner';

function Board(props) {

    const playerX = "X";
    const playerO = "O";
    
    const generateInitialSquares = function() {

        const initialSquares = [];
        for (let i = 0; i < props.gridSize; i++) {
            let row = [];
            for (let j = 0; j < props.gridSize; j++) {
                row[j] = ""
            }
            initialSquares[i] = row;
        }
         return initialSquares
    }
    const [squares, setSquares] = useState(generateInitialSquares());
    const [currentPlayer, setCurrentPlayer] = useState(playerX);
    const [winner, setWinner] = useState({hasWinner: false, winner: ""})

    const togglePlayer = function(){
        if (currentPlayer === playerX) {
            setCurrentPlayer(playerO);
        } else {
            setCurrentPlayer(playerX);
        }
    }

    const clickHandler = function(e) {
        if (winner.hasWinner) {
            return;
        }
        let target = e.target;

        if (target.className === "Square") {
            let row = target.dataset.row;
            let col = target.dataset.col;

            if (squares[row][col] === "") {
                squares[row][col] = currentPlayer;
                setSquares(squares)
                if (checkBoardForWinner()) {
                    setWinner({hasWinner: true, winner: currentPlayer});
                } else {
                    togglePlayer()
                }
            }
        
            
        }
    }

    const checkColsForWinner = function() {
        // column
        for (let i = 0; i< props.gridSize; i++) {
            let matches = 0;
            // row
            for (let j = 0; j < props.gridSize-1; j++) {
                
                // skip if empty
                if (squares[j][i] === "") {
                    continue;
                }

                // add match for first
                if (j === 0) {
                    matches++;
                }

                //check if next matches
                if (squares[j][i] === squares[j+1][i]) {
                    matches++
                } else {
                    break;
                }
            }

            if (matches === props.gridSize*1) {
                return true;
            }
        }

        return false;
    }

    const checkRowsForWinner = function() {
        for (let i = 0; i< squares.length; i++) {
            let row = squares[i];
            // let val = row[0];

            let matches = 0;
            for (let j = 0; j < row.length-1; j++) {
                if (row[j] === "") {
                    continue;
                }

                // if we're at col 1, it matches itself
                if (j === 0) {
                    matches++;
                }

                // check if the next col matches
                if (row[j] === row[j+1]) {
                    matches++;
                } else {
                    // break if no match. no point in continuing
                    break;
                }

            }

            if (matches === row.length) {
                return true;
            }
        }

        return false;
    }

    const checkDiagsForWinner = function() {

        return checkDiagTopToBottom() || checkDiagBottomToTop()
    }

    const checkDiagTopToBottom = function() {
        let val = squares[0][0];
        if (val === "") {
            return false
        }
        
        for(let i = 1; i < props.gridSize; i++) {
    
            if (val !== squares[i][i]) {
                return false;
            }

        }
        return true;
    }

    const checkDiagBottomToTop = function() {
        let maxI = props.gridSize-1
        let firstVal = squares[maxI][0]
        if (firstVal === "") {
            return false;
        }
        for (let i = 1; i < props.gridSize; i++) {
            let rowI = maxI-i 
            if (firstVal !== squares[rowI][i]) {
                return false;
            }
        }

        return true
    }
    const checkBoardForWinner = function() {
        return checkRowsForWinner() || checkColsForWinner() || checkDiagsForWinner();
    }

    const resetClickHandler = function() {
        setCurrentPlayer(playerX);
        setSquares(generateInitialSquares());
        setWinner({hasWinner: false, winner: ""});
    }


    return (
        <div className="Board" onClick={clickHandler}>
            {(() => {
                const rows = []
                for (let i = 0; i < squares.length; i++) {
                    rows.push(<Row key={i} squares={squares[i]} rowNum={i}/>)
                }
                return rows;
            })()}
            <Winner hasWinner={winner.hasWinner} winner={winner.winner}/>
            <div className="reset-container">
                <button className="reset-button" onClick={resetClickHandler} type="button">Reset</button>
            </div>
        </div>
    )

}

export default Board;