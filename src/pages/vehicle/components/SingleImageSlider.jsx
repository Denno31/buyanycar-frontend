import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardMedia } from "@mui/material";

export default function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "550px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "550px" }}
          image="https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "550px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "550px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
      <div>
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "550px" }}
          image="https://images.unsplash.com/photo-1578564782364-599a721f70b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        />
      </div>
    </Slider>
  );
}
