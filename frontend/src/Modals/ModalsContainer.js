import { useEffect, useRef } from "react";
import useModalStore from "../Store/useModalStore";
import BadVersion from "./BadVersion.modal";
import DataKeepChoice from "./DataKeepChoice.modal";
import DataLost from "./DataLost.modal";
import DeleteProject from "./DeleteProject.modal";
import DisplayGoogleFrom from "./DisplayGoogleForm.modal";
import EarlyAdopterM from "./EarlyAdopterM.modal";
import ImageModal from "./ImageModal.modal";
import LearnMoreDocM from "./LearnMoreDocM.modal";
import LimitedOfferM from "./LimitedOfferM.modal";
import NewFeature from "./NewFeature.modal";
import PreLaunchOfferM from "./PreLaunchOfferM.modal";
import RemoveUser from "./RemoveUser.modal";
import SendAlert from "./SendAlert.modal";
import SendMessage from "./SendMessage.modal";
import SendReport from "./SendReport.modal";

export default function ModalsContainer() {
  const closeAllModals = useModalStore((s) => s.closeAllModals);
  const modalContainerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target)
      ) {
        closeAllModals();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAllModals]);

  return (
    <div ref={modalContainerRef} className="ModalsContainer">
      <SendReport />
      <SendAlert />
      <DeleteProject />
      <RemoveUser />
      <SendMessage />
      <NewFeature />
      <DisplayGoogleFrom />
      <DataLost />
      <BadVersion />
      <LimitedOfferM />
      <EarlyAdopterM />
      <PreLaunchOfferM />
      <LearnMoreDocM />
      <DataKeepChoice />
      <ImageModal />
    </div>
  );
}
