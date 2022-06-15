import { useState } from "react";

export default function useVisualMode(initial) {
  // mode will always be the last element of history,
  // therefore you don't have to create mode state,
  // just return mode(last element of history array at the bottom)

  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
    setHistory((prev) => [...prev, newMode]);
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }

  // returning the last history element as mode
  return { mode: history[history.length - 1], transition, back };
}
