import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer";

import axios from "../axios";
import colors from "../utils/colors";
import { defaultImage, imageBaseUrl } from "../utils/api";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#290D0D",
    color: colors.white,
    border: "2px solid #000",
    width: "90%",
    height: "90%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MovieModal({ children, mediaType, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [credits, setCredits] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [trailerId, setTrailerId] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchMovieData = async () => {
    const { data } = await axios.get(
      `/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log("movie-data - ", data);
    setMovieData(data);
  };

  const fetchMovieCredits = async () => {
    const { data } = await axios.get(
      `/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log("movie -", data);
    setCredits(data.cast);
  };

  useEffect(() => {
    trailerHandler();
    fetchMovieData();
    fetchMovieCredits();
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const trailerHandler = async () => {
    try {
      if (trailerId) {
        setTrailerId("");
      } else {
        const url = await MovieTrailer(
          movieData?.title || movieData?.original_title
        );
        const trailerUrl = url ? url.split("=")[1] : "";
        console.log(trailerUrl);
        setTrailerId(trailerUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <section className="modal_content">
              <div className="imageContainer">
                {/* <img
                  className="image"
                  src={
                    movieData?.backdrop_path
                      ? `${imageBaseUrl}${movieData?.backdrop_path}`
                      : `${defaultImage}`
                  }
                  alt=""
                /> */}
                {trailerId && <YouTube videoId={trailerId} opts={opts} />}
              </div>

              <div className="content_container">
                <h2 className="movie_title">
                  {movieData?.title || movieData?.original_title}{" "}
                  {movieData?.release_date &&
                    `(${movieData?.release_date.split("-")[0]})`}
                </h2>

                <p className="movie_tagline">{movieData?.tagline || "..."}</p>

                <div className="movie_description">
                  <p>{movieData?.overview}</p>
                </div>
              </div>
            </section>
            <div className="movie_carousel">
              <Carousel credits={credits} />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
