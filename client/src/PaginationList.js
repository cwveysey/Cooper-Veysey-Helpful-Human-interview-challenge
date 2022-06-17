import * as React from 'react';
import { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@material-ui/core/styles';
const { stringify } = require('flatted');

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      // color: "#fff"
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
  return <Pagination classes={{ ul: classes.ul }} count={props.count} page={selectedPage} onChange={handleChange} />;
}