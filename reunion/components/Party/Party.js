import "./party.css";
import { useContext, useState } from "react";
import TransContext from "../../utils/TransContext";
import GalleryOverlay from "../GalleryOverlay/GalleryOverlay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import image1 from "../../assets/slider/test0.jpg";
import image1cov from "../../assets/slider/test0cov.jpg";
import image2 from "../../assets/slider/test1.jpg";
import image2cov from "../../assets/slider/test1cov.jpg";
import image3 from "../../assets/slider/test2.jpg";
import image3cov from "../../assets/slider/test2cov.jpg";
import image4 from "../../assets/slider/test3.jpg";
import image4cov from "../../assets/slider/test3cov.jpg";
import image5 from "../../assets/slider/test4.jpg";
import image5cov from "../../assets/slider/test4cov.jpg";
import { Fade } from "react-awesome-reveal";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function Party() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [sliderData, setsliderData] = useState(false);
  const [slideNum, setSlideNum] = useState(-1);
  const jsonData = useContext(TransContext);
  const title = jsonData[13][window.EFmarketCode] ? jsonData[13][window.EFmarketCode] : jsonData[13]["we"];
  const p1 = jsonData[14][window.EFmarketCode] ? jsonData[14][window.EFmarketCode] : jsonData[14]["we"];
  const p2 = jsonData[15][window.EFmarketCode] ? jsonData[15][window.EFmarketCode] : jsonData[15]["we"];
  const p3 = jsonData[16][window.EFmarketCode] ? jsonData[16][window.EFmarketCode] : jsonData[16]["we"];
  const p4 = jsonData[17][window.EFmarketCode] ? jsonData[17][window.EFmarketCode] : jsonData[17]["we"];
  const p5 = jsonData[18][window.EFmarketCode] ? jsonData[18][window.EFmarketCode] : jsonData[18]["we"];
  const partyData = [
    {
      image: image1,
      imageCov: image1cov,
      videoID: "",
      text: p1,
    },
    {
      image: image2,
      imageCov: image2cov,
      videoID: "69BeOPkol7I",
      text: p2,
    },
    {
      image: image3,
      imageCov: image3cov,
      videoID: "IOiUcnuPqZU",
      text: p3,
    },
    {
      image: image4,
      imageCov: image4cov,
      videoID: "B_Zq0Mrtzgc",
      text: p4,
    },
    {
      image: image5,
      imageCov: image5cov,
      videoID: "",
      text: p5,
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          infinite: true,
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function openPop(index) {
    //let clickedSlide = e.target.id;
    setSlideNum(index);
    setsliderData(partyData);
    setShowOverlay(true);
  }

  function popClose() {
    setSlideNum(-1);
    setShowOverlay(false);
  }

  return (
    <>
      <section className="partySection">
        <div className="center-1200">
          <Fade direction="up" triggerOnce>
            <h1>{title}</h1>
          </Fade>
          <div className="partyArea">
            <Fade direction="up" triggerOnce>
              <Slider {...settings}>
                {partyData.map((data, index) => {
                  return (
                    <div className="partyItem" onClick={() => openPop(index)} id={index} key={index}>
                      <img src={data.image} alt="ef_party" />
                      <p>{data.text}</p>
                    </div>
                  );
                })}
              </Slider>
            </Fade>
          </div>
        </div>
      </section>
      <GalleryOverlay value={slideNum} galleryFade={showOverlay} sliderData={sliderData} onClose={popClose} />
    </>
  );
}

export default Party;
