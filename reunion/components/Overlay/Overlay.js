import "./overlay.css";

function Overlay() {
  return (
    <div id="overlay">
      <div className="loaderCenter">
        <div className="loaderCon">
          <div className="col-full">
            <div className="overlayWrap">
              <img src="https://www.ef.com/hub/campaign-assets/images/ring-ori.gif" id="gif" alt="ef_loading" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
