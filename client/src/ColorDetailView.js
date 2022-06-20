import React from 'react';
import ColorGrid from './ColorGrid';
import ColorGridSwatch from './ColorGridSwatch';
import { calculateShades, calculateTints } from './tint-and-shade-generator.js';
import Flow from './Flow.js';
import './App.css';
import './ColorDetailView.css';
import useSWR from "swr";
import { laggy } from "./utils.js";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ColorDetailView(props) {
    const params = useParams();
    const { data: color, error, isValidating} = useSWR(() => {
        return (`http://localhost:8080/api/colors/${params.id}`)
    },
        fetcher, { use: [laggy] })

    let navigate = useNavigate();
    console.log(`color is ${JSON.stringify(color)}`);
    let shades;
    let tints;
    if(color) {

    shades = calculateShades(color.hex_code);
    tints = calculateTints(color.hex_code);
    }

    const handleColorGridSwatchClick = (color) => {
        navigate(`/colors/${color.id}`);
    }; 

    console.log(`shades is ${JSON.stringify(shades)}`);
    console.log(`tints is ${JSON.stringify(tints)}`);

    return (
        <div className='ColorDetailView-container'>
            {/* <ColorGridSwatch color={props.color} key={props.color.id} flow={props.flow}></ColorGridSwatch> */}
            {color && <ColorGridSwatch color={color} key={color.id} flow={Flow.detail_view}></ColorGridSwatch>}
            {/* {shades &&
                <ColorGrid colors={props.colors} onColorGridSwatchClick={handleColorGridSwatchClick} ></ColorGrid>
            }
            {tints &&
                <ColorGrid colors={props.colors} onColorGridSwatchClick={handleColorGridSwatchClick} ></ColorGrid>
            } */}
            {/* <div className='PaginationList-container'>
                {props.colors != undefined && <PaginationList count={props.count} page={props.page} onPageSelection={handlePageSelection}>
                </PaginationList>}
            </div> */}
        </div>
    );
}