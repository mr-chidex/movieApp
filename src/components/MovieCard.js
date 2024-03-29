import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { defaultImage, imageBaseUrl } from "../utils/api";
import colors from "../utils/colors";
import { Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  cardContainer: { position: "relative" },
  root: {
    height: 350,
    cursor: "pointer",
    backgroundColor: colors.primary,
    color: colors.white,
  },
  movieInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 5,
  },
  mediaType: {
    backgroundColor: colors.darkSecondary,
    color: colors.white,
    fontWeight: "bold",
    padding: "0.1rem 0.5rem",
    fontSize: 13,
    position: "absolute",
    top: 10,
    left: 10,
  },
  movieName: {
    fontWeight: "400",
    fontSize: "1rem",
  },
});

const MovieCard = ({ title, poster, date, mediaType, rating, id }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      className={classes.cardContainer}
      onClick={() => history.push(`/movies/${mediaType}/${id}`)}
    >
      <Badge
        className={classes.badge}
        badgeContent={rating}
        color="secondary"
      />
      <Card className={[classes.root, "card-container"].join(" ")}>
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
            variant="h6"
            className={classes.movieName}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieCard;
