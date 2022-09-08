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
import 'antd/dist/antd.min.css'; // See https://github.com/ant-design/ant-design/issues/33327
import { useParams, useNavigate } from 'react-router-dom';
import TestId from './TestId.js'; // An enum that makes the codebase more DRY, via making the app's data-testid selectors reusable.

// The fetcher function accepts a url and serves as (essentially) a Fetch API wrapper. The below line of code was borrowed directly from the SWR documentation (https://swr.vercel.app/docs/data-fetching). 
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ColorDetailView(props) {
    const params = useParams();
    const { data: color, error, isValidating} = useSWR(() => {
        return (process.env.REACT_APP_APIUrl + `/colors/${params.id}`)
    }, fetcher, { use: [laggy] })
    let navigate = useNavigate();
    
    let shades;
    let tints;
    if(color) {
        shades = calculateShades(color.hex_code).slice(1, 6); 
        tints = calculateTints(color.hex_code).slice(1, 6); 
    }

    const handleClearButtonClick = () => {
        openNotification('topRight');
    }

    const openNotification = placement => {
        notification.info({
            message: `Clear button was clicked -`,
            description:
                'Confirmed that this is boilerplate copy - thank you for reviewing my application!',
            duration: 5,
            placement,
        });
    };

    return (
        <div className='ColorDetailView-container'>
            {color && <ColorGridSwatch color={color} key={color.id} flow={Flow.detail_view} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch>}
        <div className='Shades-container'>
            {shades &&
                <ColorGrid colors={shades} flow={Flow.shades_grid_view} data-testid={TestId.ColorGridTestId}></ColorGrid>
            }
        </div>
        <div className='Tints-container'>
            {tints &&
                <ColorGrid colors={tints} flow={Flow.tints_grid_view} data-testid={TestId.ColorGridTestId}></ColorGrid>
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