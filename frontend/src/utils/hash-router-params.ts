export function getHashParams(): { formspecname: string } {
  const params = { formspecname: "" };

  let hashLocation = window.location.hash.replace("#", "");
  // const regex = /\?(.*)/;
  const pattern = /\?([^/]+)/; // url parameters until a /

  const match = hashLocation.match(pattern);

  if (!match) {
    return params;
  }
  const urlParams = match[1];
  const keyValuePairs = urlParams.split("&");

  // Loop through the key-value pairs and populate the 'params' object
  for (const pair of keyValuePairs) {
    const [key, value] = pair.split("=");
    (params as any)[key] = decodeURIComponent(value); // Decode URI-encoded values
  }

  return params;
}
