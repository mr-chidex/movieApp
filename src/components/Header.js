import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Movie } from "@material-ui/icons";

import colors from "../utils/colors";
import { useEffect } from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
  mainIcon: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",

    // "&:hover": {
    //   color: colors.darkSecondary,
    //   transition: "all 0.3s ease-in-out",
    // },
  },
});

export const Header = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <header>
      <AppBar className={classes.root}>
        <Toolbar>
          <div className={classes.mainIcon} onClick={() => window.scroll(0, 0)}>
            <Movie styles={{ color: colors.secondary }} />
            <Typography className={classes.movieicon} variant="h5">
              DMovies
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  );
};
