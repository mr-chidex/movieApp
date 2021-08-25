import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import { getSeries } from "../utils/api";
import MoviePagination from "../components/MoviePagination";
import Genres from "../components/Genres";

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
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
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
        const series = await axios.get(
          `${getSeries}&page=${page}&with_genres=${selected}    `
        );

        setSeries(series.data.results);
        setNumberOfPages(series.data.total_pages);
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
      <h1 className="pageTitle">Discover Tv Series</h1>
      <Genres
        type="tv"
        genres={genres}
        setGenres={setGenres}
        numberOfPages={numberOfPages}
        setPage={setPage}
        selected={selected}
        selectHandler={selectHandler}
      />
      <section className={classes.root}>
        {series &&
          series.map((series) => (
            <div className={classes.cardContainer} key={series.id}>
              <MovieCard
                title={series.title || series.name}
                poster={series.poster_path}
                date={series.first_air_date || series.release_date}
                mediaType={series.media_type || "tv"}
                rating={series.vote_average}
                id={series.id}
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
