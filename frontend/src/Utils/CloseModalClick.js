import useModalStore from "../Store/useModalStore";

export function CloseModalClick({ freezeOpenNotifications }) {
  const {
    openConfiguration,
    setOpenConfiguration,
    openNotifications,
    setOpenNotifications,
    openProjectSelect,
    setOpenProjectSelect,
  } = useModalStore();

  if (openConfiguration === true) {
    setOpenConfiguration(false);
  }
  if (openNotifications === true && freezeOpenNotifications !== true) {
    setOpenNotifications(false);
  }
  if (openProjectSelect === true) {
    setOpenProjectSelect(false);
  }
}
