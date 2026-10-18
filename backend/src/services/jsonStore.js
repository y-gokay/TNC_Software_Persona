const fs = require("fs");

function readJson(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function nextId(items) {
  if (items.length === 0) {
    return 1;
  }
  return Math.max(...items.map((item) => item.id)) + 1;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

module.exports = {
  readJson,
  writeJson,
  nextId,
  today,
};
