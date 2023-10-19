import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../Loading';
import MusicCard from '../MusicCard';
import './album.css';

const InitialStateArtist = {
  artistId: 0,
  artistName: '',
  collectionId: 0,
  collectionName: '',
  collectionPrice: 0,
  artworkUrl100: '',
  releaseDate: '',
  trackCount: 0,
};

const InitialStateSong = {
  trackId: 0,
  trackName: '',
  previewUrl: '',
};

export default function Album() {
  const [musics, setMusics] = useState<SongType[]>([InitialStateSong]);
  const [artist, setArtist] = useState<AlbumType>(InitialStateArtist);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (id) {
        const songs = await getMusics(id);
        setLoading(false);
        const musicas = songs.slice(1);
        const artista = songs[0];
        setArtist(artista);
        setMusics(musicas.map((song: SongType | AlbumType) => song as SongType));
      }
    }
    setLoading(false);
    getData();
  }, [id]);

  return (
    <div className="album">
      {loading && <Loading colors="rgb(202, 202, 202)" />}
      {!loading && artist && (
        <>
          <div className="artist">
            <img src={ artist.artworkUrl100 } alt="album" />
            <h2 data-testid="artist-name">{artist.artistName}</h2>
            <p data-testid="album-name">{artist.collectionName}</p>
          </div>
          <ul className="songs">
            {musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
