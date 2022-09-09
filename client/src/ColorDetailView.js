import React from 'react';
import ColorGrid from './ColorGrid';
import ColorGridSwatch from './ColorGridSwatch';
import { calculateShades, calculateTints} from './tint-and-shade-generator.js';
import ViewConfiguration from './ViewConfiguration.js';
import './App.css';
import './ColorDetailView.css';
import useSWR from "swr";
import { laggy } from "./utils.js";
import { notification } from 'antd';
import 'antd/dist/antd.min.css'; // See https://github.com/ant-design/ant-design/issues/33327
import { useParams } from 'react-router-dom';
import TestId from './TestId.js'; // An enum that makes the codebase more DRY, via making the app's data-testid selectors reusable.

/* The fetcher function accepts a url and serves as (essentially) a Fetch API wrapper. The below line of code was borrowed 
directly from the SWR documentation (https://swr.vercel.app/docs/data-fetching). */
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ColorDetailView() {
    /* Because we have a /colors/:id route, for /colors/:id URLs (example URL: http://localhost:3000/colors/276934c3-962f-4aad-b18e-ba7f25f2cf92)
    we have access to their id value via req.params.id and the React Router useParams hook.
    
    For context, the reason that we retrieve the id via the useParams() hook, as opposed to via props: we want users
    to be able to navigate directly to /colors/:id URLs, without having to first navigate to the home page */
    const params = useParams();
    
    const { data: color, error, isValidating} = useSWR(() => {
        return (process.env.REACT_APP_APIUrl + `/colors/${params.id}`)
    }, fetcher, { use: [laggy] });
    
    let shades;
    let tints;
    
    // Need to successfully retrieve color data from the API before we can call calculateShades and calculateTints.
    if (color) { 
        /* The calculateShades and calculateTints functions both return an array of 10 hex codes. 
        The first hex code (in the returned array of hex codes) is the hex code that was passed to the 
        calculateShades or calculateTints function - the remaining hex codes are shades or tints (depending on which
        function was called) of said hex code. Because we want to display 5 shades and 5 tints (per the design file), 
        we slice the returned arrays accordingly. */
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
            {color && <ColorGridSwatch color={color} key={color.id} viewConfiguration={ViewConfiguration.detail_view} data-testid={TestId.ColorGridSwatchTestId}></ColorGridSwatch>}
        <div className='Shades-container'>
            {shades &&
                    <ColorGrid shades={shades} viewConfiguration={ViewConfiguration.shades_grid_view} data-testid={TestId.ColorGridTestId}></ColorGrid>
            }
        </div>
        <div className='Tints-container'>
            {tints &&
                    <ColorGrid tints={tints} viewConfiguration={ViewConfiguration.tints_grid_view} data-testid={TestId.ColorGridTestId}></ColorGrid>
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