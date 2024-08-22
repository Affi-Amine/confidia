import { create } from "zustand";

const createSetter = (set) => (key) => (value) => set({ [key]: value });

const useModalStore = create((set, get) => {
  const setter = createSetter(set);

  return {
    openConfiguration: false,
    openProjectInfos: false, // ProjectInfos : des infos du projet// ProjectInfos : des infos du projet
    openUpdateProjectInfos: false, // UpdateProjectInfos : de modification des infos du projet
    openNotifications: false,
    openProjectSelect: false,
    seeNewFeature: false, //  NewFeature :  Fonctionnalité à venir
    seeDataLostModal: false, //  DataLost : De perte des données, donné perdu si la page est quittée
    seeBadVersion: false, //  BadVersion : Indisponible dans cette version
    seeDataKeepChoice: false, // DataKeepChoice : Donné conserver lors de la sortie de page
    seeEarlyAdopterM: false, // EarlyAdopterM : Clef d'accès + devenir beta tester
    seeLimitedOfferM: false, // LimitedOfferM: redirection vers test.dsfords.com
    seePreLaunchOfferM: true, // PreLaunchOfferM : Mise en avant offre de pré lancement
    seeLearnMoreDocM: false, // LearnMoreDocM: Permet de voir les détails sur la durer de creation de la documentation
    seeImageModalM: false,
    seeDisplayGoogleform: false, // DisplayGoogleFrom : Permet d'afficher les googles form
    nameGoogleForm: "",
    seeSendMessage: false,
    prefillMessage: "",
    seeRemoveUser: false,
    seeDeleteProject: false,
    seeSendAlert: false,
    prefillAlert: {
      projectId: "",
      title: "",
      message: "",
      context: "",
    },
    seeSendReport: false,
    prefillReport: {
      projectId: "",
      title: "",
      message: "",
      context: "",
    },

    imgSrcModalM: null,
    setImgSrc: (newImgSrc) =>
      set({ imgSrcModalM: newImgSrc, seeImageModalM: true }),

    setOpenConfiguration: setter("openConfiguration"),
    setOpenProjectInfos: setter("openProjectInfos"),
    setOpenUpdateProjectInfos: setter("openUpdateProjectInfos"),
    setOpenNotifications: setter("openNotifications"),
    setOpenProjectSelect: setter("openProjectSelect"),
    setSeeNewFeature: setter("seeNewFeature"),
    setSeeDataLostModal: setter("seeDataLostModal"),
    setSeeBadVersion: setter("seeBadVersion"),
    setSeeDataKeepChoice: setter("seeDataKeepChoice"),
    setSeeEarlyAdopterM: setter("seeEarlyAdopterM"),
    setSeeLimitedOfferM: setter("seeLimitedOfferM"),
    setPreLauncherOfferM: setter("seePreLaunchOfferM"),
    setSeeLearnMoreDocM: setter("seeLearnMoreDocM"),
    setSeeImageModalM: setter("seeImageModalM"),
    setSeeDisplayGoogleform: setter("seeDisplayGoogleform"),
    setNameGoogleForm: setter("nameGoogleForm"),
    setSeeSendMessage: setter("seeSendMessage"),
    setPrefillMessage: setter("prefillMessage"),
    setSeeRemoveUser: setter("seeRemoveUser"),
    setSeeDeleteProject: setter("seeDeleteProject"),
    setSeeSendAlert: setter("seeSendAlert"),
    setPrefillAlert: setter("prefillAlert"),
    setSeeSendReport: setter("seeSendReport"),
    setPrefillReport: setter("prefillReport"),

    closeAllModals: () => {
      const state = get();
      const newState = {};
      const exceptions = [
        "openConfiguration",
        "openUpdateProjectInfos",
        "openNotifications",
        "seePreLaunchOfferM",
      ];
      Object.keys(state).forEach((key) => {
        if (
          !exceptions.includes(key) &&
          typeof state[key] === "boolean" &&
          state[key] === true
        ) {
          newState[key] = false;
        }
      });

      set(newState);
    },
    // closeAllModals: () =>
    //   set({
    //     openConfiguration: false,
    //     openProjectInfos: false,
    //     openUpdateProjectInfos: false,
    //     openNotifications: false,
    //     openProjectSelect: false,
    //     seeNewFeature: false,
    //     seeDataLostModal: false,
    //     seeBadVersion: false,
    //     seeDataKeepChoice: false,
    //     seeEarlyAdopterM: false,
    //     seeQuestionnaireM: false,
    //     seeLimitedOfferM: false,
    //     seePreLaunchOfferM: false,
    //     seeLearnMoreDocM: false,
    //   }),
  };
});
export default useModalStore;
