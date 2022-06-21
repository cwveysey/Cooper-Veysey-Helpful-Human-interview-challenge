const fs = require('fs'); 

/* Original data - "colorsData" below - obtained from https://bl.ocks.org/jennyknuth/e2d9ee930303d5a5fe8862c6e31819c5
and https://www.w3schools.com/colors/colors_groups.asp */ 
let colorsData = [
  {
    "html_name": "INDIANRED",
    "hex_code": "CD5C5C",
    "rgb": "RGB(205, 92, 92)",
    "group": "red"
  },
  {
    "html_name": "LIGHTCORAL",
    "hex_code": "F08080",
    "rgb": "RGB(240, 128, 128)",
    "group": "red"
  },
  {
    "html_name": "SALMON",
    "hex_code": "FA8072",
    "rgb": "RGB(250, 128, 114)",
    "group": "red"
  },
  {
    "html_name": "DARKSALMON",
    "hex_code": "E9967A",
    "rgb": "RGB(233, 150, 122)",
    "group": "red"
  },
  {
    "html_name": "LIGHTSALMON",
    "hex_code": "FFA07A",
    "rgb": "RGB(255, 160, 122)",
    "group": "red"
  },
  {
    "html_name": "CRIMSON",
    "hex_code": "DC143C",
    "rgb": "RGB(220, 20, 60)",
    "group": "red"
  },
  {
    "html_name": "RED",
    "hex_code": "FF0000",
    "rgb": "RGB(255, 0, 0)",
    "group": "red"
  },
  {
    "html_name": "DARKRED",
    "hex_code": "8B0000",
    "rgb": "RGB(139, 0, 0)",
    "group": "red"
  },
  {
    "html_name": "PINK",
    "hex_code": "FFC0CB",
    "rgb": "RGB(255, 192, 203)",
    "group": "pink"
  },
  {
    "html_name": "LIGHTPINK",
    "hex_code": "FFB6C1",
    "rgb": "RGB(255, 182, 193)",
    "group": "pink"
  },
  {
    "html_name": "HOTPINK",
    "hex_code": "FF69B4",
    "rgb": "RGB(255, 105, 180)",
    "group": "pink"
  },
  {
    "html_name": "DEEPPINK",
    "hex_code": "FF1493",
    "rgb": "RGB(255, 20, 147)",
    "group": "pink"
  },
  {
    "html_name": "MEDIUMVIOLETRED",
    "hex_code": "C71585",
    "rgb": "RGB(199, 21, 133)",
    "group": "pink"
  },
  {
    "html_name": "PALEVIOLETRED",
    "hex_code": "DB7093",
    "rgb": "RGB(219, 112, 147)",
    "group": "pink"
  },
  {
    "html_name": "CORAL",
    "hex_code": "FF7F50",
    "rgb": "RGB(255, 127, 80)",
    "group": "orange"
  },
  {
    "html_name": "TOMATO",
    "hex_code": "FF6347",
    "rgb": "RGB(255, 99, 71",
    "group": "orange"
  },
  {
    "html_name": "ORANGERED",
    "hex_code": "FF4500",
    "rgb": "RGB(255, 69, 0)",
    "group": "orange"
  },
  {
    "html_name": "DARKORANGE",
    "hex_code": "FF8C00",
    "rgb": "RGB(255, 140, 0)",
    "group": "orange"
  },
  {
    "html_name": "ORANGE",
    "hex_code": "FFA500",
    "rgb": "RGB(255, 165, 0)",
    "group": "orange"
  },
  {
    "html_name": "GOLD",
    "hex_code": "FFD700",
    "rgb": "RGB(255, 215, 0)",
    "group": "yellow"
  },
  {
    "html_name": "YELLOW",
    "hex_code": "FFFF00",
    "rgb": "RGB(255, 255, 0)",
    "group": "yellow"
  },
  {
    "html_name": "LIGHTYELLOW",
    "hex_code": "FFFFE0",
    "rgb": "RGB(255, 255, 224)",
    "group": "yellow"
  },
  {
    "html_name": "LEMONCHIFFON",
    "hex_code": "FFFACD",
    "rgb": "RGB(255, 250, 205)",
    "group": "yellow"
  },
  {
    "html_name": "LIGHTGOLDENRODYELLOW",
    "hex_code": "FAFAD2",
    "rgb": "RGB(250, 250, 210)",
    "group": "yellow"
  },
  {
    "html_name": "PAPAYAWHIP",
    "hex_code": "FFEFD5",
    "rgb": "RGB(255, 239, 213)",
    "group": "yellow"
  },
  {
    "html_name": "MOCCASIN",
    "hex_code": "FFE4B5",
    "rgb": "RGB(255, 228, 181)",
    "group": "yellow"
  },
  {
    "html_name": "PEACHPUFF",
    "hex_code": "FFDAB9",
    "rgb": "RGB(255, 218, 185)",
    "group": "yellow"
  },
  {
    "html_name": "PALEGOLDENROD",
    "hex_code": "EEE8AA",
    "rgb": "RGB(238, 232, 170)",
    "group": "yellow"
  },
  {
    "html_name": "KHAKI",
    "hex_code": "F0E68C",
    "rgb": "RGB(240, 230, 140)",
    "group": "yellow"
  },
  {
    "html_name": "DARKKHAKI",
    "hex_code": "BDB76B",
    "rgb": "RGB(189, 183, 107)",
    "group": "yellow"
  },
  {
    "html_name": "LAVENDER",
    "hex_code": "E6E6FA",
    "rgb": "RGB(230, 230, 250)",
    "group": "purple"
  },
  {
    "html_name": "THISTLE",
    "hex_code": "D8BFD8",
    "rgb": "RGB(216, 191, 216)",
    "group": "purple"
  },
  {
    "html_name": "PLUM",
    "hex_code": "DDA0DD",
    "rgb": "RGB(221, 160, 221)",
    "group": "purple"
  },
  {
    "html_name": "VIOLET",
    "hex_code": "EE82EE",
    "rgb": "RGB(238, 130, 238)",
    "group": "purple"
  },
  {
    "html_name": "ORCHID",
    "hex_code": "DA70D6",
    "rgb": "RGB(218, 112, 214)",
    "group": "purple"
  },
  {
    "html_name": "FUCHSIA",
    "hex_code": "FF00FF",
    "rgb": "RGB(255, 0, 255)",
    "group": "purple"
  },
  {
    "html_name": "MAGENTA",
    "hex_code": "FF00FF",
    "rgb": "RGB(255, 0, 255)",
    "group": "purple"
  },
  {
    "html_name": "MEDIUMORCHID",
    "hex_code": "BA55D3",
    "rgb": "RGB(186, 85, 211)",
    "group": "purple"
  },
  {
    "html_name": "MEDIUMPURPLE",
    "hex_code": "9370DB",
    "rgb": "RGB(147, 112, 219)",
    "group": "purple"
  },
  {
    "html_name": "REBECCAPURPLE",
    "hex_code": "663399",
    "rgb": "RGB(102, 51, 153)",
    "group": "purple"
  },
  {
    "html_name": "BLUEVIOLET",
    "hex_code": "8A2BE2",
    "rgb": "RGB(138, 43, 226)",
    "group": "purple"
  },
  {
    "html_name": "DARKVIOLET",
    "hex_code": "9400D3",
    "rgb": "RGB(148, 0, 211)",
    "group": "purple"
  },
  {
    "html_name": "DARKORCHID",
    "hex_code": "9932CC",
    "rgb": "RGB(153, 50, 204)",
    "group": "purple"
  },
  {
    "html_name": "DARKMAGENTA",
    "hex_code": "8B008B",
    "rgb": "RGB(139, 0, 139)",
    "group": "purple"
  },
  {
    "html_name": "PURPLE",
    "hex_code": "800080",
    "rgb": "RGB(128, 0, 128)",
    "group": "purple"
  },
  {
    "html_name": "INDIGO",
    "hex_code": "4B0082",
    "rgb": "RGB(75, 0, 130)",
    "group": "purple"
  },
  {
    "html_name": "SLATEBLUE",
    "hex_code": "6A5ACD",
    "rgb": "RGB(106, 90, 205)",
    "group": "purple"
  },
  {
    "html_name": "DARKSLATEBLUE",
    "hex_code": "483D8B",
    "rgb": "RGB(72, 61, 139)",
    "group": "purple"
  },
  {
    "html_name": "MEDIUMSLATEBLUE",
    "hex_code": "7B68EE",
    "rgb": "RGB(123, 104, 238)",
    "group": "purple"
  },
  {
    "html_name": "GREENYELLOW",
    "hex_code": "ADFF2F",
    "rgb": "RGB(173, 255, 47)",
    "group": "green"
  },
  {
    "html_name": "CHARTREUSE",
    "hex_code": "7FFF00",
    "rgb": "RGB(127, 255, 0)",
    "group": "green"
  },
  {
    "html_name": "LAWNGREEN",
    "hex_code": "7CFC00",
    "rgb": "RGB(124, 252, 0)",
    "group": "green"
  },
  {
    "html_name": "LIME",
    "hex_code": "00FF00",
    "rgb": "RGB(0, 255, 0)",
    "group": "green"
  },
  {
    "html_name": "LIMEGREEN",
    "hex_code": "32CD32",
    "rgb": "RGB(50, 205, 50)",
    "group": "green"
  },
  {
    "html_name": "PALEGREEN",
    "hex_code": "98FB98",
    "rgb": "RGB(152, 251, 152)",
    "group": "green"
  },
  {
    "html_name": "LIGHTGREEN",
    "hex_code": "90EE90",
    "rgb": "RGB(144, 238, 144)",
    "group": "green"
  },
  {
    "html_name": "MEDIUMSPRINGGREEN",
    "hex_code": "00FA9A",
    "rgb": "RGB(0, 250, 154)",
    "group": "green"
  },
  {
    "html_name": "SPRINGGREEN",
    "hex_code": "00FF7F",
    "rgb": "RGB(0, 255, 127)",
    "group": "green"
  },
  {
    "html_name": "MEDIUMSEAGREEN",
    "hex_code": "3CB371",
    "rgb": "RGB(60, 179, 113)",
    "group": "green"
  },
  {
    "html_name": "SEAGREEN",
    "hex_code": "2E8B57",
    "rgb": "RGB(46, 139, 87)",
    "group": "green"
  },
  {
    "html_name": "FORESTGREEN",
    "hex_code": "228B22",
    "rgb": "RGB(34, 139, 34)",
    "group": "green"
  },
  {
    "html_name": "GREEN",
    "hex_code": "008000",
    "rgb": "RGB(0, 128, 0)",
    "group": "green"
  },
  {
    "html_name": "DARKGREEN",
    "hex_code": "006400",
    "rgb": "RGB(0, 100, 0)",
    "group": "green"
  },
  {
    "html_name": "YELLOWGREEN",
    "hex_code": "9ACD32",
    "rgb": "RGB(154, 205, 50)",
    "group": "green"
  },
  {
    "html_name": "OLIVEDRAB",
    "hex_code": "6B8E23",
    "rgb": "RGB(107, 142, 35)",
    "group": "green"
  },
  {
    "html_name": "OLIVE",
    "hex_code": "6B8E23",
    "rgb": "RGB(128, 128, 0)",
    "group": "green"
  },
  {
    "html_name": "DARKOLIVEGREEN",
    "hex_code": "556B2F",
    "rgb": "RGB(85, 107, 47)",
    "group": "green"
  },
  {
    "html_name": "MEDIUMAQUAMARINE",
    "hex_code": "66CDAA",
    "rgb": "RGB(102, 205, 170)",
    "group": "green"
  },
  {
    "html_name": "DARKSEAGREEN",
    "hex_code": "8fbc8f",
    "rgb": "RGB(143, 188, 143)",
    "group": "green"
  },
  {
    "html_name": "LIGHTSEAGREEN",
    "hex_code": "20B2AA",
    "rgb": "RGB(32, 178, 170)",
    "group": "green"
  },
  {
    "html_name": "DARKCYAN",
    "hex_code": "008B8B",
    "rgb": "RGB(0, 139, 139)",
    "group": "green"
  },
  {
    "html_name": "TEAL",
    "hex_code": "008080",
    "rgb": "RGB(0, 128, 128)",
    "group": "green"
  },
  {
    "html_name": "AQUA",
    "hex_code": "00FFFF",
    "rgb": "RGB(0, 255, 255)",
    "group": "cyan"
  },
  {
    "html_name": "CYAN",
    "hex_code": "00FFFF",
    "rgb": "RGB(0, 255, 255)",
    "group": "cyan"
  },
  {
    "html_name": "LIGHTCYAN",
    "hex_code": "E0FFFF",
    "rgb": "RGB(224, 255, 255)",
    "group": "cyan"
  },
  {
    "html_name": "PALETURQUOISE",
    "hex_code": "AFEEEE",
    "rgb": "RGB(175, 238, 238)",
    "group": "cyan"
  },
  {
    "html_name": "AQUAMARINE",
    "hex_code": "7FFFD4",
    "rgb": "RGB(127, 255, 212)",
    "group": "cyan"
  },
  {
    "html_name": "TURQUOISE",
    "hex_code": "40E0D0",
    "rgb": "RGB(64, 224, 208)",
    "group": "cyan"
  },
  {
    "html_name": "MEDIUMTURQUOISE",
    "hex_code": "48D1CC",
    "rgb": "RGB(72, 209, 204)",
    "group": "cyan"
  },
  {
    "html_name": "DARKTURQUOISE",
    "hex_code": "00CED1",
    "rgb": "RGB(0, 206, 209)",
    "group": "cyan"
  },
  {
    "html_name": "CADETBLUE",
    "hex_code": "5F9EA0",
    "rgb": "RGB(95, 158, 160)",
    "group": "blue"
  },
  {
    "html_name": "STEELBLUE",
    "hex_code": "4682B4",
    "rgb": "RGB(70, 130, 180)",
    "group": "blue"
  },
  {
    "html_name": "LIGHTSTEELBLUE",
    "hex_code": "B0C4DE",
    "rgb": "RGB(176, 196, 222)",
    "group": "blue"
  },
  {
    "html_name": "POWDERBLUE",
    "hex_code": "B0E0E6",
    "rgb": "RGB(176, 224, 230)",
    "group": "blue"
  },
  {
    "html_name": "LIGHTBLUE",
    "hex_code": "ADD8E6",
    "rgb": "RGB(173, 216, 230)",
    "group": "blue"
  },
  {
    "html_name": "SKYBLUE",
    "hex_code": "87CEEB",
    "rgb": "RGB(135, 206, 235)",
    "group": "blue"
  },
  {
    "html_name": "LIGHTSKYBLUE",
    "hex_code": "87CEFA",
    "rgb": "RGB(135, 206, 250)",
    "group": "blue"
  },
  {
    "html_name": "DEEPSKYBLUE",
    "hex_code": "00BFFF",
    "rgb": "RGB(0, 191, 255)",
    "group": "blue"
  },
  {
    "html_name": "DODGERBLUE",
    "hex_code": "1E90FF",
    "rgb": "RGB(30, 144, 255)",
    "group": "blue"
  },
  {
    "html_name": "CORNFLOWERBLUE",
    "hex_code": "6495ED",
    "rgb": "RGB(100, 149, 237)",
    "group": "blue"
  },
  {
    "html_name": "ROYALBLUE",
    "hex_code": "4169E1",
    "rgb": "RGB(65, 105, 225)",
    "group": "blue"
  },
  {
    "html_name": "BLUE",
    "hex_code": "0000FF",
    "rgb": "RGB(0, 0, 255)",
    "group": "blue"
  },
  {
    "html_name": "MEDIUMBLUE",
    "hex_code": "0000CD",
    "rgb": "RGB(0, 0, 205)",
    "group": "blue"
  },
  {
    "html_name": "DARKBLUE",
    "hex_code": "00008B",
    "rgb": "RGB(0, 0, 139)",
    "group": "blue"
  },
  {
    "html_name": "NAVY",
    "hex_code": "00008B",
    "rgb": "RGB(0, 0, 128)",
    "group": "blue"
  },
  {
    "html_name": "MIDNIGHTBLUE",
    "hex_code": "191970",
    "rgb": "RGB(25, 25, 112))",
    "group": "blue"
  },
  {
    "html_name": "CORNSILK",
    "hex_code": "FFF8DC",
    "rgb": "RGB(255, 248, 220)",
    "group": "brown"
  },
  {
    "html_name": "BLANCHEDALMOND",
    "hex_code": "FFEBCD",
    "rgb": "RGB(255, 235, 205)",
    "group": "brown"
  },
  {
    "html_name": "BISQUE",
    "hex_code": "FFE4C4",
    "rgb": "RGB(255, 228, 196)",
    "group": "brown"
  },
  {
    "html_name": "NAVAJOWHITE",
    "hex_code": "FFDEAD",
    "rgb": "RGB(255, 222, 173)",
    "group": "brown"
  },
  {
    "html_name": "WHEAT",
    "hex_code": "F5DEB3",
    "rgb": "RGB(245, 222, 179)",
    "group": "brown"
  },
  {
    "html_name": "BURLYWOOD",
    "hex_code": "DEB887",
    "rgb": "RGB(222, 184, 135)",
    "group": "brown"
  },
  {
    "html_name": "TAN",
    "hex_code": "D2B48C",
    "rgb": "RGB(210, 180, 140)",
    "group": "brown"
  },
  {
    "html_name": "ROSYBROWN",
    "hex_code": "BC8F8F",
    "rgb": "RGB(188, 143, 143)",
    "group": "brown"
  },
  {
    "html_name": "SANDYBROWN",
    "hex_code": "F4A460",
    "rgb": "RGB(244, 164, 96)",
    "group": "brown"
  },
  {
    "html_name": "GOLDENROD",
    "hex_code": "DAA520",
    "rgb": "RGB(218, 165, 32)",
    "group": "brown"
  },
  {
    "html_name": "DARKGOLDENROD",
    "hex_code": "B8860B",
    "rgb": "RGB(184, 134, 11)",
    "group": "brown"
  },
  {
    "html_name": "PERU",
    "hex_code": "CD853F",
    "rgb": "RGB(205, 133, 63)",
    "group": "brown"
  },
  {
    "html_name": "CHOCOLATE",
    "hex_code": "D2691E",
    "rgb": "RGB(210, 105, 30)",
    "group": "brown"
  },
  {
    "html_name": "SADDLEBROWN",
    "hex_code": "8B4513",
    "rgb": "RGB(139, 69, 19)",
    "group": "brown"
  },
  {
    "html_name": "SIENNA",
    "hex_code": "A0522D",
    "rgb": "RGB(160, 82, 45)",
    "group": "brown"
  },
  {
    "html_name": "BROWN",
    "hex_code": "A52A2A",
    "rgb": "RGB(165, 42, 42)",
    "group": "brown"
  },
  {
    "html_name": "MAROON",
    "hex_code": "800000",
    "rgb": "RGB(128, 0, 0)",
    "group": "brown"
  },
  {
    "html_name": "WHITE",
    "hex_code": "FFFFFF",
    "rgb": "RGB(255, 255, 255)",
    "group": "white"
  },
  {
    "html_name": "SNOW",
    "hex_code": "FFFAFA",
    "rgb": "RGB(255, 250, 250)",
    "group": "white"
  },
  {
    "html_name": "HONEYDEW",
    "hex_code": "F0FFF0",
    "rgb": "RGB(240, 255, 240)",
    "group": "white"
  },
  {
    "html_name": "MINTCREAM",
    "hex_code": "F5FFFA",
    "rgb": "RGB(245, 255, 250)",
    "group": "white"
  },
  {
    "html_name": "AZURE",
    "hex_code": "F0FFFF",
    "rgb": "RGB(240, 255, 255)",
    "group": "white"
  },
  {
    "html_name": "ALICEBLUE",
    "hex_code": "F0F8FF",
    "rgb": "RGB(240, 248, 255)",
    "group": "white"
  },
  {
    "html_name": "GHOSTWHITE",
    "hex_code": "F8F8FF",
    "rgb": "RGB(248, 248, 255)",
    "group": "white"
  },
  {
    "html_name": "WHITESMOKE",
    "hex_code": "F5F5F5",
    "rgb": "RGB(245, 245, 245)",
    "group": "white"
  },
  {
    "html_name": "SEASHELL",
    "hex_code": "FFF5EE",
    "rgb": "RGB(255, 245, 238)",
    "group": "white"
  },
  {
    "html_name": "BEIGE",
    "hex_code": "F5F5DC",
    "rgb": "RGB(245, 245, 220)",
    "group": "white"
  },
  {
    "html_name": "OLDLACE",
    "hex_code": "FDF5E6",
    "rgb": "RGB(253, 245, 230)",
    "group": "white"
  },
  {
    "html_name": "FLORALWHITE",
    "hex_code": "FDF5E6",
    "rgb": "RGB(253, 245, 230)",
    "group": "white"
  },
  {
    "html_name": "IVORY",
    "hex_code": "FFFFF0",
    "rgb": "RGB(255, 255, 240)",
    "group": "white"
  },
  {
    "html_name": "ANTIQUEWHITE",
    "hex_code": "FAEBD7",
    "rgb": "RGB(250, 235, 215)",
    "group": "white"
  },
  {
    "html_name": "LINEN",
    "hex_code": "FAF0E6",
    "rgb": "RGB(250, 240, 230)",
    "group": "white"
  },
  {
    "html_name": "LAVENDERBLUSH",
    "hex_code": "FFF0F5",
    "rgb": "RGB(255, 240, 245)",
    "group": "white"
  },
  {
    "html_name": "MISTYROSE",
    "hex_code": "FFE4E1",
    "rgb": "RGB(255, 228, 225)",
    "group": "white"
  },
  {
    "html_name": "GAINSBORO",
    "hex_code": "DCDCDC",
    "rgb": "RGB(220, 220, 220)",
    "group": "gray"
  },
  {
    "html_name": "LIGHTGRAY",
    "hex_code": "D3D3D3",
    "rgb": "RGB(211, 211, 211)",
    "group": "gray"
  },
  {
    "html_name": "SILVER",
    "hex_code": "C0C0C0",
    "rgb": "RGB(192, 192, 192)",
    "group": "gray"
  },
  {
    "html_name": "DARKGRAY",
    "hex_code": "A9A9A9",
    "rgb": "RGB(169, 169, 169)",
    "group": "gray"
  },
  {
    "html_name": "GRAY",
    "hex_code": "808080",
    "rgb": "RGB(128, 128, 128)",
    "group": "gray"
  },
  {
    "html_name": "DIMGRAY",
    "hex_code": "696969",
    "rgb": "RGB(105, 105, 105)",
    "group": "gray"
  },
  {
    "html_name": "LIGHTSLATEGRAY",
    "hex_code": "778899",
    "rgb": "RGB(119, 136, 153)",
    "group": "gray"
  },
  {
    "html_name": "SLATEGRAY",
    "hex_code": "708090",
    "rgb": "RGB(112, 128, 144)",
    "group": "gray"
  },
  {
    "html_name": "DARKSLATEGRAY",
    "hex_code": "2F4F4F",
    "rgb": "RGB(47, 79, 79)",
    "group": "gray"
  },
  {
    "html_name": "BLACK",
    "hex_code": "000000",
    "rgb": "RGB(0, 0, 0)",
    "group": "gray"
  }
];

function formatData(colorsArray){
    for (i = 0; i < colorsArray.length; i++) {
    let color = colorsArray[i];

    /* For database seeding purposes, change the name
    of the "rgb" key to rgb_string */
    color['rgb_string'] = color['rgb']; // Assign new key
    delete color['rgb']; // Delete old key
    
    /* For database seeding purposes, remove "RGB("
    and spaces and ")" from strings formatted 
    like the following: 'RGB(255, 222, 173)' */
    let existing_rgb_string = color['rgb_string']; // 'RGB(255, 222, 173)'
    let startingIndex = existing_rgb_string.indexOf('(');
    let endIndex = existing_rgb_string.indexOf(')');
      color['rgb_string'] = existing_rgb_string.substring((startingIndex + 1), (endIndex)).split(' ').join(''); // "255,222,173"
}
return colorsArray;
}

let formattedData = formatData(colorsData);
let formattedDataAsJSONString = JSON.stringify(formattedData);

fs.writeFile('colors.json', formattedDataAsJSONString, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});