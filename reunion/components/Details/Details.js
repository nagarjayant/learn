import "./details.css";
import { useContext } from "react";
import { Fade } from "react-awesome-reveal";
import TransContext from "../../utils/TransContext";
function Details() {
  const jsonData = useContext(TransContext);

  const para = jsonData[4][window.EFmarketCode] ? jsonData[4][window.EFmarketCode] : jsonData[4]["we"];

  return (
    <section className="detailSection tyHide">
      <div className="center-960">
        <Fade direction="up" triggerOnce>
          <p dangerouslySetInnerHTML={{ __html: para }}></p>
        </Fade>
      </div>
    </section>
  );
}

export default Details;
