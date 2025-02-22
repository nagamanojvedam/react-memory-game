function Options({ valueArray }) {
  const optionsEl = valueArray.map(({ name, value }) => (
    <option value={value} key={value}>
      {name ? name : value}
    </option>
  ));

  return optionsEl;
}

export default Options;
