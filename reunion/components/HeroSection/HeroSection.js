import "./hero.css";
import topLogo from "./topCon.png";
import { useEffect, useContext, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import TransContext from "../../utils/TransContext";
function HeroSection() {
  const jsonData = useContext(TransContext);
  const heroSection = useRef();
  const para = jsonData[1][window.EFmarketCode] ? jsonData[1][window.EFmarketCode] : jsonData[1]["we"];
  const cta = jsonData[2][window.EFmarketCode] ? jsonData[2][window.EFmarketCode] : jsonData[2]["we"];
  useEffect(() => {
    if (window.isMobile()) {
      let screenHeight = window.innerHeight;
      heroSection.current.style.height = screenHeight + "px";
    }
  });
  return (
    <section className="heroSection tyHide" ref={heroSection}>
      <div className="center-960">
        <div className="heroInner">
          <div className="heroConBlock">
            <Fade cascade triggerOnce>
              <img src={topLogo} alt="topCon" />
              <p dangerouslySetInnerHTML={{ __html: para }}></p>
            </Fade>
          </div>

          <div className="heroBtnArea">
            <Fade>
              <a href="#eventSection" className="button heroBtn scrollTo">
                {cta}
              </a>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
