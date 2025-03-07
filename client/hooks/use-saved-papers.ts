"use client";

import { useState, useEffect } from 'react';

export interface SavedPaper {
  id: string;
  title: string;
  author: string[];
  link: string;
  pdf_Link: string;
  savedAt: string;
}

export function useSavedPapers() {
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedPapers');
    if (stored) {
      setSavedPapers(JSON.parse(stored));
    }
  }, []);

  const savePaper = (paper: Omit<SavedPaper, 'id' | 'savedAt'>) => {
    const newPaper: SavedPaper = {
      ...paper,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };

    setSavedPapers((prev) => {
      const updated = [newPaper, ...prev];
      localStorage.setItem('savedPapers', JSON.stringify(updated));
      return updated;
    });
  };

  const removePaper = (id: string) => {
    setSavedPapers((prev) => {
      const updated = prev.filter((paper) => paper.id !== id);
      localStorage.setItem('savedPapers', JSON.stringify(updated));
      return updated;
    });
  };

  return { savedPapers, savePaper, removePaper };
}