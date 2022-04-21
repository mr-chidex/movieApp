import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme, Grid, ThemeProvider } from "@material-ui/core";
import colors from "../utils/colors";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

import axios from "../axios";
import MovieCard from "../components/MovieCard";
import MoviePagination from "../components/MoviePagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: colors.secondary,
    },
  },
});

const useStyles = makeStyles({
  root: { display: "flex", margin: "2rem 0" },
  search: {
    flex: 1,
    backgroundColor: colors.black,
  },
  tabs: { marginBottom: "1rem" },
  tab: { width: "50%", color: colors.secondary },
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

  const fetchSearch = async (e) => {
    e.preventDefault();
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
  };

  const tabHandler = (tab) => {
    setType(tab);
    setPage(1);
  };

  const changePageHandler = (pageNum) => {
    setPage(pageNum);
  };

  if (errMessage) {
    return <ErrorMessage message={errMessage} />;
  }

  return (
    <main>
      <ThemeProvider theme={darkTheme}>
        <form onSubmit={fetchSearch}>
          <div className={classes.root}>
            <TextField
              placeholder="Search..."
              variant="filled"
              className={classes.search}
              // color="primary"
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
        </form>

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

        {loading ? (
          <Loader />
        ) : (
          <section className={classes.rootCard}>
            {movies.length > 0 && (
              <section>
                <Grid container spacing={2}>
                  {movies?.map((movie, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3}>
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
                    </Grid>
                  ))}
                </Grid>
              </section>
            )}
          </section>
        )}

        <MoviePagination
          numberOfPages={numberOfPages}
          changePage={changePageHandler}
          curPage={page}
        />
      </ThemeProvider>
    </main>
  );
};

export default Search;
