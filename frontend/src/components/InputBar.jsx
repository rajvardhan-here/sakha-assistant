import { useState } from "react";

function InputBar({ onSend, onVoiceClick }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message SAKHA..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        className="mic-btn"
        onClick={(e) => {
          e.preventDefault();
          onVoiceClick();
        }}
        title="Voice mode"
      >
        🎤
      </button>
      <button type="submit">➤</button>
    </form>
  );
}

export default InputBar;