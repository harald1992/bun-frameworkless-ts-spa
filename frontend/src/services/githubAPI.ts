async function fetchUser(user: string) {
  let response = undefined;
  try {
    const res = await fetch("https://github.com/users/" + user);
    response = await res.json();
  } catch {
    // for example cors
    response = { error: "Error in fetch request" };
  }

  return response;
}

export default fetchUser;
