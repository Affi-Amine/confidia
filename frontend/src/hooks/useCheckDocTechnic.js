import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useConfidiaDoc from "../Store/useConfidiaDoc";

const useCheckDocTechnic = () => {
  const { docTechnic } = useConfidiaDoc();
  const history = useHistory();

  useEffect(() => {
    if (
      !docTechnic ||
      Object.keys(docTechnic).length === 0 ||
      docTechnic.length === 0
    ) {
      history.push("/documentation-script");
    }
  }, [docTechnic, history]);
};

export default useCheckDocTechnic;
