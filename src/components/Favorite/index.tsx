import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../MusicCard';
import './favorites.css';

export default function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  const handleFavoriteSongs = (trackId: number) => {
    setFavoriteSongs((prevState) => prevState.filter((song) => song.trackId !== trackId));
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const favoritesSongs = await getFavoriteSongs();
      setLoading(false);
      setFavoriteSongs(favoritesSongs);
    }
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="favoriteSongs">
      <h2>Musicas Favoritas:</h2>
      {loading && <Loading colors="#333333" />}
      <ul className="songs">
        {favoriteSongs.map((favoriteSong) => (
          <MusicCard
            key={ favoriteSong.trackId }
            handleFavoriteSongs={ () => handleFavoriteSongs(favoriteSong.trackId) }
            { ...favoriteSong }
          />
        ))}
      </ul>
    </div>
  );
}
