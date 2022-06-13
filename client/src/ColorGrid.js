import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';

export default function ColorGrid(props) {
    let colors = props.colors;
    return (
        <div className="ColorGrid-grid">
            {colors.map((color) => {
                return <ColorGridSwatch color={color} key={color.id}></ColorGridSwatch> 
            })}
        </div>
    );
}