import "./share.css";
import { useEffect, useContext } from "react";
import TransContext from "../../utils/TransContext";
import shareImage from "../../assets/shareImage.jpg";
import { Fade } from "react-awesome-reveal";
function Share(props) {
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "295874639251961",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v12.0",
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const jsonData = useContext(TransContext);
  const surl = window.location.href;

  const sharelabel = jsonData[6][window.EFmarketCode] ? jsonData[6][window.EFmarketCode] : jsonData[6]["we"];
  const shareTitle = jsonData[7][window.EFmarketCode] ? jsonData[7][window.EFmarketCode] : jsonData[7]["we"];
  const shareDesc = jsonData[8][window.EFmarketCode] ? jsonData[8][window.EFmarketCode] : jsonData[8]["we"];
  const linkCopy = jsonData[9][window.EFmarketCode] ? jsonData[9][window.EFmarketCode] : jsonData[9]["we"];
  const fbShare = () => {
    window.FB.ui(
      {
        method: "share_open_graph",
        action_type: "og.shares",
        action_properties: JSON.stringify({
          object: {
            "og:url": surl,
            "og:title": shareTitle,
            "og:description": shareDesc,
            "og:image": shareImage,
          },
        }),
      },
      function (response) {},
    );
  };
  const wpShare = () => {
    window.location.href = `https://api.whatsapp.com/send?text=${shareTitle}%0a${shareDesc}%0a${surl}`;
  };
  const lkShare = () => {
    var temp = document.querySelector(".linkArea");
    temp.value = surl;
    temp.select();
    document.execCommand("copy");
    document.querySelector("#alertBox").style.display = "block";
    setTimeout(function () {
      document.querySelector("#alertBox").style.display = "none";
    }, 1000);
  };
  return (
    <section className="shareSection tyHide">
      <div className="center-960">
        <Fade direction="up" triggerOnce>
          <label>{sharelabel}</label>
          <ul>
            <li>
              <button id="shareBtn" onClick={fbShare}>
                <img src="https://www.ef.com/hub/campaign-assets/images/icons/facebook.svg" alt="EF facebook share" />
              </button>
            </li>
            <li>
              <button className="whatsapp" onClick={wpShare}>
                <img src="https://www.ef.com/hub/campaign-assets/images/icons/whatsapp.svg" class="whatsappIcon" alt="EF whatsapp share" />
              </button>
            </li>
            <li>
              <button className="copyLink" onClick={lkShare}>
                <input className="linkArea" readonly="" />
                <img src="https://www.ef.com/hub/campaign-assets/images/icons/link.svg" alt="EF link share" />
              </button>
            </li>
          </ul>
        </Fade>
        <div id="alertBox">{linkCopy}</div>
      </div>
    </section>
  );
}

export default Share;
