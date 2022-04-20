import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";
import colors from "../utils/colors";

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
      light: colors.lightSecondary,
      main: colors.secondary,
      dark: colors.darkSecondary,
    },
  },
});

const MoviePagination = ({ changePage, numberOfPages = 4, curPage }) => {
  const classes = useStyles();

  const pageHandler = (page) => {
    changePage(page);
  };

  if (numberOfPages < 1) return null;

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
