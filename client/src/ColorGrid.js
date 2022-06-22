import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';
import Flow from './Flow.js';
import TestId from './TestId.js';

export default function ColorGrid(props) {
    if (props.flow.view_type == Flow.tints_grid_view.view_type || props.flow.view_type == Flow.shades_grid_view.view_type) {
        return (
            <div className="ColorGrid-grid ColorGrid-grid-tints_and_shades_grid_view">
                {props.colors.map((color) => {
                    return <ColorGridSwatch color={color} key={color} flow={props.flow} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch>
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
} flow={props.flow} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch> 
            })}
        </div>
    );
}
}