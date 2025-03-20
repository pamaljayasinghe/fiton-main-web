const fs = require("fs");
const path = require("path");
const https = require("https");

const imagesDir = path.join(__dirname, "../fiton/public/images");

// Create the directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("Created images directory");
}

// Define placeholder images to create
const placeholders = [
  {
    name: "avatar.png",
    url: "https://placehold.co/40x40/7b68ee/ffffff.png?text=User",
  },
  {
    name: "placeholder1.jpg",
    url: "https://placehold.co/300x360/e2f5ff/0b5394.jpg?text=Blue+Dress",
  },
  {
    name: "placeholder2.jpg",
    url: "https://placehold.co/300x360/333333/ffffff.jpg?text=Black+Jacket",
  },
  {
    name: "placeholder3.jpg",
    url: "https://placehold.co/300x360/ffffff/333333.jpg?text=White+Blouse",
  },
  {
    name: "placeholder4.jpg",
    url: "https://placehold.co/300x360/f9c4ff/49006a.jpg?text=Floral+Skirt",
  },
  {
    name: "placeholder5.jpg",
    url: "https://placehold.co/300x360/6b8eff/001e63.jpg?text=Denim+Jacket",
  },
];

// Download each placeholder image
placeholders.forEach(({ name, url }) => {
  const filePath = path.join(imagesDir, name);

  const file = fs.createWriteStream(filePath);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${name}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${name}: ${err.message}`);
    });
});
