import EmojiButton from "./EmojiButton";

function MemoryCard({ emojiData, selectedCards, matchedCards, handleClick }) {
  // const emojiArray = [
  //   "🐶",
  //   "🐷",
  //   "🐙",
  //   "🐛",
  //   "🐵",
  //   "🐶",
  //   "🐷",
  //   "🐙",
  //   "🐛",
  //   "🐵",
  // ];

  const cardEl = emojiData.map((emoji, idx) => {
    const selectedCardEntry = selectedCards.find((card) => card.idx === idx);
    const matchedCardEntry = matchedCards.find((card) => card.idx === idx);

    const cardStyle = matchedCardEntry
      ? "card-item--matched"
      : selectedCardEntry
      ? "card-item--selected"
      : "";
    // console.log(emoji);

    return (
      <li key={idx + 1} className={`card-item ${cardStyle}`}>
        <EmojiButton
          // content={decodeEntity(emoji.htmlCode[0])}
          emoji={emoji}
          idx={idx + 1}
          handleClick={() => handleClick(idx, emoji.name)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    );
  });

  return <ul className="card-container">{cardEl}</ul>;
}

export default MemoryCard;
