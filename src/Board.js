import React, {useState} from 'react';
import './Board.css'
import Row from './Row';
import Winner from './Winner';
import BoardLogic from './BoardLogic';

function Board(props) {
    const playerX = "X";
    const playerO = "O";    
    const logic = new BoardLogic();
    
    const [gridSize, setGridSize] = useState(3)
    const [currentPlayer, setCurrentPlayer] = useState(playerX);
    const [winner, setWinner] = useState({hasWinner: false, winner: ""})
    const [squares, setSquares] = useState(logic.generateSquares(gridSize));
    

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
                if (logic.checkBoardForWinner(squares)) {
                    setWinner({hasWinner: true, winner: currentPlayer});
                } else {
                    togglePlayer()
                }
            }
        
            
        }
    }

    

    const resetClickHandler = function() {
        setCurrentPlayer(playerX);
        setSquares(logic.generateSquares(gridSize));
        setWinner({hasWinner: false, winner: ""});
    }

    const gridSizeChange = function(event) {
        setGridSize(event.target.value);
      }

    return (
        <div className="Board" onClick={clickHandler}>
            <div className="reset-container">
                Grids: <input type="number" value={gridSize} onChange={gridSizeChange}/>
                <button className="reset-button" onClick={resetClickHandler} type="button">Reset</button>
            </div>
            {(() => {
                const rows = []
                for (let i = 0; i < squares.length; i++) {
                    rows.push(<Row key={i} squares={squares[i]} rowNum={i}/>)
                }
                return rows;
            })()}
            <Winner hasWinner={winner.hasWinner} winner={winner.winner}/>
        </div>
    )

}

export default Board;