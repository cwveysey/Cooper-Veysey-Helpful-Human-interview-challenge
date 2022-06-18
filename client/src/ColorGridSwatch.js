import * as React from 'react';
import './ColorGridSwatch.css';

export default function ColorGridSwatch(props) {
    let color = props.color;
    let hex_code_string = ('#' + color.hex_code).toLowerCase();
    const handleClick = () => {
        props.onColorGridSwatchClick(props.color);
    };

    return (
        <div className="ColorGridSwatch-container" onClick={() => handleClick()}>
            <div className="color-square" style={{ backgroundColor: hex_code_string}}></div>
            <div className="hex-code-container">
                {hex_code_string}
            </div>
        </div>
    );
}