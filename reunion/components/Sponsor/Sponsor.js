import "./sponsor.css";
import { useContext } from "react";
import TransContext from "../../utils/TransContext";
import { Fade } from "react-awesome-reveal";
function Sponsor(props) {
  const jsonData = useContext(TransContext);

  const title = jsonData[20][window.EFmarketCode] ? jsonData[20][window.EFmarketCode] : jsonData[20]["we"];

  return (
    <section className="sponsorSection">
      <div className="center-960">
        <Fade direction="up" triggerOnce>
          <h1>{title}</h1>
        </Fade>
        <div className="spnsorLogoArea">
          <Fade direction="up" cascade triggerOnce>
            <ul>
              <li>
                <img src="https://www.ef.com/hub/campaign-assets/images/logos/efBlack.svg" alt="sponsors" />
              </li>
            </ul>
          </Fade>
        </div>
      </div>
    </section>
  );
}

export default Sponsor;
