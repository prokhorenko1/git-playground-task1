const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "notes.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { nextId: 1, notes: [] };
  }
}

function save(info) {
  fs.writeFileSync(FILE, JSON.stringify(info, null, 2));
}

function all() {
  return load().notes;
}

function getOne(id) {
  const info = load();
  return info.notes.find((n) => n.id === id);
}

function add(text) {
  const info = load();
  const note = { id: info.nextId, text };
  info.notes.push(note);
  info.nextId += 1;
  save(info);
  return note;
}

function remove(id) {
  const info = load();
  const before = info.notes.length;
  info.notes = info.notes.filter((n) => n.id !== id);
  save(info);
  return info.notes.length < before;
}

module.exports = { all, add, remove };
