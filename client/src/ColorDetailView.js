import React from 'react';
import ColorGrid from './ColorGrid';
import ColorGridSwatch from './ColorGridSwatch';
import { calculateShades, calculateTints} from './tint-and-shade-generator.js';
import Flow from './Flow.js';
import './App.css';
import './ColorDetailView.css';
import useSWR from "swr";
import { laggy } from "./utils.js";
import { notification } from 'antd';
import 'antd/dist/antd.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ColorDetailView(props) {
    const params = useParams();
    const { data: color, error, isValidating} = useSWR(() => {
        return (`http://localhost:8080/api/colors/${params.id}`)
    }, fetcher, { use: [laggy] })
    let navigate = useNavigate();
    console.log(`color is ${JSON.stringify(color)}`);
    let shades;
    let tints;
    if(color) {
        shades = calculateShades(color.hex_code).slice(1, 6); 
        tints = calculateTints(color.hex_code).slice(1, 6); 
    }

    const handleColorGridSwatchClick = (color) => {
        navigate(`/colors/${color.id}`);
    }; 

    const handleClearButtonClick = () => {
        openNotification('topRight');
    }

    const openNotification = placement => {
        notification.info({
            message: `Clear button was clicked -`,
            description:
                'Confirmed that the specified alert has been deleted.',
            duration: 5,
            placement,
        });
    };

    return (
        <div className='ColorDetailView-container'>
            {color && <ColorGridSwatch color={color} key={color.id} flow={Flow.detail_view}></ColorGridSwatch>}
        <div className='Shades-container'>
            {shades &&
                <ColorGrid colors={shades} flow={Flow.shades_grid_view} ></ColorGrid>
            }
        </div>
        <div className='Tints-container'>
            {tints &&
                <ColorGrid colors={tints} flow={Flow.tints_grid_view} ></ColorGrid>
            }
            </div>
            <div className='Clear-button-container'>
            {tints &&
            <button className="Clear-button" onClick={() => handleClearButtonClick()}>Clear</button>
            }
            </div>
        </div>
    );
}