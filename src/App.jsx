import { useEffect, useState } from "react";

import MemoryCard from "./components/MemoryCard";
import Form from "./components/Form";
import AssistiveTechInfo from "./components/AssistiveTechInfo";
import GameOver from "./components/GameOver";
import ErrorCard from "./components/ErrorCard";

const initialFormData = {
  category: "animals-and-nature",
  number: 10,
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prev) => [...prev, ...selectedCards]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojiData.length && matchedCards.length === emojiData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards, emojiData]);
  function handleFormChange(evnt) {
    setFormData((prev) => ({ ...prev, [evnt.target.name]: evnt.target.value }));
  }
  // console.log(emojiData);
  const turnCard = (idx, name) => {
    // console.log("clicked");
    if (selectedCards.length < 2)
      setSelectedCards((currCards) => [...currCards, { idx, name }]);

    if (selectedCards.length === 2) {
      setSelectedCards([{ idx, name }]);
    }
  };

  const startGame = async (evnt) => {
    evnt.preventDefault();
    try {
      const response = await fetch(
        `https://emojihub.yurace.pro/api/all/category/${formData.category}`
      );

      if (!response.ok) throw new Error(`Couldn't start the game`);

      const data = await response.json();

      const dataSlice = getDataSlice(data);

      const pairedArray = getEmojisArray(dataSlice);

      setEmojiData(pairedArray);
      setIsGameOn(true);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsFirstRender(false);
    }
  };

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    while (randomIndicesArray.length < formData.number) {
      const idx = Math.round(Math.random() * data.length);

      if (!randomIndicesArray.includes(idx)) randomIndicesArray.push(idx);
    }

    return randomIndicesArray;
  }

  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);

    const dataSlice = randomIndices.map((idx) => data[idx]);
    return dataSlice;
  }

  function getEmojisArray(data) {
    const pairedEmojiArray = [...data, ...data];

    for (let i = pairedEmojiArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [pairedEmojiArray[i], pairedEmojiArray[j]] = [
        pairedEmojiArray[j],
        pairedEmojiArray[i],
      ];
    }

    return pairedEmojiArray;
  }

  function resetGame() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <main>
      <h1>React Memory Game</h1>

      {!isGameOn && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          isFirstRender={isFirstRender}
        />
      )}

      {isError && <ErrorCard handleClick={resetError} />}

      {isGameOn && !areAllCardsMatched && (
        <AssistiveTechInfo emojiData={emojiData} matchedCards={matchedCards} />
      )}
      {areAllCardsMatched && <GameOver handleClick={resetGame} />}

      {isGameOn && (
        <MemoryCard
          emojiData={emojiData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
          handleClick={turnCard}
        />
      )}
    </main>
  );
}

export default App;
