import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

function GameOver({ handleClick }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    wrapperRef.current.focus();
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={wrapperRef} tabIndex={-1}>
      <p className="p--large">You&apos;ve matched all the memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again!</RegularButton>
    </div>
  );
}

export default GameOver;
