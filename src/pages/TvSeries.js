import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import { getSeries } from "../utils/api";
import MoviePagination from "../components/MoviePagination";

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

const TvSeries = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [errMessage, setErrMessage] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setErrMessage(null);
        setLoading(true);
        const movies = await axios.get(`${getSeries}&page=${page}`);

        setMovies(movies.data.results);
        setNumberOfPages(movies.data.total_pages);
        setLoading(false);
        window.scroll(0, 0);
      } catch (error) {
        setLoading(false);
        setErrMessage(error.message);
      }
    })();
  }, [page]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const changePageHandler = (pageNum) => {
    setPage(pageNum);
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
        Loading...
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
      <h1 className="pageTitle">Tv Series</h1>
      <section className={classes.root}>
        {movies &&
          movies.map((movie) => (
            <div className={classes.cardContainer} key={movie.id}>
              <MovieCard
                title={movie.title || movie.name}
                poster={movie.poster_path}
                date={movie.first_air_date || movie.release_date}
                mediaType={movie.media_type}
                rating={movie.vote_average}
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

export default TvSeries;
