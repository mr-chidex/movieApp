import React, { useCallback } from "react";
import { useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1rem",
  },
}));

export default function Genres({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  numberOfPages,
  type,
  setPage,
}) {
  const classes = useStyles();

  const fetchGenres = useCallback(async () => {
    try {
      const result = await axios.get(
        `/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`
      );

      console.log(result.data.genres);
      setGenres(result.data.genres);
    } catch (err) {
      console.log(err.message);
    }
  }, [type, setGenres]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const chipHandler = (genre) => {
    setSelectedGenres([genre, ...selectedGenres]);
    setGenres((prevGe) => prevGe.filter((gen) => gen.id !== genre.id));
    setPage(1);
  };

  const deleteHandler = (genre) => {
    setGenres((prevGen) => [...prevGen, genre]);
    setSelectedGenres((prevGe) => prevGe.filter((gen) => gen.id !== genre.id));
    setPage(1);
  };

  return (
    <div className={classes.root}>
      {selectedGenres?.map((genre) => (
        <Chip
          key={genre.id}
          style={{ margin: 2 }}
          label={genre.name}
          clickable
          onDelete={() => deleteHandler(genre)}
          color="primary"
        />
      ))}
      {genres?.map((genre) => (
        <Chip
          key={genre.id}
          style={{ margin: 2 }}
          label={genre.name}
          clickable
          onClick={() => chipHandler(genre)}
        />
      ))}
    </div>
  );
}
