export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${await response.json()}`);
  }
  const data = await response.json();
  return data;
}
