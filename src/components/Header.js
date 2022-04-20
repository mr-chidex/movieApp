import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Movie } from "@material-ui/icons";

import colors from "../utils/colors";
import { FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: colors.primary,
    // color: colors.secondary,
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  mainIcon: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
});

export const Header = ({ handleChangeMode, dark }) => {
  const classes = useStyles();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <header>
      <AppBar className={classes.root}>
        <Toolbar>
          <div className={classes.mainHeader}>
            <div
              className={classes.mainIcon}
              onClick={() => window.scroll(0, 0)}
            >
              <Movie styles={{ color: colors.secondary }} />
              <Typography className={classes.movieicon} variant="h5">
                DMovies
              </Typography>
            </div>
            <FormControlLabel
              onChange={handleChangeMode}
              control={<Switch checked={dark} />}
              label={dark ? "Night" : "Light"}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </header>
  );
};
