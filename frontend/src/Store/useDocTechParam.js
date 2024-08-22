import { create } from "zustand";
const createSetter = (set) => (key) => (value) => set({ [key]: value });

const useDocTechParam = create((set) => ({
  injcodeSeeCom: false, // injectcode (code fusionner) : voir les commentaires fonctionnel
  injcodeSeePC: true, // injectcode (code fusionner) : voir le pseudo code

  //   setInjcodeSeeCom: createSetter(set)("injcodeSeeCom"),
  //   setInjcodeSeePC: createSetter(set)("injcodeSeePC"),

  setVerifInjcodeSeeCom: (value) =>
    set((state) => {
      if (!value && !state.injcodeSeePC) {
        return { injcodeSeeCom: value, injcodeSeePC: true };
      }
      return { injcodeSeeCom: value };
    }),

  setVerifInjcodeSeePC: (value) =>
    set((state) => {
      if (!value && !state.injcodeSeeCom) {
        return { injcodeSeePC: value, injcodeSeeCom: true };
      }
      return { injcodeSeePC: value };
    }),
}));

export default useDocTechParam;
