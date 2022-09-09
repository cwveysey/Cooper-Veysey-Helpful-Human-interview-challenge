import * as React from 'react';
import './ColorGridSwatch.css';
import ViewConfiguration from './ViewConfiguration.js';
import TestId from './TestId.js';

export default function ColorGridSwatch(props) {
    
    let formatted_hex_code_string = configureHexCodeStringUsingProps(props);
     
    const handleClick = () => {
        props.onColorGridSwatchClick(props.color);
    };
    
    // Assign className and data-testid values based on ViewConfiguration value.
    let color_grid_swatch_container_class_name_string;
    let color_square_class_name_string;
    let hex_code_container_class_name_string;
    let color_square_data_test_id_string;
    let colorGridSwatch_container_data_test_id_string;

    /* Because the color_grid_swatch_container_list_view_string value will be referenced multiple times across this file, 
    assign the value to a reusable variable. */
    let color_grid_swatch_container_list_view_string = "ColorGridSwatch-container ColorGridSwatch-container-list-view";

    switch (props.viewConfiguration.type) {
        case ViewConfiguration.list_view.type:
            color_grid_swatch_container_class_name_string = color_grid_swatch_container_list_view_string;
            color_square_class_name_string = "color-square color-square-list-view";
            hex_code_container_class_name_string = "hex-code-container hex-code-container-list-view";
            color_square_data_test_id_string = TestId.Color_square_list_view_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.List_view_ColorGridSwatch_container_TestId;
            break;
        case ViewConfiguration.detail_view.type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-detail-view"
            color_square_class_name_string = "color-square color-square-detail-view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-detail-view";
            color_square_data_test_id_string = TestId.Color_square_detail_view_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.Detail_view_ColorGridSwatch_container_TestId;
            break;
        case ViewConfiguration.tints_grid_view.type:
        case ViewConfiguration.shades_grid_view.type:
            color_grid_swatch_container_class_name_string = "ColorGridSwatch-container ColorGridSwatch-container-tints_and_shades_grid_view"
            color_square_class_name_string = "color-square color-square-tints_and_shades_grid_view"
            hex_code_container_class_name_string = "hex-code-container hex-code-container-tints_and_shades_grid_view";
            color_square_data_test_id_string = TestId.Tints_and_shades_grid_view_Color_square_TestId;
            colorGridSwatch_container_data_test_id_string = TestId.Tints_and_shades_grid_view_ColorGridSwatch_container_TestId;
            break;
    }

    return (
        <div className={color_grid_swatch_container_class_name_string} onClick={color_grid_swatch_container_class_name_string == color_grid_swatch_container_list_view_string ? () => handleClick() : undefined } data-testid={colorGridSwatch_container_data_test_id_string}>
            <div className={color_square_class_name_string} style={{ backgroundColor: formatted_hex_code_string }} data-testid={color_square_data_test_id_string} color={JSON.stringify(props.color)}></div>
            <div className={hex_code_container_class_name_string}>
                {formatted_hex_code_string}
            </div>
        </div>
    );
    }

function configureHexCodeStringUsingProps(props) {
    let hex_code_string;
    
    if (props.viewConfiguration.type == ViewConfiguration.tints_grid_view.type || props.viewConfiguration.type == ViewConfiguration.shades_grid_view.type) {
        hex_code_string = props.hex_code_string;
    } else if (props.viewConfiguration.type == ViewConfiguration.detail_view.type || props.viewConfiguration.type == ViewConfiguration.list_view.type) {
        hex_code_string = props.color.hex_code;
    }
    /* Account for the fact that, as far as hexadecimal color strings (https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color),
    our database stores exclusively hexadecimal characters (0–9, A–F). The design specifications for this project depict 
    hex strings with a leading "#" sign (which is commonplace, per https://en.wikipedia.org/wiki/Web_colors) */ 
    let formatted_hex_code_string = ('#' + hex_code_string).toLowerCase();
    return formatted_hex_code_string;
    }