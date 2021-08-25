import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import { getMovie } from "../utils/api";
import MoviePagination from "../components/MoviePagination";
import Genres from "../components/Genres";
import Loader from "../components/Loader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  cardContainer: {
    marginBottom: 25,
  },
});

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [errMessage, setErrMessage] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState("");

  const selectedGenre = 28;
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setErrMessage(null);
        setLoading(true);
        const movies = await axios.get(
          `${getMovie}&page=${page}&with_genres=${selected}    `
        );

        setMovies(movies.data.results);
        setNumberOfPages(movies.data.total_pages);
        setLoading(false);
        window.scroll(0, 0);
      } catch (error) {
        setLoading(false);
        setErrMessage(error.message);
      }
    })();
  }, [page, selectedGenre, selected]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const changePageHandler = (pageNum) => {
    setPage(pageNum);
  };

  const selectHandler = (gen) => {
    setSelected(gen.id);
  };

  if (loading) {
    return (
      <h1
        style={{
          paddingTop: "20px",
          textAlign: "center",
          marginBottom: "60vh",
        }}
      >
        <Loader />
      </h1>
    );
  }

  if (errMessage) {
    return (
      <h1
        style={{
          paddingTop: "20px",
          textAlign: "center",
          marginBottom: "60vh",
        }}
      >
        {errMessage}
      </h1>
    );
  }

  return (
    <main>
      <h1 className="pageTitle">Discover Movies</h1>
      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        numberOfPages={numberOfPages}
        setPage={setPage}
        selected={selected}
        selectHandler={selectHandler}
      />

      <section className={classes.root}>
        {movies &&
          movies.map((movie) => (
            <div className={classes.cardContainer} key={movie.id}>
              <MovieCard
                title={movie.title || movie.name}
                poster={movie.poster_path}
                date={movie.first_air_date || movie.release_date}
                mediaType="movie"
                rating={movie.vote_average}
                id={movie.id}
              />
            </div>
          ))}
      </section>

      <MoviePagination
        numberOfPages={numberOfPages}
        changePage={changePageHandler}
        curPage={page}
      />
    </main>
  );
};

export default Movies;
