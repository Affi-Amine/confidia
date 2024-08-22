import axios from "axios";
import { AuthHeadersToken } from "./AuthHeadersToken";

const API_URL = process.env.REACT_APP_API_URL;

export async function postScript({
  content,
  demoAlias,
  demoUserAlias,
  demoDescription,
  projectImg,
  frontCompactOption,
  appLan,
  sriptLang,
  cancelToken,
}) {
  try {
    const response = await axios.post(
      `${API_URL}script/`,
      {
        content,
        demoAlias,
        demoUserAlias,
        demoDescription,
        projectImg,
        frontCompactOption,
        appLan,
        sriptLang,
      },
      {
        headers: AuthHeadersToken(),
        ...(cancelToken && { cancelToken: cancelToken }),
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting script:", error);
    throw error;
  }
}
