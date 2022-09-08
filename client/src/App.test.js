import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { rgbToHex } from './tint-and-shade-generator.js';
import TestId from './TestId.js';
import { BrowserRouter } from 'react-router-dom';
const { stringify } = require('flatted');

beforeEach(() => {
  act(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});

describe('Clicking the Random_color_button', () => {

  jest.setTimeout(30000); // Per https://jestjs.io/docs/28.0/jest-object, "The default timeout interval is 5 seconds if this method is not called."

  it('Should result in color-square-list-view elements being assigned (and subsequently displaying) a random color group value', async () => {

    let colorGroupArray = [];

    for (let i = 0; i < 5; i++) {
      await waitFor(() => {
        const random_color_button = screen.getByTestId(TestId.Random_color_button_TestId);
        fireEvent.click(random_color_button)
      });
      await allowTheUITimeToUpdate();

      let hex_code_string = configureHexCodeString();
      let color = await retrieveColorUsingHexCodeString(hex_code_string);
      colorGroupArray.push(color.group);
    }
    const allEqual = arr => arr.every(v => v === arr[0]);
    expect(allEqual(colorGroupArray)).toBe(false); // The probability of the same color group 5 times in a row is (1/8)^5, or .003051757% - so the allEqual result should equal false.
    expect(colorGroupArray.length).toBeGreaterThan(0);
  });
});

describe('Clicking a Color_group_list_item', () => {

  jest.setTimeout(30000); // Per https://jestjs.io/docs/28.0/jest-object, "The default timeout interval is 5 seconds if this method is not called."

  it('Should result in color-square-list-view elements being assigned (and subsequently displaying) the color group value associated with the Color_group_list_item that was clicked', async () => {
    let color_group_associated_with_currently_displayed_color_squares;
    let color_group_list_item;

    await waitFor(() => {
      const color_group_list_items = screen.getAllByTestId(TestId.Color_group_list_item_TestId);
      color_group_list_item = color_group_list_items[color_group_list_items.length * Math.random() | 0];
      fireEvent.click(color_group_list_item);
    });

    await allowTheUITimeToUpdate();

    let hex_code_string = configureHexCodeString();
    let color = await retrieveColorUsingHexCodeString(hex_code_string);
    color_group_associated_with_currently_displayed_color_squares = color.group;

  
    expect(ciEquals(color_group_associated_with_currently_displayed_color_squares, color_group_list_item.textContent)).toBe(true);
  });
});

describe('Clicking a ColorGridSwatch element when the ColorGrid component\'s ViewConfiguration type is list_view', () => {

  jest.setTimeout(30000); // Per https://jestjs.io/docs/28.0/jest-object, "The default timeout interval is 5 seconds if this method is not called."

  it('should result in the corresponding ColorDetailView being displayed, and facilitate navigation to the path associated with the ColorGridSwatch that was clicked', async () => {
  
  let hex_code_string = configureHexCodeString(true);
  let color = await retrieveColorUsingHexCodeString(hex_code_string);
    
  let detail_view_path = `/colors/${color.id}`;
    expect(global.window.location.pathname).toEqual(`${detail_view_path}`);
  });
});

function configureHexCodeString(color_square_should_be_clicked = false) {

  const color_squares = screen.getAllByTestId(TestId.Color_square_list_view_TestId);
  const color_square = color_squares[color_squares.length * Math.random() | 0];
  if(color_square_should_be_clicked == true) {
  fireEvent.click(color_square);
  }
  
  let styleValue = color_square.getAttribute('style'); // background-color: rgb(205, 92, 92);
  let startingIndex = styleValue.indexOf("(") + 1;
  let endingIndex = styleValue.indexOf(")");
  let rgbString = styleValue.substring(startingIndex, endingIndex); // 205, 92, 92
  let rgbArray = rgbString.split(",");
  let rgbObject = { "red": rgbArray[0], "green": rgbArray[1], "blue": rgbArray[2] }; // { red: 80, green: 18, blue: 20 }
  return rgbToHex(rgbObject); // cd5c5c
}

/* See https://stackoverflow.com/questions/2140627/how-to-do-case-insensitive-string-comparison by Samuel Neff for context. 
This function facilitates case insensitive string comparison. */
function ciEquals(a, b) {
  return typeof a === 'string' && typeof b === 'string'
    ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
    : a === b;
}

async function retrieveColorUsingHexCodeString(hex_code_string) {
  let color = await act(async () => { 
    try { 
    const res = await fetch('http://localhost:8080/api/colors?hex_code=' + hex_code_string);
    const result = await res.json(); // {"totalItems":1,"colors":[{"id":"6172913e-76dd-4e2a-8885-149716b0f025","html_name":"INDIANRED","hex_code":"CD5C5C","group":"red","rgb_string":"205,92,92","createdAt":"2022-06-14T14:36:57.353Z","updatedAt":"2022-06-14T14:36:57.353Z"}],"totalPages":1,"currentPage":0}
    return result.colors[0];
    } catch (error) {
      console.log(`error is ${error}`);
    }
  });
  return color;
}

async function allowTheUITimeToUpdate() {
  await act(async () => {
    /* We want to ensure that state updates caused by a random_color_button or color_group_list_item click have finished.
    
    Several internet resources suggest doing this via findByText("Loading"),  
    findByText("[some new text that would not have previously been visible]"), or confirming if a specific element
    has been added or removed from the DOM. We unfortunately can't confirm that the UI has finished
    updating via text changing, because, regarding for example the intended effect of the random_color_button click, the
    existing color (e.g. red) might very well match the new randomly selected color (that being said, please note that 
    at the time of this writing there is just a 1/8 chance of this happening - at the time of this writing there 
    are 8 different color groups).
   
    Via the setTimeout 2000ms value, we're configuring things such that the UI has 2000ms or 2 seconds to update.
    */
    await new Promise((r) => setTimeout(r, 2000));
  });
}
