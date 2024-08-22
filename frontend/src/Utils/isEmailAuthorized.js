import ListeMailUser from "../JSON/AccessListe.json";

export function isEmailAuthorized(email) {
  return ListeMailUser.some((entry) => entry.email === email);
}
export function isEmailEarlyAdopterAuthorized(email, earlyAdopterKey) {
  const user = ListeMailUser.find(
    (user) => user.email === email && user.key_earlyAdopter
  );
  return user && user.key_earlyAdopter === earlyAdopterKey;
}

export function freeTrialAuthEmail(email) {
  const user = ListeMailUser.find((user) => user.email === email);

  if (!user || !user.key_freeTrial || !user.AccessType) {
    return "sub";
  }

  if (user.key_freeTrial.freeTrial_Activate === "sub") {
    return "sub";
  }
  if (user.key_freeTrial.freeTrial_Activate === "true") {
    return true;
  } else {
    return false;
  }
}

export function accessTypeConfidia(email) {
  const user = ListeMailUser.find((user) => user.email === email);

  if (!user.AccessType) {
  }
}

export function sendDataUser(email) {
  const user = ListeMailUser.find((user) => user.email === email);
  return user;
}
