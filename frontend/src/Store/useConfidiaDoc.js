import { create } from "zustand";
import ProjectsJson from "../JSON/Projects.json";
import UsersJson from "../JSON/Users.json";

const createSetter = (set, key) => (value) => {
  // console.log(`Updating ${key} with:`, value);
  set({ [key]: value });
};
const createFunctionalSetter = (set, key) => (updateFn) => {
  set((state) => {
    const newState =
      typeof updateFn === "function" ? updateFn(state[key]) : updateFn;
    // console.log(`Updating ${key} with:`, newState);
    return { [key]: newState };
  });
};

const useConfidiaDoc = create((set) => ({
  user: {
    id_user: "dquisfgazuioehgfrjghg",
    name: "Early",
    surname: "Adopter",
    email: "EarlyAdopter@dsfords.fr",
    gitub: "https://github.com/EarlyAdopter",
    pays: "France",
    phone: "+33 6 51 84 01 01",
    images:
      "https://media.licdn.com/dms/image/C4E03AQGPSjk18h3cxg/profile-displayphoto-shrink_800_800/0/1640095975095?e=2147483647&v=beta&t=7SyfoxkB-AYKJZ2EMsqWbVucUoJR5eHJmgPbNzeE7-A",
    projects: ["Wimsical", "Arthémixxs"],
  },
  setUser: createSetter(set, "user"),
  users: UsersJson, // []
  setUsers: createSetter(set, "users"),
  allProjects: ProjectsJson, // []
  setAllProjects: createSetter(set, "allProjects"),

  dashboard: {},
  setDashboard: createFunctionalSetter(set, "dashboard"),

  docTechnic: [],
  setDocTechnic: createFunctionalSetter(set, "docTechnic"),

  filterElement: {},
  setFilterElement: createSetter(set, "filterElement"),

  listElemnts: [],
  setListElemnts: createSetter(set, "listElemnts"),

  outLog: "",
  setOutLog: createSetter(set, "outLog"),

  scriptDoc: {},
  setScriptDoc: createFunctionalSetter(set, "scriptDoc"),

  elementsDoc: {},
  setElementsDoc: createSetter(set, "elementsDoc"),

  getDocTechnic: (docTechnic) => {
    const { filterElemnts, listElemnts, techDoc, dashboardDoc } = docTechnic;

    const { out_log, scriptDoc, elementsDoc } = techDoc;

    set((state) => {
      return {
        docTechnic: docTechnic,
        dashboard: dashboardDoc,
        filterElemnts: filterElemnts,
        listElemnts: listElemnts,
        outLog: out_log,
        scriptDoc: scriptDoc,
        elementsDoc: elementsDoc,
      };
    });
  },

  resetDocTechnic: () => {
    set((s) => {
      return {
        dashboard: {},
        docTechnic: [],
        filterElement: {},
        listElements: {},
        outLog: "",
        scriptDoc: {},
        elementsDoc: {},
      };
    });
  },
}));

export default useConfidiaDoc;
