import React, { useState } from "react";

function Slides({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const resetSlide = () => {
    setCurrentIndex(0);
  };
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <div id="navigation" className="text-center">
        <button data-testid="button-restart" className="small outlined" onClick={resetSlide}>
          Restart
        </button>
        <button data-testid="button-prev" className="small" onClick={prevSlide} disabled={currentIndex === 0}>
          Prev
        </button>
        <button data-testid="button-next" className="small" onClick={nextSlide} disabled={currentIndex === slides.length - 1}>
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{slides[currentIndex].title}</h1>
        <p data-testid="text">{slides[currentIndex].text}</p>
      </div>
    </div>
  );
}

export default Slides;
