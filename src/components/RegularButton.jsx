function RegularButton({ handleClick, children }) {
  return (
    <button className="btn btn--text" onClick={handleClick}>
      {children}
    </button>
  );
}

export default RegularButton;
