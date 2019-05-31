import React from 'react'
import Square from './Square';
import './Row.css'

function Row(props) {

    return (
        <div className="Row" data-row={props.rowNum}>
        {(() => {
            const squares = []
            if (props.squares !== "undefined") {
                for (let i = 0; i < props.squares.length; i++) {
                    squares.push(<Square key={i} xoro={props.squares[i]} row={props.rowNum} col={i}/>)
                }
            }

            return squares;
        })()}
        </div>
    )
}

export default Row