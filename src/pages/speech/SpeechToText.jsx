import { useState, useEffect } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const practiceSentences = [
  "The quick brown fox jumps over the lazy dog",
  "She sells seashells by the seashore",
  "How much wood would a woodchuck chuck",
  "Peter Piper picked a peck of pickled peppers",
];

// Speech Transcription Handler
function useSpeechTranscription(setText, setEvaluationResult, currentSentence) {
  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      const trimmedTranscript = transcript.trim();
      setText(trimmedTranscript);
      evaluateSpeech(trimmedTranscript, currentSentence, setEvaluationResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, [currentSentence]);
}

// Speech Evaluation Function
function evaluateSpeech(transcribedText, practiceSentence, setEvaluationResult) {
  if (!transcribedText) {
    setEvaluationResult(null);
    return;
  }

  const practiceWords = practiceSentence.toLowerCase().split(" ");
  const spokenWords = transcribedText.toLowerCase().split(" ");
  const result = [];
  let currentPosition = 0;

  for (let index = 0; index < practiceWords.length; index++) {
    const word = practiceWords[index];
    const spokenWord = spokenWords[currentPosition];
    const isCorrect = spokenWord === word;

    result.push({
      word: word,
      isCorrect: isCorrect,
      spoken: spokenWord || "",
    });

    if (isCorrect) {
      currentPosition++;
    } else {
      break;
    }
  }

  setEvaluationResult(result);
}

// Render Functions
function RenderEvaluatedText({ evaluationResult, practiceSentence }) {
  if (!evaluationResult) {
    return <span>{practiceSentence}</span>;
  }

  return (
    <span>
      {evaluationResult.map((item, index) => (
        <span
          key={index}
          style={{
            fontWeight: item.isCorrect ? "bold" : "normal",
            color: item.spoken && !item.isCorrect ? "red" : "black",
            marginRight: "5px",
          }}
        >
          {item.word}
        </span>
      ))}
    </span>
  );
}

function RenderSpokenText({ evaluationResult }) {
  if (!evaluationResult) {
    return null;
  }

  return (
    <span>
      {evaluationResult.map((item, index) => (
        <span
          key={index}
          style={{
            marginRight: "5px",
            color: item.spoken && !item.isCorrect ? "red" : "black",
          }}
        >
          {item.spoken || ""}
        </span>
      ))}
    </span>
  );
}

// Main Component
export default function SpeechToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const currentPracticeSentence = practiceSentences[currentSentenceIndex];

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
    setCurrentSentenceIndex((prev) =>
      prev < practiceSentences.length - 1 ? prev + 1 : 0
    );
    if (isListening) {
      recognition.stop();
      recognition.start();
    }
  };

  const prevSentence = () => {
    setEvaluationResult(null);
    setText("");
    setCurrentSentenceIndex((prev) =>
      prev > 0 ? prev - 1 : practiceSentences.length - 1
    );
    if (isListening) {
      recognition.stop();
      recognition.start();
    }
  };

  const retrySentence = () => {
    setEvaluationResult(null);
    setText("");
    if (isListening) {
      recognition.stop();
      recognition.start();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Speech to Text Practice</h2>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            padding: "10px 20px",
            margin: "0 10px 20px 10px",
            backgroundColor: isListening ? "red" : "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>
            Practice this sentence
            <p>{currentPracticeSentence}</p>
            ({currentSentenceIndex + 1}/{practiceSentences.length}):
          </strong>
        </p>
        <div style={{ minHeight: "24px" }}>
          <RenderEvaluatedText
            evaluationResult={evaluationResult}
            practiceSentence={currentPracticeSentence}
          />
        </div>
        <p><strong>You said:</strong></p>
        <div style={{ minHeight: "24px" }}>
          <RenderSpokenText evaluationResult={evaluationResult} />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button onClick={prevSentence} style={{ padding: "5px 10px", marginRight: "10px", backgroundColor: "#666", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Previous
          </button>
          <button onClick={retrySentence} style={{ padding: "5px 10px", marginRight: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Retry
          </button>
          <button onClick={nextSentence} style={{ padding: "5px 10px", backgroundColor: "#666", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Next
          </button>
        </div>
      </div>

      <div>
        <p><strong>Full Transcribed Text:</strong></p>
        <textarea
          value={text}
          readOnly
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
      </div>
    </div>
  );
}