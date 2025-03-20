export async function getArtists() {
  const response = await fetch("http://localhost:8000/artists");
  const data = await response.json();
  console.log("API Response:", data); // Debugging
  return Array.isArray(data) ? data : [];
}
