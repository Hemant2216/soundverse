export async function getArtists() {
  const response = await fetch("https://soundverse-t42y.onrender.com/artists");
  const data = await response.json();
  console.log("API Response:", data); // Debugging
  return Array.isArray(data) ? data : [];
}
