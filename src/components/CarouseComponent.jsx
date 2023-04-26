import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <Carousel fade interval={1000} indicators={true}>
      <Carousel.Item>
        <img
          className="d-block w-100 h-500px"
          src="https://source.unsplash.com/random/900×700?sandwich"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-500px"
          src="https://source.unsplash.com/random/900×700?barbeque"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-500px"
          src="https://source.unsplash.com/random/900×700?pastry"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
