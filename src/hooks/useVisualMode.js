import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    setMode(newMode);
    if(replace) {
      history.pop();
    }
    setHistory([...history, newMode]);
  }

  function back () {
    if(history.length > 1) {
      history.pop();
      const length = history.length;
      setMode(history[length - 1]);
      setHistory([...history]);
    }
  }

  return { mode, transition, back };
};
