import React from 'react';
import ColorGrid from './ColorGrid';
import PaginationList from './PaginationList';
import './App.css';
import TestId from './TestId.js';

export default function Home(props) {
    const handlePageSelection = (pageSelected) => {
        props.onPageSelection(pageSelected);
    };

    const handleColorGridSwatchClick = (color) => {
        props.onColorGridSwatchClick(color);
    }; 
    return (
        <div className='ColorGrid-container'>
            {props.colors !== undefined &&
                <ColorGrid colors={props.colors} onColorGridSwatchClick={handleColorGridSwatchClick} viewConfiguration={props.viewConfiguration} data-testid={TestId.ColorGridTestId}></ColorGrid>
            }
            <div className='PaginationList-container'>
                {props.colors !== undefined && <PaginationList count={props.count} page={props.page} onPageSelection={handlePageSelection} data-testid={TestId.PaginationListTestId}>
                </PaginationList>}
            </div>
        </div>
    );
}