import React from 'react'
import './Square.css'

function Square(props) {
    return (
        <div className="Square" data-row={props.row} data-col={props.col}>
            {props.xoro}
        </div>
    )
}

export default Square;