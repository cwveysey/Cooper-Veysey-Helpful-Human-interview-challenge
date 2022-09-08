import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';
import ViewConfiguration from './ViewConfiguration.js';
import TestId from './TestId.js';

export default function ColorGrid(props) {
    if (props.viewConfiguration.type == ViewConfiguration.tints_grid_view.type || props.viewConfiguration.type == ViewConfiguration.shades_grid_view.type) {
        return (
            <div className="ColorGrid-grid Tints_and_shades_grid_view_ColorGrid ">
                {props.colors.map((color) => {
                    return <ColorGridSwatch color={color} key={color} viewConfiguration={props.viewConfiguration} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch>
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
        <div className="ColorGrid-grid ColorGrid-grid-list-view" data-testid={TestId.List_view_ColorGrid_TestId} >
            {colors.map((color) => {
                return <ColorGridSwatch color={color} key={color.id} onColorGridSwatchClick={handleColorGridSwatchClick
} viewConfiguration={props.viewConfiguration} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch> 
            })}
        </div>
    );
}
}