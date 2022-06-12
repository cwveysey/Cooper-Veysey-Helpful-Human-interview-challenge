import * as React from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

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
    let navigate = useNavigate();
    
    return (
        <div>
            <button className="Random_color_button" onClick={() => navigate(`/`)}>Random Color</button>
            <ol className="Color_group_ordered_list">
                {colorGroups.map((colorGroup) => {
                    return <li className="Color_group_list_item" key={colorGroup.name}>{colorGroup.name}</li>
                })}
            </ol>
        </div>
    )
}

export default Sidebar
