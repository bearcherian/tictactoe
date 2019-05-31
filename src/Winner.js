import React from 'react'

function Winner(props) {

    let status = "no winner yet";
    if (props.hasWinner) {
        status = `We have a Winner! Congrats Player ${props.winner}!`;
    }
    return(
        <div className="winner-status">
            <p>{status}</p>
        </div>
    )
}

export default Winner