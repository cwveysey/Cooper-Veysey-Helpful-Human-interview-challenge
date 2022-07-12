import * as React from 'react';
import './Sidebar.css';
import TestId from './TestId.js';

const colorGroups = [
    {"name": "Red" }, 
    {"name": "Orange"},
    {"name": "Yellow"},
    {"name": "Green"},
    {"name": "Blue"},
    {"name": "Purple"},
    {"name": "Brown"},
    {"name": "Gray"}
];

function Sidebar(props) {

    const handleClick = (color_name) => {
        props.onColorGroupClick(color_name);        
    };
    
    return (
        <div>
            <button className="Random_color_button" onClick={() => handleClick(colorGroups[colorGroups.length * Math.random() | 0].name)} data-testid={TestId.Random_color_button_TestId}>Random Color</button>
            <ol className="Color_group_ordered_list">
                {colorGroups.map((colorGroup) => {
                    return <li className="Color_group_list_item" key={colorGroup.name} onClick={() => handleClick(colorGroup.name)} data-testid={TestId.Color_group_list_item_TestId}>{colorGroup.name}</li>
                })}
            </ol>
        </div>
    )
}

export default Sidebar
