const file = await Bun.file("database/database.json");
const fileJson = await file.json();

console.log(fileJson, " size = " + file.size + "bytes");
