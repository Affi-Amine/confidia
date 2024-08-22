import useModalStore from "../../Store/useModalStore";

export default function useStapeDisplayGoogleForm() {
  const setSeeDisplayGoogleform = useModalStore(
    (s) => s.setSeeDisplayGoogleform
  );
  const setNameGoogleForm = useModalStore((s) => s.setNameGoogleForm);

  const stapeDisplayGoogleForm = (nameDisplayform) => {
    setNameGoogleForm(nameDisplayform);

    setSeeDisplayGoogleform(true);
  };

  return stapeDisplayGoogleForm;
}
//  const stapeDisplayGoogleForm = useStapeDisplayGoogleForm();
//     stapeDisplayGoogleForm("formTopicIdeas");
