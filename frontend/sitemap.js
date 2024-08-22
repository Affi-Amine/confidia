const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const PUBLIC_DIR = "./public";

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

const urls = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/offer", changefreq: "monthly", priority: 0.8 },
  { url: "/CGU", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
  { url: "/mentions-legal", changefreq: "monthly", priority: 0.8 },
  { url: "/specification-technique", changefreq: "daily", priority: 1 },
  { url: "/about", changefreq: "monthly", priority: 1 },
  { url: "/video-demonstration", changefreq: "monthly", priority: 0.8 },
  { url: "/homeLogin-confidia", changefreq: "monthly", priority: 0.8 },
  { url: "/dashboard", changefreq: "monthly", priority: 0.8 },
  { url: "/documentation-technique", changefreq: "monthly", priority: 0.8 },
  { url: "/documentation-script", changefreq: "monthly", priority: 0.8 },
  { url: "/user-guide", changefreq: "monthly", priority: 0.8 },
];

async function generateSitemap(hostname, urls, filename) {
  const sitemapStream = new SitemapStream({ hostname });
  const writeStream = fs.createWriteStream(`${PUBLIC_DIR}/${filename}`);

  // Pipe les données du sitemapStream vers le fichier
  sitemapStream.pipe(writeStream);

  // Ajoute chaque URL au stream
  urls.forEach((url) => sitemapStream.write(url));

  // Signale la fin de l'ajout des URLs
  sitemapStream.end();

  // Attendre que le stream finisse d'écrire dans le fichier
  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  console.log(`Sitemap écrit dans ${filename}`);
}

async function main() {
  try {
    await generateSitemap(
      "https://ds4ds-web.azurewebsites.net/",
      urls,
      "sitemap-test-ds4ds-1.xml"
    );
    await generateSitemap(
      "https://confidia.dsfords.com/",
      urls,
      "sitemap-test-ds4ds-2.xml"
    );
    await generateSitemap(
      "https://dsfords.com/",
      urls,
      "sitemap-prod-ds4ds-1.xml"
    );
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
  }
}

main();
// node sitemap.js
