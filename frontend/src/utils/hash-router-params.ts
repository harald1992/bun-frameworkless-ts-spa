export function getHashParams(): { formspecname?: string; pageId?: string } {
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

export function getUrlParameters(url: string) {
  const params = {};
  const paramStr = url.split("?")[1];

  if (!paramStr) {
    return params;
  }

  const paramPairs = paramStr.split("&");
  for (const pair of paramPairs) {
    const [key, value] = pair.split("=");
    if (key && value) {
      // Decode URI component to handle special characters
      (params as any)[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  return params;
}
