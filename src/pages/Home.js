import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import { getTrending } from "../utils/api";
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

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        setErrMessage(null);
        setLoading(true);
        const movies = await axios.get(`${getTrending}&page=${page}`);
        console.log(movies);
        setTrending(movies.data.results);
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
      <h1 className="pageTitle">Trendign Movies</h1>
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
                id={trend.id}
              />
            </div>
          ))}
      </section>

      <MoviePagination changePage={changePageHandler} curPage={page} />
    </main>
  );
};

export default Home;
