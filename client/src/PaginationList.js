import * as React from 'react';
import { useState} from "react";
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paginationItemRoot: {
    "& .MuiPaginationItem-root": {
      "fontFamily": 'Source Serif Pro',
      "fontWeight": '400',
      /* Per https://thoughtbot.com/blog/how-to-make-quick-calculations-in-sketch,
      "The calculation for the line height is: [font size]*[line-height]" - 
       consequently, line height here is calculated via dividing the Sketch specified
       line height (30) by the Sketch specified font size (24) */
      "lineHeight": "1.25",
      "fontSize": "24px",
      "color": "rgb(54, 60, 60)",
    },
    "& .MuiPaginationItem-root.MuiPaginationItem-page.Mui-selected": {
      "fontFamily": 'Source Serif Pro',
      "color": "rgb(54, 60, 60)",
      backgroundColor: "white",
      "text-decoration": "inherit",
      textDecoration: "underline",
      "fontWeight": '700',
      "text-underline-offset": "4.75px",
      /* TODO Regarding the pagination items featured in the Sketch file,
      note that while the selected item text features a 1px border, 
      the underline associated with the selected item does not feature 
      a border. Unable to quickly find a solution here, I moved on
       to other tasks and will revisit this when time allows.

       For reference, the following applies a border to the selected text
       AND the underline (per the above and the Sketch file, we don't want
       the underline to feature a border): 
       "-webkit-text-stroke": "1px rgb(151, 151, 151)"
      */
    }
  }

}));

export default function PaginationList(props) {
  const classes = useStyles();
  const [selectedPage, setSelectedPage] = useState(props.page);
  const handleChange = (event, page) => {
    setSelectedPage(page);
    props.onPageSelection(page);
  };
  return <Pagination classes={{ root: classes.paginationItemRoot }} count={props.count} page={selectedPage} onChange={handleChange} />;
}