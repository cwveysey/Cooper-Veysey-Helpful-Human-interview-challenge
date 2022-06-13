import * as React from 'react';
import './ColorGridSwatch.css';

export default function ColorGridSwatch(props) {
    let color = props.color;
    console.log(`ColorGridSwatch color is ${JSON.stringify(props)}`);
    let hex_code_string = '#' + color.hex_code;
    return (
        <div className="ColorGridSwatch-container">
            <div className="color-square" style={{ backgroundColor: hex_code_string}}></div>
            <div className="hex-code-container">
                {hex_code_string}
            </div>
        </div>
    );
}