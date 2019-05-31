function BoardLogic() {
    
    this.generateSquares = function(gridSize) {

        const initialSquares = [];
        for (let i = 0; i < gridSize; i++) {
            let row = [];
            for (let j = 0; j < gridSize; j++) {
                row[j] = ""
            }
            initialSquares[i] = row;
        }
         return initialSquares
    }

    const checkColsForWinner = function(squares) {
        const gridSize = squares.length;
        // column
        for (let i = 0; i< gridSize; i++) {
            let matches = 0;
            // row
            for (let j = 0; j < gridSize-1; j++) {
                
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

            if (matches === gridSize*1) {
                return true;
            }
        }

        return false;
    }

    const checkRowsForWinner = function(squares) {
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

    const checkDiagsForWinner = function(squares) {

        return checkDiagTopToBottom(squares) || checkDiagBottomToTop(squares)
    }

    const checkDiagTopToBottom = function(squares) {
        const gridSize = squares.length;
        let val = squares[0][0];
        if (val === "") {
            return false
        }
        
        for(let i = 1; i < gridSize; i++) {
    
            if (val !== squares[i][i]) {
                return false;
            }

        }
        return true;
    }

    const checkDiagBottomToTop = function(squares) {
        const gridSize = squares.length;
        let maxI = gridSize-1
        let firstVal = squares[maxI][0]
        if (firstVal === "") {
            return false;
        }
        for (let i = 1; i < gridSize; i++) {
            let rowI = maxI-i 
            if (firstVal !== squares[rowI][i]) {
                return false;
            }
        }

        return true
    }
    this.checkBoardForWinner = function(squares) {
        return checkRowsForWinner(squares) || checkColsForWinner(squares) || checkDiagsForWinner(squares);
    }
}

export default BoardLogic 