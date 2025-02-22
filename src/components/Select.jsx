import { data } from "../../data/data";
import Options from "./Options";

function Select({ handleChange }) {
  const selectEl = Object.entries(data).map(([key, value]) => (
    <div className="form__inner-wrapper" key={key}>
      <label htmlFor={key}>Select an {key}</label>
      <select name={key} id={key} onChange={handleChange}>
        <Options valueArray={value} />
      </select>
    </div>
  ));

  return selectEl;
}

export default Select;
