import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useConfidiaDoc from "../../Store/useConfidiaDoc";
import useModalStore from "../../Store/useModalStore";

function TeamsProject() {
  const { users } = useConfidiaDoc();
  const setSeeSendMessage = useModalStore((s) => s.setSeeSendMessage);
  const setPrefillMessage = useModalStore((s) => s.setPrefillMessage);
  const setSeeNewFeature = useModalStore((s) => s.setSeeNewFeature);
  let accesEnv = ["TEST", "DEV"];
  return (
    <div className="TeamsProject">
      {/*  <ImgBox image={users[0].image} />
      <ImgBox image={users[1].image} />*/}
      {/**/}
      {/* <ImgBox image={users[2].image} />
      <ImgBox image={users[3].image} /> */}
      {/* {users.slice(0, 6).map((user, i) => {
        const { name, surname, images } = user;
        const initials = name[0] + surname[0];
        let image = false;
        return (
          <div key={i}>
            {image ? (
              <ImgBox image={image} />
            ) : (
              <div className="Boxtext">{initials}</div>
            )}
          </div>
        );
      })} */}
      <div
        className="Boxtext"
        onClick={() => {
          if (accesEnv.includes(process.env.REACT_APP_ENVNAME)) {
            setSeeSendMessage(true);
            setPrefillMessage("");
          } else {
            setSeeNewFeature(true);
          }
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
      </div>
    </div>
  );
}

export default TeamsProject;
