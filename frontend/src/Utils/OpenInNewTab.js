export function openInNewTab(url) {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}
export function openUrlInNewTabA(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  // Simulation d'un clic sur le lien
  document.body.appendChild(link); // Ajout du lien au document
  link.click(); // Simule un clic sur le lien

  // Nettoyage : retirer l'élément après le clic
  document.body.removeChild(link);
}
