import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ images, interval = 3000 }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <Carousel
      interval={interval}
      controls={true} // arrows
      indicators={true} // show dots
      pause="hover" // pause on hover
      fade // optional: fade effect
    >
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={img}
            alt={`Slide ${index}`}
            className="d-block w-100"
            style={{
              height: "250px",
              objectFit: "fill",
              borderRadius: "5px",
            }}
            draggable={false}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
