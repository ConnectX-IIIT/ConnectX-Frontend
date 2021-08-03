import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/CarouselHome.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselHome({ CarouselImgs }) {

  const [index, setIndex] = useState(0);

  const imgURL = "https://obscure-ridge-13663.herokuapp.com/user/fetch/";

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const CarouselList = CarouselImgs.map((img, index) => {
    return (
      <Carousel.Item key={`carousel ${index}`}>
        <img
          key={img.toString()}
          className="d-block w-100 ImgCarouselHome"
          src={imgURL + img}
          alt="slide"
        />
      </Carousel.Item>
    );
  });

  return (
    <div
      style={{
        marginBottom: "1vw",
      }}
    >
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        {CarouselList}
      </Carousel>
    </div>
  );
}

export default CarouselHome;
