import "./galleryoverlay.css";
import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import ReactPlayer from "react-player/youtube";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function GalleryOverlay({ value, sliderData, galleryFade, onClose }) {
  const sliderRef = useRef();
  const playerRefs = useRef({});
  const sliderCaption = useRef();
  const [play, setPlay] = useState(true);
  let slideNum = value;
  const gallerySliderData = Array.isArray(sliderData) ? sliderData : Object.values(sliderData);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (currentSlide) => {
      if (currentSlide >= 0 && currentSlide < gallerySliderData.length && gallerySliderData[currentSlide].videoID) {
        const currentVideoId = gallerySliderData[currentSlide].videoID;
        if (playerRefs.current[currentVideoId]) {
          playerRefs.current[currentVideoId].current.showPreview(true);
        }
      }
    },
    afterChange: (currentSlide) => {
      if (currentSlide >= 0 && currentSlide < gallerySliderData.length && gallerySliderData[currentSlide].text) {
        sliderCaption.current.innerHTML = gallerySliderData[currentSlide].text;
      }
    },
  };
  useEffect(() => {
    sliderRef.current.slickGoTo(slideNum);
    if (gallerySliderData.length > 0 && slideNum >= 0) {
      sliderCaption.current.innerHTML = gallerySliderData[slideNum].text;
    }
  }, [slideNum, gallerySliderData]);

  const handleCloseClick = () => {
    onClose();
    setPlay(false);
  };

  const videoEnd = (vid) => {
    vid.current.showPreview(true);
  };

  return (
    <>
      <div className={`galleryOverlay ${galleryFade ? "" : "galleryFade"}`}></div>
      <div className={`galleryContainer ${galleryFade ? "" : "galleryFade"}`}>
        <div className="galleryMain">
          <div className="galleryHeader">
            <span className="galleryCloseBox">
              <button className="galleryClose" id="galleryClose" onClick={handleCloseClick}>
                X
              </button>
            </span>
          </div>
          <div className={`galleryMainBox ${galleryFade ? "galleryActive" : ""}`}>
            <div className="gallery-container">
              <div className="gallery-content">
                <div className="galleryBox">
                  <div className="gallerySlider">
                    <Slider {...settings} ref={sliderRef}>
                      {gallerySliderData.map((data, index) => {
                        const videoId = data.videoID;
                        if (!playerRefs.current[videoId]) {
                          playerRefs.current[videoId] = React.createRef();
                        }
                        return (
                          <div className="galleryItem" key={index}>
                            {data.videoID.length > 0 ? (
                              <>
                                <div className="galleryPlayer">
                                  <ReactPlayer ref={playerRefs.current[videoId]} controls playing={play} id={`video_${data.videoID}`} className="ytplayer" url={`https://www.youtube.com/watch?v=${data.videoID}`} light={<img src={data.imageCov} alt="Thumbnail" />} playIcon={<button className="btn-play playVidCamp"></button>} onPlay={() => setPlay(true)} onPause={() => setPlay(false)} onEnded={() => videoEnd(playerRefs.current[videoId])} />
                                </div>
                              </>
                            ) : (
                              <img src={data.imageCov} alt="ef_party" />
                            )}
                          </div>
                        );
                      })}
                    </Slider>
                    <p ref={sliderCaption}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryOverlay;
