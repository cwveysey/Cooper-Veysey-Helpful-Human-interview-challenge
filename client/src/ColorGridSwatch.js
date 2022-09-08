import * as React from 'react';
import './ColorGridSwatch.css';
import Flow from './Flow.js';
import TestId from './TestId.js';

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
    
    
    // Assign className and data-testid values based on Flow value.
    let color_grid_swatch_container_class_name_string;
    let color_square_class_name_string;
    let hex_code_container_class_name_string;
    let color_square_data_test_id_string;
    let colorGridSwatch_container_data_test_id_string;
    switch (props.flow.view_type) {
        case Flow.list_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-list-view";
            color_square_class_name_string = "color-square color-square-list-view";
            hex_code_container_class_name_string = "hex-code-container hex-code-container-list-view";
            color_square_data_test_id_string = TestId.Color_square_list_view_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.List_view_ColorGridSwatch_container_TestId;
            break;
        case Flow.detail_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-detail-view"
            color_square_class_name_string = "color-square color-square-detail-view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-detail-view";
            color_square_data_test_id_string = TestId.Color_square_detail_view_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.Detail_view_ColorGridSwatch_container_TestId;
            break;
        case Flow.tints_grid_view.view_type:
        case Flow.shades_grid_view.view_type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-tints_and_shades_grid_view"
            color_square_class_name_string = "color-square color-square-tints_and_shades_grid_view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-tints_and_shades_grid_view";
            color_square_data_test_id_string = TestId.Tints_and_shades_grid_view_Color_square_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.Tints_and_shades_grid_view_ColorGridSwatch_container_TestId;
            break;
    }

    return (
        <div className={color_grid_swatch_container_class_name_string} onClick={color_grid_swatch_container_class_name_string == "ColorGridSwatch-container ColorGridSwatch-container-list-view" ? () => handleClick() : undefined } data-testid={colorGridSwatch_container_data_test_id_string}>
            <div className={color_square_class_name_string} style={{ backgroundColor: formatted_hex_code_string }} data-testid={color_square_data_test_id_string} color={JSON.stringify(props.color)}></div>
            <div className={hex_code_container_class_name_string}>
                {formatted_hex_code_string}
            </div>
        </div>
    );
    }