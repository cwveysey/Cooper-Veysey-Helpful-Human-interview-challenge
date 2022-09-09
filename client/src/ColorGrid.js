import * as React from 'react';
import './ColorGrid.css';
import ColorGridSwatch from './ColorGridSwatch';
import ViewConfiguration from './ViewConfiguration.js';
import TestId from './TestId.js';

export default function ColorGrid(props) {
    console.log(`ColorGrid props is ${JSON.stringify(props)}`);
    console.log(`ColorGrid props.viewConfiguration.type is ${JSON.stringify(props.viewConfiguration.type)}`);
    if (props.viewConfiguration.type == ViewConfiguration.tints_grid_view.type || props.viewConfiguration.type == ViewConfiguration.shades_grid_view.type) {
        let hex_code_strings;
        if (props.viewConfiguration.type == ViewConfiguration.tints_grid_view.type) {
            hex_code_strings = props.tints;
        } else if (props.viewConfiguration.type == ViewConfiguration.shades_grid_view.type) {
            hex_code_strings = props.shades;
        }
        return (
            <div className="ColorGrid-grid Tints_and_shades_grid_view_ColorGrid">
                {hex_code_strings.map((hex_code_string) => {
                    return <ColorGridSwatch hex_code_string={hex_code_string} key={hex_code_string} viewConfiguration={props.viewConfiguration} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch>
                })}
            </div>
        );
            }
    else if (props.viewConfiguration.type == ViewConfiguration.list_view.type || props.viewConfiguration.type == ViewConfiguration.detail_view.type) {
    let colors = props.colors;
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