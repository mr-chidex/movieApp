import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import { getMovie } from "../utils/api";
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

const Movies = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const movies = await axios.get(`${getMovie}&page=${page}`);

        setTrending(movies.data.results);
        setLoading(false);
        window.scroll(0, 0);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const changePageHandler = (pageNum) => {
    console.log(pageNum);
    setPage(pageNum);
    // window.scroll(0, 0);
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

  return (
    <main>
      <h1 className="pageTitle">Trending</h1>
      <section className={classes.root}>
        {trending &&
          trending.map((trend) => (
            <div className={classes.cardContainer} key={trend.id}>
              <MovieCard
                title={trend.title || trend.name}
                poster={trend.poster_path}
                date={trend.first_air_date || trend.release_date}
                mediaType={trend.media_type}
                rating={trend.vote_average}
              />
            </div>
          ))}
      </section>

      <MoviePagination changePage={changePageHandler} />
    </main>
  );
};

export default Movies;
