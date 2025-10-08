import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Speech.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const levels = {
  easy: [
    "Cat",
    "Dog",
    "Sun",
    "Moon",
    "Ball",
  ],
  medium: [
    "The sun is bright",
    "Birds can fly",
    "I love ice cream",
    "Water is blue",
    "Trees are green",
  ],
  hard: [
    "The quick brown fox jumps over the lazy dog",
    "She sells seashells by the seashore",
    "How much wood would a woodchuck chuck",
    "Peter Piper picked a peck of pickled peppers",
  ],
};

function useSpeechTranscription(setText, setEvaluationResult, currentSentence) {
  useEffect(() => {
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setText(transcript);
      evaluateSpeech(transcript, currentSentence, setEvaluationResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, [currentSentence, setText, setEvaluationResult]);
}

function evaluateSpeech(transcribedText, practiceSentence, setEvaluationResult) {
  if (!transcribedText) {
    setEvaluationResult(null);
    return;
  }

  const practiceWords = practiceSentence.toLowerCase().split(" ");
  const spokenWords = transcribedText.toLowerCase().split(" ");
  const result = practiceWords.map((word, index) => ({
    word,
    spoken: spokenWords[index] || "",
    isCorrect: spokenWords[index] === word,
  }));

  setEvaluationResult(result);
}

function RenderEvaluatedText({ evaluationResult, practiceSentence }) {
  if (!evaluationResult) return <span>{practiceSentence}</span>;

  return (
    <span>
      {evaluationResult.map((item, index) => (
        <span
          key={index}
          className={item.isCorrect ? "correct-word" : "incorrect-word"}
        >
          {item.word} 
        </span>
      ))}
    </span>
  );
}

RenderEvaluatedText.propTypes = {
  evaluationResult: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      spoken: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
    })
  ),
  practiceSentence: PropTypes.string.isRequired,
};

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("easy");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const sentences = levels[currentLevel];
  const currentPracticeSentence = sentences[currentSentenceIndex];

  useSpeechTranscription(setText, setEvaluationResult, currentPracticeSentence);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const nextSentence = () => {
    setEvaluationResult(null);
    setText("");
    setCurrentSentenceIndex((prev) => (prev < sentences.length - 1 ? prev + 1 : 0));
  };

  const changeLevel = (level) => {
    setCurrentLevel(level);
    setCurrentSentenceIndex(0);
    setEvaluationResult(null);
    setText("");
  };

  return (
    <div className="speech-container">
      <h2>Speech Practice Game</h2>
      <div className="speech-buttons">
        <button onClick={isListening ? stopListening : startListening} className={isListening ? "stop-btn" : "start-btn"}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
      <p><strong>Practice this sentence:</strong></p>
      <div className="evaluation-container">
        <RenderEvaluatedText evaluationResult={evaluationResult} practiceSentence={currentPracticeSentence} />
      </div>
      <p><strong>You said:</strong> {text}</p>
      <div className="nav-buttons">
        <button onClick={nextSentence} className="next-btn">Next</button>
      </div>
      <div>
        <p><strong>Select Difficulty:</strong></p>
        <button onClick={() => changeLevel("easy")} className="level-btn">Easy</button>
        <button onClick={() => changeLevel("medium")} className="level-btn">Medium</button>
        <button onClick={() => changeLevel("hard")} className="level-btn">Hard</button>
      </div>
      <div>
        <p><strong>Full Transcribed Text:</strong></p>
        <textarea className="transcription-box" value={text} readOnly />
      </div>
    </div>
  );
}
