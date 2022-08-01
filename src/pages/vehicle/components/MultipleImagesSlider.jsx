import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardMedia } from "@mui/material";

function MultipleImagesSlider() {
  const newSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  return (
    <Slider {...newSettings}>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "120px", maxHeight: "120px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "120px", maxHeight: "120px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "120px", maxHeight: "120px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "120px", maxHeight: "120px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          sx={{ width: "150px", maxHeight: "150px" }}
          component="img"
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "120px", maxHeight: "120px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
    </Slider>
  );
}

export default MultipleImagesSlider;
