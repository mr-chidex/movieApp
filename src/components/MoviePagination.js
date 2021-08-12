import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
}));

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const MoviePagination = ({ changePage, numberOfPages = 4 }) => {
  const classes = useStyles();
  const [curPage, setCurPage] = useState(1);

  const pageHandler = (page) => {
    console.log(page);
    changePage(page);
    setCurPage(page);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Pagination
          color="primary"
          variant="outlined"
          count={numberOfPages}
          page={curPage}
          defaultPage={curPage}
          showFirstButton
          showLastButton
          onChange={(e, page) => pageHandler(page)}
        />
      </div>
    </ThemeProvider>
  );
};

export default MoviePagination;
