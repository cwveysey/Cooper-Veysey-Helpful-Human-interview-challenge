import * as React from 'react'; 
import './NavigationBar.css';
import { useNavigate } from "react-router-dom";
import Helpful_Human_logo from '../assets/Helpful_Human_logo.svg';
import TestId from '../enums/TestId.js';

function NavigationBar(props) {
    let navigate = useNavigate();
    return (
        <div className='NavigationBar'>
            <button className="Helpful-Human-logo-button" onClick={() => navigate(`/`)} data-testid={TestId.Helpful_Human_logo_button_TestId}>
                <img className="Helpful-Human-logo" alt="Helpful Human logo" src={Helpful_Human_logo} decoding="async" data-nimg="fill" data-testid={TestId.Helpful_Human_logo_img_TestId} />
        </button>
        </div>
    )
}

export default NavigationBar
