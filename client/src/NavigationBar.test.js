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

    test('Clicking the navigation bar Helpful Human logo facilitates navigation to the / path', async () => {
        const leftClick = { button: 0 }
        console.log(`TestId.Helpful_Human_logo_button_TestId is ${TestId.Helpful_Human_logo_button_TestId}`);
        console.log(`TestId.Helpful_Human_logo_button_TestId.testIDValue is ${TestId.Helpful_Human_logo_button_TestId.testIDValue}`);
        console.log(`TestId.Helpful_Human_logo_button_TestId.testIDValue is ${JSON.stringify(TestId.Helpful_Human_logo_button_TestId.testIDValue)}`);
        const helpful_Human_logo_button = screen.getByTestId(TestId.Helpful_Human_logo_button_TestId);
        userEvent.click(helpful_Human_logo_button, leftClick);
        expect(global.window.location.pathname).toEqual("/");
    });

    test('The Helpful Human logo src value must equal "Helpful_Human_logo", and the alt value must equal "Helpful Human logo"', () => {
        
        const helpful_Human_logo_img = screen.getByTestId(TestId.Helpful_Human_logo_img_TestId);
        // const helpful_Human_logo_img = document.querySelector('[data-testid="Helpful_Human_logo_img_TestId"]');
        // const helpful_Human_logo_img = document.querySelector("[data-testid=Helpful_Human_logo_img_TestId]");
        // const helpful_Human_logo_img = screen.getByRole('img');
        
        expect(helpful_Human_logo_img).toHaveAttribute('src', 'Helpful_Human_logo.svg');
        expect(helpful_Human_logo_img).toHaveAttribute('alt', 'Helpful Human logo');
        });

});



