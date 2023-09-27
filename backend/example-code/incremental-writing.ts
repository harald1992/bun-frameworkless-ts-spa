import { FileSink } from "bun";

const { file, path, dir, main, url } = import.meta;

// console.log(file); // current filename
// console.log(path); // total path
// console.log(dir); // folder or directory it is in, use instead of __dirname
// console.log(main); // true or false
// console.log(url); // total url, so file:///Users/ etc

const textFile = `${import.meta.dir}/text-file.txt`;
// open writer
const myFile = Bun.file(textFile);
const writer: FileSink = myFile.writer();

// write some stuff
writer.write("Something \n");
// do some stuff
console.log("Still writing");
writer.write("Something else \n");
// do some stuff
console.log("Wrote something else");

// flush writer that commits it
console.log("finishing");
writer.flush();

// close
writer.end();
