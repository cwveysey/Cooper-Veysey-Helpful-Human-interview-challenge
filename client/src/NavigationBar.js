import * as React from 'react'; 
import './NavigationBar.css';
import { useNavigate } from "react-router-dom";
import Helpful_Human_logo from './assets/Helpful_Human_logo.svg';

function NavigationBar(props) {
    let navigate = useNavigate();
    console.log(`props are ${JSON.stringify(props)}`);

    return (
        <div className='NavigationBar'>
        <button className="Helpful-Human-logo-button" onClick={() => navigate(`/`)}>
                <img className="Helpful-Human-logo" alt="Helpful Human logo" src={Helpful_Human_logo} decoding="async" data-nimg="fill" />
        </button>
        </div>
    )
}

export default NavigationBar
