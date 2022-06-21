import * as React from 'react';
import './ColorGridSwatch.css';
import Flow from './Flow.js';

export default function ColorGridSwatch(props) {
    let hex_code_string;
    if (props.flow.view_type == Flow.tints_grid_view.view_type || props.flow.view_type == Flow.shades_grid_view.view_type) {
    hex_code_string = props.color; 
    } else {
    hex_code_string = props.color.hex_code;
    }
    let formatted_hex_code_string = ('#' + hex_code_string).toLowerCase();
    
    const handleClick = () => {
        props.onColorGridSwatchClick(props.color);
    };
    // Assign className value based on Flow viewType.
    let color_grid_swatch_container_class_name_string;
    let color_square_class_name_string;
    let hex_code_container_class_name_string;
    switch (props.flow.view_type) {
        case Flow.list_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-list-view";
            color_square_class_name_string = "color-square color-square-list-view";
            hex_code_container_class_name_string = "hex-code-container hex-code-container-list-view";
            break;
        case Flow.detail_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-detail-view"
            color_square_class_name_string = "color-square color-square-detail-view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-detail-view";
            break;
        case Flow.tints_grid_view.view_type:
        case Flow.shades_grid_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-tints_and_shades_grid_view"
            color_square_class_name_string = "color-square color-square-tints_and_shades_grid_view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-tints_and_shades_grid_view";
            break;
    }

    return (
        <div className={color_grid_swatch_container_class_name_string} onClick={() => handleClick()}>
            <div className={color_square_class_name_string} style={{ backgroundColor: formatted_hex_code_string}}></div>
            <div className={hex_code_container_class_name_string}>
                {formatted_hex_code_string}
            </div>
        </div>
    );
    }