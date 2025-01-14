"use client";

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

import "./Game.css"


const randomSentences = [
  "nature has always been a source of inspiration for humanity",
  "from the vast oceans to the serene forests every corner of the natural world offers unique wonders",
  "walking through a peaceful park or watching a sunrise can bring a sense of calm and reflection",
  "nature teaches us resilience and adaptability reminding us of our interconnectedness with the environment",
  "the beauty of nature lies in its simplicity and harmony providing a sense of tranquility",
  "hiking through mountains or exploring remote landscapes can be an awe-inspiring experience",
  "the sound of birdsong or the rustle of leaves in the wind can create a serene atmosphere",
  "nature offers endless opportunities for exploration and discovery fueling curiosity and creativity",
  "every season brings a new set of wonders from blooming flowers in spring to falling leaves in autumn",
  "observing wildlife in their natural habitats helps us appreciate the diversity of life on earth",
  "the oceans cover over 70% of the earth's surface offering vast opportunities for marine exploration",
  "rain forests are home to a significant portion of the planet's biodiversity providing essential ecological services",
  "even the smallest insects play a crucial role in maintaining the balance of ecosystems",
  "mountains act as natural barriers influencing weather patterns and providing habitat for numerous species",
  "nature's cycles of growth and decay are vital for sustaining life on earth",
  "watching a sunset or a star-filled night sky evokes a sense of wonder and awe",
  "gardening is a therapeutic activity that connects us with the natural world and nurtures our environment",
  "the changing seasons provide a beautiful backdrop for photography and artistic expression",
  "natures resilience is evident in the way it regenerates after natural disasters or human intervention",
  "forests produce oxygen regulate climate and support countless species of plants and animals",
  "beachcombing offers a meditative experience as we collect shells and observe marine life",
];

