import React from 'react';
import ColorGrid from './ColorGrid';
import ColorGridSwatch from './ColorGridSwatch';
import PaginationList from './PaginationList';
import Flow from './Flow.js';
import './App.css';
import './ColorDetailView.css';
import useSWR from "swr";
import { laggy } from "./utils.js";
import { useParams } from 'react-router-dom';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ColorDetailView(props) {
    const params = useParams();
    const { data: color, error, isValidating, isLagging, resetLaggy } = useSWR(() => {
        return (`http://localhost:8080/api/colors/${params.id}`)
    },
        fetcher, { use: [laggy] })

    console.log(`color is ${JSON.stringify(color)}`);

    return (
        <div className='ColorDetailView-container'>
            {/* <ColorGridSwatch color={props.color} key={props.color.id} flow={props.flow}></ColorGridSwatch> */}
            {color && <ColorGridSwatch color={color} key={color.id} flow={Flow.detail_view}></ColorGridSwatch>}
            {/* {props.colors != undefined &&
                <ColorGrid colors={props.colors} onColorGridSwatchClick={handleColorGridSwatchClick} ></ColorGrid>
            }
            <div className='PaginationList-container'>
                {props.colors != undefined && <PaginationList count={props.count} page={props.page} onPageSelection={handlePageSelection}>
                </PaginationList>}
            </div> */}
        </div>
    );
}