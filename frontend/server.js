const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const crawlerUserAgents = require("crawler-user-agents");

const isBot = (userAgent) => {
  if (!userAgent) return false;
  const simplifiedPatterns = [
    "robot", // Générique pour capturer une gamme variée de bots simples
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
    "linkedinbot",
    "twitterbot",
    "facebookexternalhit",
    "pinterestbot",
    "google pagespeed insights",
    "applebot",
    "curl",
    "mj12bot",
    "ahrefsbot",
    "semrushbot",
    "dotbot",
    "blexbot",
    "crawlbot",
    "adsbot-google",
    "googlebot-image",
    "googlebot-news",
    "googlebot-video",
    "seznambot",
    "qwantify",
    "archive.org_bot",
    "ccbot",
    "gigabot",
    "barkrowler",
    "zoominfobot",
    "petalbot", // Bot de recherche de Huawei
    "yacybot", // Crawler open source, YaCy
    "sistrix", // Crawler pour SISTRIX Toolbox
    "findxbot", // Bot de recherche de Findx
    "woriobot", // Bot de Worio
    "uipbot", // UIPbot, crawler web
    "serpstatbot", // Crawler pour Serpstat, outil d'analyse SEO
    "netestate", // NE Crawler, utilisé par NetEstate pour les analyses de données
    "linkfluence", // Crawler pour Linkfluence, outil de media monitoring
    "semrushbot-si", // SEMrushBot-SI, version spécifique de SEMrush
    "spbot", // Bot de search.marginalia.nu
    "ahrefsbot-m", // Mobile version of AhrefsBot
    "megaindex", // MegaIndex crawler
    "ltx71", // Crawler généraliste (ltx71.com)
    "grapeshot", // Grapeshot crawler pour le ciblage contextuel des publicités
    "bot@", // Utilisé pour identifier divers bots spécifiques
    "fetch", // Souvent utilisé dans les noms de bots qui récupèrent du contenu
    "crawler", // Générique pour tout type de crawler
    "spider", // Un autre terme générique pour les crawlers
    "check_http", // Utilisé par des outils de monitoring comme Nagios
    "snapchat", // Snapchat bot pour prévisualiser les liens
    "whatsapp", // WhatsApp bot pour prévisualiser les liens
    "outbrain", // Outbrain crawler
    "xingbot", // Xing bot pour partager des liens
    "validator", // Utilisé pour les validateurs de code et de SEO
    "instagrambot", // Instagram bot pour récupérer des images
    "redditbot", // Reddit bot pour prévisualiser les liens
  ];

  const userAgentLower = userAgent.toLowerCase();

  const result =
    crawlerUserAgents.some((crawler) =>
      new RegExp(crawler.pattern, "i").test(userAgent)
    ) || simplifiedPatterns.some((pattern) => userAgentLower.includes(pattern));

  //   console.log("Warning: User-Agent header is missing in request.");

  return result;
};

app.use((req, res, next) => {
  if (isBot(req.headers["user-agent"])) {
    const htmlFilePath = path.join(
      __dirname,
      "htmlTemplates",
      `${req.path.substring(1)}.html`
    );
    const defaultHtmlFilePath = path.join(
      __dirname,
      "htmlTemplates",
      "default.html"
    );

    fs.readFile(htmlFilePath, "utf8", (err, htmlContent) => {
      if (err) {
        fs.readFile(
          defaultHtmlFilePath,
          "utf8",
          (defaultErr, defaultHtmlContent) => {
            if (defaultErr) {
              console.error("Error reading the default HTML file:", defaultErr);
              next();
            } else {
              res.send(defaultHtmlContent);
            }
          }
        );
      } else {
        res.send(htmlContent);
      }
    });
  } else {
    next();
  }
});

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
