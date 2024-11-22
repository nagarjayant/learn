import { ReactElement, useState } from "react";

type Step = {
  info: string;
  component: ReactElement;
};

const cartSteps: Step[] = [
  {
    info: "Details",
    component: <div>Personal Info</div>,
  },
  {
    info: "Address",
    component: <div>Shipping Info</div>,
  },
  {
    info: "Checkout",
    component: <div>Checkout</div>,
  },
];

function ShopProgress() {
  const [currStep, setcurrStep] = useState(1);
  const [isCompleted, setisCompleted] = useState(false);

  const handleChange = () => {
    setcurrStep((prevStep) => {
      if (prevStep === cartSteps.length) {
        setisCompleted(true);
        //setBar(100);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };
  const calculateWidth = () => {
    return ((currStep - 1) / (cartSteps.length - 1)) * 100;
  };

  return (
    <div className="center-container">
      <div className="progressArea">
        <div className="progressBar">
          <div className="bar" style={{ width: `${calculateWidth()}%` }}></div>
        </div>
        <ul className="cartProcess">
          {cartSteps.map(({ info }, index) => (
            <li className={`${currStep === index + 1 ? "active" : ""} ${currStep > index + 1 || isCompleted ? "completed" : ""}`}>
              <div className="stepCir">{currStep > index + 1 || isCompleted ? <>&#10003;</> : <>{index + 1}</>}</div>
              <div className="stepInfo">{info}</div>
            </li>
          ))}
        </ul>

        {!isCompleted ? (
          <>
            <div className="stepContent">{cartSteps[currStep - 1]?.component}</div>
            <div className="stepBtn">
              <button onClick={handleChange}>{currStep === cartSteps.length ? "Finish" : "Next"}</button>
            </div>
          </>
        ) : (
          <>
            <div className="stepContent">Order placed successfully!</div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShopProgress;
