import { decodeEntity } from "html-entities";

function EmojiButton({
  emoji,
  idx,
  selectedCardEntry,
  matchedCardEntry,
  handleClick,
}) {
  const btnContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : "?";
  const btnStyle = matchedCardEntry
    ? "btn--emoji__back--matched"
    : selectedCardEntry
    ? "btn--emoji__back--selected"
    : "btn--emoji__front";

  const btnAria = matchedCardEntry
    ? `${decodeEntity(emoji.name)} Matched`
    : selectedCardEntry
    ? `${decodeEntity(emoji.name)} Not Matched yet`
    : "Card upside down";

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={!selectedCardEntry ? handleClick : null}
      disabled={matchedCardEntry}
      aria-live="polite"
      aria-label={`Position ${idx}: ${btnAria}.`}
    >
      {btnContent}
    </button>
  );
}

export default EmojiButton;
