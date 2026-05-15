/** Zustand store for summarization state. */
import { create } from "zustand";
import type { SummarizeResponse } from "@/lib/api";

type InputMode = "text" | "url" | "file";
type SummaryLength = "short" | "medium" | "detailed";

interface SummaryState {
  // Input
  inputMode: InputMode;
  inputText: string;
  inputURL: string;
  inputFile: File | null;
  summaryLength: SummaryLength;
  bulletMode: boolean;

  // Output
  result: SummarizeResponse | null;
  isLoading: boolean;
  error: string | null;
  loadingMessage: string;

  // Actions
  setInputMode: (mode: InputMode) => void;
  setInputText: (text: string) => void;
  setInputURL: (url: string) => void;
  setInputFile: (file: File | null) => void;
  setSummaryLength: (length: SummaryLength) => void;
  setBulletMode: (mode: boolean) => void;
  setResult: (result: SummarizeResponse | null) => void;
  setLoading: (loading: boolean, message?: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const LOADING_MESSAGES = [
  "Analyzing article structure…",
  "Extracting key information…",
  "Generating summary…",
  "Identifying key points…",
  "Refining output…",
  "Almost there…",
];

export const useSummaryStore = create<SummaryState>((set) => ({
  inputMode: "text",
  inputText: "",
  inputURL: "",
  inputFile: null,
  summaryLength: "medium",
  bulletMode: false,
  result: null,
  isLoading: false,
  error: null,
  loadingMessage: LOADING_MESSAGES[0],

  setInputMode: (mode) => set({ inputMode: mode }),
  setInputText: (text) => set({ inputText: text }),
  setInputURL: (url) => set({ inputURL: url }),
  setInputFile: (file) => set({ inputFile: file }),
  setSummaryLength: (length) => set({ summaryLength: length }),
  setBulletMode: (mode) => set({ bulletMode: mode }),
  setResult: (result) => set({ result, isLoading: false, error: null }),
  setLoading: (loading, message) =>
    set({
      isLoading: loading,
      loadingMessage: message || LOADING_MESSAGES[0],
      error: loading ? null : undefined,
    }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () =>
    set({
      inputText: "",
      inputURL: "",
      inputFile: null,
      result: null,
      error: null,
      isLoading: false,
    }),
}));

export { LOADING_MESSAGES };
