import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode,setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(currentMode, replace = false) {
    setMode(currentMode);
    if (!replace) {
      setHistory(prev => [...prev, currentMode]);
    } else {
      const currentHistory = history.slice(0,history.length - 1);
      setHistory([...currentHistory, currentMode]);
    }
    
    
  };
  function back() {
    if (history.length > 1) {
      const currentHistory = history.slice(0,history.length - 1);
      
      setHistory(currentHistory);
      
      setMode(currentHistory[currentHistory.length - 1]);
    } else if (history.length === 1) {
      setMode(history[0]);
    }
    
  };

  return {mode, transition, back};

}