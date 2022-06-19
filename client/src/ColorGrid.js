import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';

export default function ColorGrid(props) {
    let colors = props.colors.colors;
    const handleColorGridSwatchClick = (color) => {
        props.onColorGridSwatchClick(color);
    }; 
    
    return (
        <div className="ColorGrid-grid">
            {colors.map((color) => {
                return <ColorGridSwatch color={color} key={color.id} onColorGridSwatchClick={handleColorGridSwatchClick
} flow={props.flow}></ColorGridSwatch> 
            })}
        </div>
    );
}