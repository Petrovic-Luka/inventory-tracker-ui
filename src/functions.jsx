export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(` ${await response.text()}`);
  }
  const data = await response.json();
  return data;
}
