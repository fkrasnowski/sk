export async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}
