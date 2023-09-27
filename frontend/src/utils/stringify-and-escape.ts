export function stringifyAndEscape(object: any) {
  let data = JSON.stringify(object);
  return data.replaceAll(/['"`]/g, "&quot;");
}
