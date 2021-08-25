import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme, ThemeProvider } from "@material-ui/core";
import colors from "../utils/colors";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.white,
    },
  },
});

const useStyles = makeStyles({
  root: { display: "flex", margin: "2rem 0" },
  search: { flex: 1 },
  tab: { width: "50%" },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [, setPage] = useState(1);

  const classes = useStyles();

  const tabHandler = (tab) => {
    setType(tab);
    setPage(1);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
          <TextField
            label="Search"
            variant="filled"
            className={classes.search}
            color="primary"
          />
          <Button color="primary" variant="contained">
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          onChange={(e, val) => tabHandler(val)}
          value={type}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={classes.tab} label="Search Movies" />
          <Tab className={classes.tab} label="Search Tv Series" />
        </Tabs>
        <h1>Search Me</h1>
      </ThemeProvider>
    </div>
  );
};

export default Search;
