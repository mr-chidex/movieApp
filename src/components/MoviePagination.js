import React from "react";
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
    primary: {
      light: "#42FF5B",
      main: "#00ff22",
      dark: "#096215",
    },
  },
});

const MoviePagination = ({ changePage, numberOfPages = 4, curPage }) => {
  const classes = useStyles();

  const pageHandler = (page) => {
    changePage(page);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Pagination
          color="primary"
          count={numberOfPages}
          page={curPage}
          showFirstButton
          showLastButton
          onChange={(e, page) => pageHandler(page)}
        />
      </div>
    </ThemeProvider>
  );
};

export default MoviePagination;
