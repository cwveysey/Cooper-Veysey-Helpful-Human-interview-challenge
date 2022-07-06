import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import NavigationBar from './NavigationBar';
import TestId from './TestId.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from "react-router-dom";
import App from './App';

describe('Navigation bar', () => {
    beforeEach(() => {
        
        act(() => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });
    });

    test.skip('Clicking the navigation bar Helpful Human logo facilitates navigation to the / path', async () => {
        const leftClick = { button: 0 }
        const helpful_Human_logo_button = screen.getByTestId(TestId.Helpful_Human_logo_button_TestId);
        userEvent.click(helpful_Human_logo_button, leftClick);
        expect(global.window.location.pathname).toEqual("/");
    });

    test.skip('The Helpful Human logo src value must equal "Helpful_Human_logo", and the alt value must equal "Helpful Human logo"', () => {
        
        const helpful_Human_logo_img = screen.getByTestId(TestId.Helpful_Human_logo_img_TestId);
        expect(helpful_Human_logo_img).toHaveAttribute('src', 'Helpful_Human_logo.svg');
        expect(helpful_Human_logo_img).toHaveAttribute('alt', 'Helpful Human logo');
        });

});



