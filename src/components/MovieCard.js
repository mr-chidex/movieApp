import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { defaultImage, imageBaseUrl } from "../utils/api";
import colors from "../utils/colors";
import { Badge } from "@material-ui/core";
import MovieModal from "./MovieModal";

const useStyles = makeStyles({
  cardContainer: { position: "relative" },
  root: {
    width: 220,
    height: 350,
    cursor: "pointer",
    borderRadius: 10,
  },
  movieInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  badge: {
    // backgroundColor: colors.darkSecondary,
    // color: colors.white,
    // padding: "0.1rem 0.5rem",
    // fontSize: 13,
    // borderRadius: "50%",
    // boxShadow: "2px 5px 8px rgba(0,0,0,0.4)",
    position: "absolute",
    right: 8,
    top: 5,
  },
  mediaType: {
    backgroundColor: colors.darkSecondary,
    color: colors.white,
    padding: "0.1rem 0.5rem",
    fontSize: 13,
  },
});

const MovieCard = ({ title, poster, date, mediaType, rating, id }) => {
  const classes = useStyles();
  return (
    <MovieModal mediaType={mediaType} id={id}>
      <div className={classes.cardContainer}>
        <Badge
          className={classes.badge}
          badgeContent={rating}
          color="primary"
        />
        <Card className={[classes.root, "card-container"].join(" ")}>
          <CardActionArea className={classes.cardArea}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={poster ? `${imageBaseUrl}${poster}` : `${defaultImage}`}
              title={title}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                component="h2"
              >
                {title} {date && `(${date?.split("-")[0]})`}
              </Typography>
              <div className={classes.movieInfo}>
                {mediaType && (
                  <Typography
                    className={classes.mediaType}
                    gutterBottom
                    variant="body1"
                    component="h2"
                  >
                    {mediaType === "tv" ? "series" : mediaType}
                  </Typography>
                )}
                <Typography
                  className={classes.badge}
                  gutterBottom
                  variant="body1"
                  component="h2"
                >
                  {rating}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </MovieModal>
  );
};

export default MovieCard;
