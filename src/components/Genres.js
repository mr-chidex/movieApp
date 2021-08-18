import React from "react";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1rem",
  },
}));

const Genres = ({
  genres,
  setGenres,
  type,
  setPage,
  selectHandler,
  selected,
}) => {
  const classes = useStyles();

  const fetchGenres = async () => {
    try {
      const result = await axios.get(
        `/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`
      );

      setGenres(result.data.genres);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chipHandler = (genre) => {
    selectHandler(genre);
    setPage(1);
  };

  return (
    <div className={classes.root}>
      {genres?.map((genre) => (
        <Chip
          key={genre.id}
          style={{ margin: 2 }}
          label={genre.name}
          clickable
          onClick={() => chipHandler(genre)}
          color={selected === genre.id ? "primary" : ""}
        />
      ))}
    </div>
  );
};

export default React.memo(Genres);
