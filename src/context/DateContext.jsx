import { createContext, useContext, useState, useEffect } from 'react';

const DateContext = createContext();

const STORAGE_KEY = 'romantic_dates';
const MEMORIES_KEY = 'romantic_memories';

export function DateProvider({ children }) {
  const [dates, setDates] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [memories, setMemories] = useState(() => {
    try {
      const stored = localStorage.getItem(MEMORIES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [currentPlan, setCurrentPlan] = useState({
    date: '',
    time: '',
    activity: '',
    location: '',
    place: null,
    note: '',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  }, [dates]);

  useEffect(() => {
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
  }, [memories]);

  const addDate = (dateObj) => {
    const newDate = {
      ...dateObj,
      id: Date.now(),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };
    setDates(prev => [newDate, ...prev]);
    return newDate;
  };

  const addMemory = (memory) => {
    const newMemory = {
      ...memory,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setMemories(prev => [newMemory, ...prev]);
    return newMemory;
  };

  const updateDateStatus = (id, status) => {
    setDates(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const resetPlan = () => {
    setCurrentPlan({ date: '', time: '', activity: '', location: '', place: null, note: '' });
  };

  return (
    <DateContext.Provider value={{
      dates, memories, currentPlan,
      setCurrentPlan, addDate, addMemory,
      updateDateStatus, resetPlan,
    }}>
      {children}
    </DateContext.Provider>
  );
}

export const useDateContext = () => useContext(DateContext);
