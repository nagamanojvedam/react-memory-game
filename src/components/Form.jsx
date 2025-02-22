import { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";
import Select from "./Select";

function Form({ handleSubmit, handleChange, isFirstRender }) {
  const formRef = useRef(null);

  useEffect(() => {
    !isFirstRender && formRef.current.focus();
  }, [isFirstRender]);
  return (
    <div className="form-container" ref={formRef} tabIndex={-1}>
      <p>
        Customize the game by selecting an emoji category and a number of emojis
      </p>
      <form className="wrapper">
        <Select handleChange={handleChange} />
        <RegularButton handleClick={handleSubmit}>Start Game</RegularButton>
      </form>
    </div>
  );
}

export default Form;
