import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./swiper.css";
import { Box } from "@mui/material";
import SwiperSliderFull from "./SwipperSliderFull";

// const images = [
//   "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZ2UlMjByb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVuenxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFtYm9yZ2hpbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1603094543704-64cdce2d2532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFuZCUyMGNydWlzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1610064094665-57e727e29f8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZCUyMGNydWlzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//   "https://images.unsplash.com/photo-1500381369072-1e8259ca5ed4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhbmQlMjBjcnVpc2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
// ];

const SwiperImage = ({ images }) => {
  const [activeThumb, setActiveThumb] = React.useState(null);
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      {/* <SwiperSliderFull
        open={false}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      >
        <Swiper
          style={{
            height: "100vh !important",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: activeThumb }}
          className="vehicle-image-slider"
          onClick={(e) => handleClickOpen()}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <img2
                style={{
                  height: "100vh",
                  width: "90vw",
                  display: "flex",
                  justifySelf: "center",
                }}
                src={item}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperSliderFull> */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="vehicle-image-slider"
        // onClick={(e) => handleClickOpen()}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        className="vehicle-image-slider-thumbs"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="thumbs-wrapper">
              <img src={item} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperImage;
