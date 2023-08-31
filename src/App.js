import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
    const stopListening = () => SpeechRecognition.stopListening();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          Click on Start Listening and speak what you want.
          <br />
          <br />
          You can also copy the text to clipboard by clicking on Copy to clipboard.
        </p>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? "Text Copied" : "Click to Copy"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
