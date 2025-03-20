import ArtistCard from "@/components/ArtistCard";
import { getArtists } from "@/app/api/artists";

export default async function HomePage() {
  const artists = await getArtists();
  console.log(artists);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-14 pt-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
