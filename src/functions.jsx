export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
