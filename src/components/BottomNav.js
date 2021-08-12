import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import TvIcon from "@material-ui/icons/Tv";
import { useHistory } from "react-router-dom";

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
    color: colors.secondary,
  },
});

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();

  const onChangeHandler = (newValue) => {
    setValue(newValue);
    newValue === 0
      ? history.push("/")
      : newValue === 1
      ? history.push("/movies")
      : newValue === 2
      ? history.push("/tvseries")
      : newValue === 3
      ? history.push("/search")
      : history.push("/");
  };

  return (
    <div className={classes.footer}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => onChangeHandler(newValue)}
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
