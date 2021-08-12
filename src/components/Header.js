import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../utils/colors";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.primary,
  },
});

export const Header = () => {
  const classes = useStyles();

  return (
    <header>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6">DMovies</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  );
};
