const express = require("express");
const { chromium } = require("playwright"); // Importez chromium depuis Playwright
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

const isBot = (userAgent) => {
  const bots = [
    "googlebot",
    "bingbot",
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "sogou",
    "exabot",
    "facebot",
    "ia_archiver",
  ];
  // Vérifie que userAgent est défini avant de convertir en minuscules
  const agent = userAgent ? userAgent.toLowerCase() : "";

  // Retourne vrai si l'agent contient l'un des mots clés des bots
  return bots.some((bot) => agent.includes(bot));
};

app.use(async (req, res, next) => {
  if (isBot(req.headers["user-agent"])) {
    console.log("Bot detected, rendering page for:", req.headers["user-agent"]);

    const protocol = req.secure ? "https" : "http";
    const pageUrl = `${protocol}://${req.headers.host}${req.url}`;

    console.log("Rendering page for:", pageUrl);

    try {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(pageUrl, { waitUntil: "networkidle" });
      const html = await page.content();
      await browser.close();
      res.send(html);
    } catch (error) {
      console.error("Error rendering page for bot:", error);
      next(); // En cas d'erreur, passez à la suite des middleware
    }
  } else {
    next(); // Continuez si ce n'est pas un bot
  }
});

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// npx playwright install

// const express = require("express");
// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path"); // Ajouté pour gérer le chemin vers index.html
// const app = express();
// const PORT = process.env.PORT || 3000;

// const cachePath = path.join(__dirname, ".cache", "puppeteer");

// if (!fs.existsSync(cachePath)) {
//   fs.mkdirSync(cachePath, { recursive: true });
//   console.log(`Le dossier de cache ${cachePath} a été créé.`);
// }
// const isBot = (userAgent) => {
//   const bots = [
//     "googlebot", // Google
//     "bingbot", // Bing
//     "slurp", // Yahoo
//     "duckduckbot", // DuckDuckGo
//     "baiduspider", // Baidu
//     "yandexbot", // Yandex
//     "sogou", // Sogou
//     "exabot", // Exalead
//     "facebot", // Facebook
//     "ia_archiver", // Alexa
//   ];
//   const agent = userAgent.toLowerCase();
//   return bots.some((bot) => agent.includes(bot));
// };

// app.use(async (req, res, next) => {
//   if (isBot(req.headers["user-agent"])) {
//     console.log("Bot detected, rendering page for:", req.headers["user-agent"]);

//     const host = req.headers.host;
//     const protocol = req.secure ? "https" : "http"; // Détermine le protocole
//     const pageUrl = `${protocol}://${host}${req.url}`;

//     console.log("Rendering page for:", pageUrl);

//     // const browser = await puppeteer.launch();
//     const browser = await puppeteer.launch({
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });

//     const page = await browser.newPage();
//     await page.goto(pageUrl, { waitUntil: "networkidle2" });
//     const html = await page.content();
//     await browser.close();

//     res.send(html);
//   } else {
//     next();
//   }
// });

// app.use(express.static("build")); // Servir les fichiers statiques

// // Route catch-all pour le routage côté client
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// npm uninstall puppeteer
// >> npm install puppeteer
