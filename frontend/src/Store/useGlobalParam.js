import { create } from "zustand";
import i18next from "i18next";
const createSetter = (set) => (key) => (value) => set({ [key]: value });

const useGlobalParam = create((set) => ({
  language: i18next.language || "fr",
  dataKeepChoice: null,
  userEarlyAdopterCode: null,

  setLanguage: createSetter(set)("language"),
  setDataKeepChoice: createSetter(set)("dataKeepChoice"),
  setUserEarlyAdopterCode: createSetter(set)("userEarlyAdopterCode"),
}));
export default useGlobalParam;
