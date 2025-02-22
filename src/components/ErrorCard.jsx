import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

function ErrorCard({ handleClick }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current.focus();
  }, []);
  return (
    <div className="wrapper wrapper--accent" ref={wrapperRef} tabIndex={-1}>
      <p className="p--large">Sorry, there was an error</p>
      <p className="p--regular">
        Please come back later or click the button below to try restarting the
        game.
      </p>
      <RegularButton handleClick={handleClick}>Restart game</RegularButton>
    </div>
  );
}

export default ErrorCard;
