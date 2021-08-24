import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";
import React from "react";
import { defaultImage, imageBaseUrl } from "../utils/api";

export default function Carousel({ credits }) {
  const handleDragStart = (e) => e.preventDefault();

  //   const items = [
  //     <img src="path-to-img" onDragStart={handleDragStart} />,
  //     <img src="path-to-img" onDragStart={handleDragStart} />,
  //     <img src="path-to-img" onDragStart={handleDragStart} />,
  //   ];

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const items = credits.map((credit) => (
    <div className="carouselCredits">
      <img
        src={
          credit?.profile_path
            ? `${imageBaseUrl}${credit?.profile_path}`
            : `${defaultImage}`
        }
        alt={credit?.name || credit?.original_name}
        onDragStart={handleDragStart}
        className="carousel_image"
      />
      <p className="carousel_name">{credit?.name || credit?.original_name}</p>
    </div>
  ));

  return (
    <div className="movie_credits">
      <AliceCarousel
        disableDotsControls
        responsive={responsive}
        mouseTracking
        disableButtonsControls
        autoPlay
        infinite
        items={items}
      />
    </div>
  );
}
