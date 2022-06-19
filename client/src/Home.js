import React from 'react';
import ColorGrid from './ColorGrid';
import PaginationList from './PaginationList';
import './App.css';

export default function Home(props) {
    const handlePageSelection = (pageSelected) => {
        props.onPageSelection(pageSelected);
    };

    const handleColorGridSwatchClick = (color) => {
        props.onColorGridSwatchClick(color);
    }; 
    return (
        <div className='ColorGrid-container'>
            {props.colors != undefined &&
                <ColorGrid colors={props.colors} onColorGridSwatchClick={handleColorGridSwatchClick} flow={props.flow}></ColorGrid>
            }
            <div className='PaginationList-container'>
                {props.colors != undefined && <PaginationList count={props.count} page={props.page} onPageSelection={handlePageSelection}>
                </PaginationList>}
            </div>
        </div>
    );
}