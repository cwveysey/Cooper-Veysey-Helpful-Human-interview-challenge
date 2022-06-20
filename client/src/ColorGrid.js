import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';
import Flow from './Flow.js';

export default function ColorGrid(props) {
    console.log(`ColorGrid props are ${JSON.stringify(props)}`);
    if (props.flow.view_type == Flow.tints_grid_view.view_type || props.flow.view_type == Flow.shades_grid_view.view_type) {
        console.log(`Flow is hitting`);
        return (
            <div className="ColorGrid-grid ColorGrid-grid-tints_and_shades_grid_view">
                {props.colors.map((color) => {
                    return <ColorGridSwatch color={color} key={color} flow={props.flow}></ColorGridSwatch>
                })}
            </div>
        );
            }
    else {
    let colors = props.colors.colors;
    const handleColorGridSwatchClick = (color) => {
        props.onColorGridSwatchClick(color);
    }; 
    return (
        <div className="ColorGrid-grid ColorGrid-grid-list-view">
            {colors.map((color) => {
                return <ColorGridSwatch color={color} key={color.id} onColorGridSwatchClick={handleColorGridSwatchClick
} flow={props.flow}></ColorGridSwatch> 
            })}
        </div>
    );
}
}