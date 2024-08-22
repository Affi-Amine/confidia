// DLO-1007
export function RandomColor() {
  var r = Math.floor(Math.random() * 100); // Choix aléatoire de rouge (entre 128 et 255)
  var g = Math.floor(Math.random() * 100); // Choix aléatoire de vert (entre 128 et 255)
  var b = Math.floor(Math.random() * 100); // Choix aléatoire de bleu (entre 128 et 255)
  return "rgb(" + r + "," + g + "," + b + ")"; // Retourne le format RGB en chaîne de caractères
}
