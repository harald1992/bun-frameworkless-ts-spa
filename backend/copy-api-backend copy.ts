import { BunFile } from "bun";
import { existsSync, mkdirSync } from "fs";
import { TranslationData } from "./interfaces/formspec-translation.interface";

const TRANSLATED_FORMSPECFOLDER = "./database/translatedFormspecs";

export async function handleApiBackend(req: Request): Promise<Response> {
  const url = new URL(req.url);

  let formSpecName = url.pathname.replace("/api", "");
  const newTranslatedFormSpecPath = "./database/translatedFormspecs";

  if (
    existsSync("./database/translatedFormspecs") &&
    existsSync("./database/translatedFormspecs" + formSpecName + ".json")
  ) {
    console.log("file exists");
    const translatedFormSpec = Bun.file(
      "./database/translatedFormspecs" + formSpecName + ".json"
    );
    return new Response(translatedFormSpec);
  } else {
    console.log("file does not exist");

    if (!existsSync("database/translatedFormspecs")) {
      // create dist folder so bun.write does not error out when not existing
      mkdirSync("database/translatedFormspecs");
    }
    const translatedFormspec = await getTranslatedFormSpec(formSpecName);
    return new Response(translatedFormspec);
  }
}

async function getTranslatedFormSpec(formSpecName: string): Promise<BunFile> {
  const rawFormSpecPath = "./database/formspecs" + formSpecName;
  const newTranslatedFormSpecPath =
    "./database/translatedFormspecs" + formSpecName;

  let rawFormSpec = Bun.file(rawFormSpecPath + ".json");
  let text = await rawFormSpec.text();

  let translationFile = Bun.file(rawFormSpecPath + "-resources-nl.json");
  const translationData: TranslationData = await translationFile.json();
  const inputObject = translationData.resources.translation.nl;

  const outputObject: { [key: string]: string } = {};

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const value = inputObject[key];
      const newValue = value.replace(/['"`]/g, "&quot;"); // Removes both single and double quotes

      outputObject[key] = newValue;
      console.log(newValue);
    }
  }
  console.log(outputObject);

  // Bun.write(
  //   "./crap/translation.json",
  //   JSON.stringify(outputObject, null, "\t")
  // );

  let count = 0;
  const total = Object.entries(outputObject).length;

  for (var attributename in outputObject) {
    const value = outputObject[attributename] as string;
    text = text.replaceAll(attributename, value);
    count += 1;
    // console.log(count + " / " + total);
  }

  await Bun.write(newTranslatedFormSpecPath + ".json", text);

  const translatedFormSpec = Bun.file(newTranslatedFormSpecPath + ".json");
  console.log("done converting");

  return translatedFormSpec;
}

function htmlEntityEncode(str: string) {
  return str.replaceAll(/"/g, "&quot;");
}
