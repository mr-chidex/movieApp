import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme, ThemeProvider } from "@material-ui/core";
import colors from "../utils/colors";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import MoviePagination from "../components/MoviePagination";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.white,
    },
  },
});

const useStyles = makeStyles({
  root: { display: "flex", margin: "2rem 0" },
  search: { flex: 1 },
  tabs: { marginBottom: "1rem" },
  tab: { width: "50%" },
  rootCard: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  cardContainer: {
    marginBottom: 25,
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [errMessage, setErrMessage] = useState(null);
  const [movies, setMovies] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (!searchText) {
      setMovies([]);
      setNumberOfPages(0);
    }
  }, [searchText]);

  const fetchSearch = useCallback(
    async (e) => {
      // e.preventDefault();
      if (!searchText) return;

      try {
        setErrMessage(null);
        setLoading(true);
        const { data } = await axios.get(
          `/search/${type ? "tv" : "movie"}?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setMovies(data.results);
        setNumberOfPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrMessage(error.message);
      }
    },
    [page, searchText, type]
  );

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  const tabHandler = (tab) => {
    setType(tab);
    setPage(1);
  };

  const changePageHandler = (pageNum) => {
    setPage(pageNum);
  };

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
    <div>
      <ThemeProvider theme={darkTheme}>
        {/* <form onSubmit={fetchSearch}> */}
        <div className={classes.root}>
          <TextField
            label="Search"
            variant="filled"
            className={classes.search}
            color="primary"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="submit"
            onClick={fetchSearch}
            color="primary"
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </div>
        {/* </form> */}

        <Tabs
          className={classes.tabs}
          onChange={(e, val) => tabHandler(val)}
          value={type}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab className={classes.tab} label="Search Movies" />
          <Tab className={classes.tab} label="Search Tv Series" />
        </Tabs>

        {searchText &&
          movies.length < 1 &&
          !loading &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

        {loading ? (
          <h1
            style={{
              paddingTop: "20px",
              textAlign: "center",
              marginBottom: "60vh",
            }}
          >
            Searching...
          </h1>
        ) : (
          <section className={classes.rootCard}>
            {movies &&
              movies.map((movie) => (
                <div className={classes.cardContainer} key={movie.id}>
                  <MovieCard
                    title={movie.title || movie.name}
                    poster={movie.poster_path}
                    date={movie.first_air_date || movie.release_date}
                    mediaType={type ? "tv" : "movie"}
                    rating={movie.vote_average}
                    id={movie.id}
                  />
                </div>
              ))}
          </section>
        )}

        <MoviePagination
          numberOfPages={numberOfPages}
          changePage={changePageHandler}
          curPage={page}
        />
      </ThemeProvider>
    </div>
  );
};

export default Search;
