const https = require("https");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fonts = [
  {
    name: "SpaceMono-Regular.ttf",
    url: "https://github.com/googlefonts/spacemono/raw/main/fonts/SpaceMono-Regular.ttf",
  },
  {
    name: "SpaceMono-Bold.ttf",
    url: "https://github.com/googlefonts/spacemono/raw/main/fonts/SpaceMono-Bold.ttf",
  },
];

const fontsDir = path.join(__dirname, "../assets/fonts");

// Create fonts directory if it doesn't exist
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

fonts.forEach((font) => {
  const filePath = path.join(fontsDir, font.name);
  const file = fs.createWriteStream(filePath);

  https
    .get(font.url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${font.name}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {});
      console.error(`Error downloading ${font.name}:`, err.message);
    });
});
