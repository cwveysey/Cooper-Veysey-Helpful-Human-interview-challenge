// Per https://github.com/edelstone/tints-and-shades/blob/main/scripts/tints-and-shades.js

// convert a hex string into an object with red, green, blue numeric properties
// '501214' => { red: 80, green: 18, blue: 20 }
function hexToRGB(colorValue) {
    return {
        red: parseInt(colorValue.substr(0, 2), 16),
        green: parseInt(colorValue.substr(2, 2), 16),
        blue: parseInt(colorValue.substr(4, 2), 16)
    }
}

// convert an integer to a 2-char hex string
// for sanity, round it and ensure it is between 0 and 255
// 43 => '2b'
function intToHex(rgbint) {
    return pad(Math.min(Math.max(Math.round(rgbint), 0), 255).toString(16), 2);
}

// convert one of our rgb color objects to a full hex color string
// { red: 80, green: 18, blue: 20 } => '501214'
export function rgbToHex(rgb) {
    return intToHex(rgb.red) + intToHex(rgb.green) + intToHex(rgb.blue);
}

// shade one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 72, green: 16, blue: 18 }
function rgbShade(rgb, i) {
    return {
        red: rgb.red * (1 - 0.1 * i),
        green: rgb.green * (1 - 0.1 * i),
        blue: rgb.blue * (1 - 0.1 * i)
    }
}

// tint one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 98, green: 42, blue: 44 }
function rgbTint(rgb, i) {
    return {
        red: rgb.red + (255 - rgb.red) * i * 0.1,
        green: rgb.green + (255 - rgb.green) * i * 0.1,
        blue: rgb.blue + (255 - rgb.blue) * i * 0.1
    }
}

// given a color value, return an array of ten shades in 10% increments
export function calculateShades(colorValue) {
    return calculate(colorValue, rgbShade).concat("000000");
}

// given a color value, return an array of ten tints in 10% increments
export function calculateTints(colorValue) {
    return calculate(colorValue, rgbTint).concat("ffffff");
}

// pad a hexadecimal string with zeros if it needs it
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

// take a hex color string and produce a list of 10 tints or shades of that color
// shadeOrTint should be either `rgbShade` or `rgbTint`, as defined above
// this allows us to use `calculate` for both shade and tint
function calculate(colorValue, shadeOrTint) {
    var color = hexToRGB(colorValue);
    var shadeValues = [];

    for (var i = 0; i < 10; i++) {
        shadeValues[i] = rgbToHex(shadeOrTint(color, i));
    }
    return shadeValues;
}