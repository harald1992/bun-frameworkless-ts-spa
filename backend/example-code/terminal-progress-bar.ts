let number = 0;

setInterval(() => {
  number += 1;
  writeStuff(number);
}, 100);

function writeStuff(number = 0) {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(-1);
  process.stdout.write(number.toString());
}

// Bun.write(Bun.stdin, "stdin");
// Bun.write(Bun.stdout, "sttout");
// Bun.write(Bun.stderr, "stderr");
