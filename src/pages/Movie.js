import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

import axios from "../axios";
import { defaultImage, imageBaseUrl } from "../utils/api";
import { Grid } from "@material-ui/core";
import MovieCard from "../components/MovieCard";
import colors from "../utils/colors";
// import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  container: { color: colors.secondary },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "500px",
    backgroundColor: "#ccc",
  },
  title: {
    margin: "1rem 0",
    "& h1": {
      fontSize: "1.5rem",
      fontWeight: "lighter",
    },
    "& p ": {
      margin: "1rem 0",
    },
  },
  cast: {
    margin: "1rem 0",

    "& h1": {
      fontWeight: "500",
      marginBottom: "1rem",
      fontSize: "1.6rem",
    },
  },
  similarMovies: {
    margin: "2rem 0",

    "& h1": {
      marginBottom: "1rem",
      fontSize: "1.6rem",
      fontWeight: "500",
    },
  },
  cardRoot: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    marginBottom: 25,
  },
}));

export default function Movie({ children }) {
  const classes = useStyles();
  const { movieId } = useParams();
  const { mediaType } = useParams();
  const [credits, setCredits] = useState([]);
  // const [castLength, setCastLength] = useState(0);
  const [movieData, setMovieData] = useState({});
  const [trailerId, setTrailerId] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  let limit = 10;

  useEffect(() => {
    window.scroll(0, 0);
  }, [movieId]);

  // movie data
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/${mediaType}/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setMovieData(data);
    })();
  }, [movieId, mediaType]);

  // movie cast list
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/${mediaType}/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      // setCastLength(data?.cast?.length);
      setCredits(data.cast);
    })();
  }, [movieId, mediaType]);

  // similar movies
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/${mediaType}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setSimilarMovies(data?.results);
    })();
  }, [movieId, mediaType]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // trailer
  const trailerHandler = useCallback(async () => {
    try {
      const url = await MovieTrailer(
        movieData?.title || movieData?.original_title || movieData?.name
      );
      const trailerUrl = url ? url.split("=")[1] : "";
      setTrailerId(trailerUrl);
    } catch (error) {
      // console.log(error);
    }
  }, [movieData]);

  useEffect(() => {
    trailerHandler();
  }, [trailerId, trailerHandler]);

  return (
    <main className={classes.container}>
      <div
        className={classes.background}
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${imageBaseUrl}${movieData?.poster_path})`,
        }}
      ></div>

      <div className={classes.title}>
        <h1>
          {movieData?.original_title || movieData?.name || movieData?.title}
          {movieData?.release_date &&
            `(${movieData?.release_date.split("-")[0]})`}
        </h1>
        <p className="movie_tagline">{movieData?.tagline || "..."}</p>
        <p>{movieData?.overview} </p>
      </div>

      {/* {Trailer} */}
      <div className="imageContainer">
        {trailerId && <YouTube videoId={trailerId} opts={opts} />}
      </div>

      {/* cast */}
      {credits?.length > 1 && (
        <section className={classes.cast}>
          <h1> Top Billed Casts</h1>

          <Grid container spacing={2}>
            {credits?.slice(0, limit)?.map((credit, index) => (
              <Grid key={index} item xs={6} sm={4} md={2}>
                <div>
                  <img
                    style={{ width: "100%" }}
                    src={
                      credit?.profile_path
                        ? `${imageBaseUrl}${credit?.profile_path}`
                        : `${defaultImage}`
                    }
                    alt={credit?.name}
                  />

                  <small>{credit?.name}</small>
                </div>
              </Grid>
            ))}
          </Grid>
        </section>
      )}

      {/* similar movies */}
      {similarMovies?.length > 1 && (
        <section className={classes.similarMovies}>
          <h1> Similar Movies</h1>

          <section className={classes.cardRoot}>
            {similarMovies.map((movie) => (
              <div className={classes.cardContainer} key={movie.id}>
                <MovieCard
                  title={movie.title || movie.name}
                  poster={movie.poster_path}
                  date={movie.first_air_date || movie.release_date}
                  mediaType={mediaType}
                  rating={movie?.vote_average?.toFixed(1)}
                  id={movie.id}
                />
              </div>
            ))}
          </section>
        </section>
      )}
    </main>
  );
}
