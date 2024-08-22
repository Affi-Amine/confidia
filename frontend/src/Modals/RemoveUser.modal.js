import React from "react";
import "../sass/Modals/RemoveUser.scss";
import "../sass/Components/Form.scss";
import useModalStore from "../Store/useModalStore";

function RemoveUser() {
  const { seeRemoveUser, setSeeRemoveUser } = useModalStore();
  if (!seeRemoveUser) return null;
  return (
    <div className={seeRemoveUser ? "boxRemoveUser" : "None"}>
      <div className="RemoveUser">
        <p>Are you sure you want to remove this user?</p>
        </div>
      <div className="boxButtons">
        <button onClick={() => setSeeRemoveUser(false)}>No</button>
        <button onClick={() => setSeeRemoveUser(false)} className="Red">Yes</button>
      </div>
    </div>
  );
}
export default RemoveUser;
