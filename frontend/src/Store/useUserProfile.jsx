import { create } from "zustand";
import { sendDataUser } from "../Utils/isEmailAuthorized";
const createSetter = (set) => (key) => (value) => set({ [key]: value });

const useUserProfile = create((set) => ({
  userData: [], // [] donner de l'utilisateur msal
  AccessType: {}, // donner de l'utilisateur acces

  setUserData: createSetter(set)("userData"),

  loadUserData: (email) => {
    const user = sendDataUser(email);
    set({ AccessType: user });
  },
}));

export default useUserProfile;