const Game = () => {
  const [sentence, setSentence] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [showIndicator, setShowIndicator] = useState<boolean>(true);
  const [lastScore, setLastScore] = useState<{ wpm: number; accuracy: number }>({
    wpm: 0,
    accuracy: 0,
  });
  

  useEffect(() => {
    setSentence(
      randomSentences[Math.floor(Math.random() * randomSentences.length)]
    );
  }, []);

  useEffect(() => {
    if (startTime && !endTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const durationInMinutes = Math.max(
          (currentTime.getTime() - (startTime?.getTime() || 0)) / 60000,
          0.01
        );

        const totalCharsTyped = input.length;
        const incorrectChars = totalCharsTyped - correctChars;
        const wordsTyped = (totalCharsTyped - incorrectChars) / 5;

        const charsCorrect = sentence
          .split("")
          .filter((char, idx) => char === input[idx]).length;

        const accuracy = Math.round((charsCorrect / sentence.length) * 100);
        setAccuracy(accuracy);

        setWpm(Math.round(wordsTyped / durationInMinutes));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [input, startTime, endTime, sentence, correctChars]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Prevent holding down a key

    if (!startTime) {
      setStartTime(new Date());
    }

    if (value.length > input.length) {
      const newChar = value[value.length - 1];
      if (newChar === sentence[input.length]) {
        setCorrectChars(correctChars + 1);
      } else {
        setCorrectChars(Math.max(correctChars - 0.5, 0));
      }
    }

    setInput(value);
    setShowIndicator(false); // Hide the indicator when typing starts

    if (value.length >= sentence.length) {
      setEndTime(new Date());
      setLastScore({ wpm, accuracy });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace") {
      e.preventDefault();
    }
  };

  const handleReset = () => {
    setLastScore({ wpm, accuracy });
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setAccuracy(0);
    setWpm(0);
    setCorrectChars(0);
    setShowIndicator(true);
    setSentence(
      randomSentences[Math.floor(Math.random() * randomSentences.length)]
    );
  };

  const handleFocus = () => {
    setShowIndicator(false);
  };

  const renderInput = () => {
    const inputChars = input.split("");
    const sentenceChars = sentence.split("");

    return sentenceChars.map((char, idx) => {
      let bgColor = "";
      if (inputChars[idx] === char) {
        bgColor = "bg-green-500";
      } else if (inputChars[idx] !== undefined) {
        bgColor = "bg-red-400";
      }
      return (
        <span key={idx} className={`${bgColor} bg-opacity-[0.8]`}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
    <div className="lg:hidden">
      <h1 className="text-[5rem]">GET A PC DAWG</h1>
    </div>
    <div
      className="bg-[#302f2f] w-[1000px] bg-opacity-[0.6] backdrop-blur-xl py-[2rem] rounded-md  flex-col hidden lg:flex"
      style={{ textAlign: "center", padding: "" }}
    >
      
      <h1 className="text-6xl tracking-wider">Type FASTER!</h1>
      <p className="tracking-widest text-lg">
        <strong>Type the sentence below:</strong>
      </p>
      <p className="text-9xl">{wpm}</p>
      <div className="relative w-[800px] mx-auto py-4  ">
        {showIndicator && (
          <div className="animate-blink w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-[#1DB954] absolute left-[1rem] top-[41px]"></div>
        )}
        <p className="text-2xl px-4 italic text-[#d4d2d2] text-start">
          {renderInput()}
        </p>
        <input
          type="text"
          className="absolute top-0 left-0 w-full border border-[#999898] bg-transparent text-2xl italic text-gray-700 outline-none rounded-md"
          value={input}
          spellCheck="false"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={!!endTime}
          style={{ color: "transparent", height: "100%" }}
        />
      </div>

      {(endTime || lastScore.wpm > 0) && (
        <div className="text-2xl mt-5">
          <h2 className="">Results</h2>
          <p className="text-3xl">
            <span>WPM:</span>{" "}
            <span
              className={` ${
                lastScore.wpm > 60 ? "text-green-500" : "text-red-600"
              }`}
            >
              {endTime ? wpm : lastScore.wpm}
            </span>
          </p>
          <p className="text-3xl">
            <span className="">Accuracy:</span>{" "}
            <span
              className={`${
                lastScore.accuracy > 80 ? "text-green-500" : "text-red-600"
              }`}
            >
              {endTime ? accuracy : lastScore.accuracy}
            </span>
            %
          </p>
        </div>
      )}

      {(endTime || lastScore.wpm > 0) && (
        <div
          className="flex flex-col justify-center items-center hover:scale-110 transition-transform duration-300 cursor-pointer"
          onClick={handleReset}
        >
          <span className="text-xl">{endTime ? "Try again" : "Reset"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            viewBox="0 0 16 16"
            className="animate-spin "
          >
            <path
              fill="white"
              d="M14.9547098,7.98576084 L15.0711,7.99552 C15.6179,8.07328 15.9981,8.57957 15.9204,9.12636 C15.6826,10.7983 14.9218,12.3522 13.747,13.5654 C12.5721,14.7785 11.0435,15.5888 9.37999,15.8801 C7.7165,16.1714 6.00349,15.9288 4.48631,15.187 C3.77335,14.8385 3.12082,14.3881 2.5472,13.8537 L1.70711,14.6938 C1.07714,15.3238 3.55271368e-15,14.8776 3.55271368e-15,13.9867 L3.55271368e-15,9.99998 L3.98673,9.99998 C4.87763,9.99998 5.3238,11.0771 4.69383,11.7071 L3.9626,12.4383 C4.38006,12.8181 4.85153,13.1394 5.36475,13.3903 C6.50264,13.9466 7.78739,14.1285 9.03501,13.9101 C10.2826,13.6916 11.4291,13.0839 12.3102,12.174 C13.1914,11.2641 13.762,10.0988 13.9403,8.84476 C14.0181,8.29798 14.5244,7.91776 15.0711,7.99552 L14.9547098,7.98576084 Z M11.5137,0.812976 C12.2279,1.16215 12.8814,1.61349 13.4558,2.14905 L14.2929,1.31193 C14.9229,0.681961 16,1.12813 16,2.01904 L16,6.00001 L12.019,6.00001 C11.1281,6.00001 10.6819,4.92287 11.3119,4.29291 L12.0404,3.56441 C11.6222,3.18346 11.1497,2.86125 10.6353,2.60973 C9.49736,2.05342 8.21261,1.87146 6.96499,2.08994 C5.71737,2.30841 4.57089,2.91611 3.68976,3.82599 C2.80862,4.73586 2.23802,5.90125 2.05969,7.15524 C1.98193,7.70202 1.47564,8.08224 0.928858,8.00448 C0.382075,7.92672 0.00185585,7.42043 0.0796146,6.87364 C0.31739,5.20166 1.07818,3.64782 2.25303,2.43465 C3.42788,1.22148 4.95652,0.411217 6.62001,0.119916 C8.2835,-0.171384 9.99651,0.0712178 11.5137,0.812976 Z"
            />
          </svg>
        </div>
      )}
    </div>
    </>
  );
};

export default Game;
