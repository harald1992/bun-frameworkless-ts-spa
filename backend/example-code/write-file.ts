const data = { data: "Create data" };

// the root is aparently async function, so you can just use await
// JSON.stringify can format it by adding the tabs as indent with \t
await Bun.write("database/database.json", JSON.stringify(data, null, "\t")); // path relative to root
