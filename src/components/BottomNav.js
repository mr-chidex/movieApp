import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import TvIcon from "@material-ui/icons/Tv";

import colors from "../utils/colors";

const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor: "transparent",
  },
  footer: {
    position: "fixed",
    display: "flex",
    bottom: 0,
    backgroundColor: colors.primary,
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "100",
  },
  bottomNav: {
    color: "white",
  },
});

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={classes.footer}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          className={classes.bottomNav}
          label="Trending"
          sty
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomNav}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomNav}
          label="Tv Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          className={classes.bottomNav}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default BottomNav;
