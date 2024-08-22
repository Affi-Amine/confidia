import dayjs from "dayjs";

export function checkAccess(user) {
  if (
    !user ||
    !user.AccessType ||
    !user.AccessType.confidia ||
    !user.key_freeTrial
  ) {
    // console.log("Missing essential data");
    return false; // Informer que les données essentielles sont manquantes
  }

  const { date, key_freeTrial, AccessType } = user;
  const { duration, access } = AccessType.confidia;

  // Accorder un accès illimité
  if (duration === "noLimit" || access === "noLimit") {
    // console.log("Unlimited access granted");
    return true;
  }

  // Bloquer l'accès si l'essai gratuit n'est pas activé et que l'accès n'est pas illimité
  if (
    (key_freeTrial.freeTrial_Activate === "false" && access !== "noLimit") ||
    access === "false" ||
    key_freeTrial.freeTrial_Activate === "sub"
  ) {
    // console.log("Free trial is deactivated and access is not unlimited");
    return false;
  }

  // Vérifier que la date d'inscription et la durée de l'essai gratuit sont bien définies
  if (!date || !duration) {
    // console.log("Missing date or free trial duration data");
    return false;
  }

  // Convertir la date d'inscription au format approprié et ajouter la durée de l'essai gratuit
  const signUpDate = dayjs(date, "MM/DD/YYYY");
  if (!signUpDate.isValid()) {
    // console.error("Invalid date provided:", date);
    return false;
  }

  // Calculer la date d'expiration en ajoutant la durée de l'essai gratuit
  const expirationDate = signUpDate.add(parseInt(duration), "month");
  // console.log("Expiration Date:", expirationDate.format("DD/MM/YYYY"));

  // Comparer la date actuelle avec la date d'expiration
  const isBefore = dayjs().isBefore(expirationDate);

  return isBefore;
}
