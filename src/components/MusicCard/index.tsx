import { ChangeEvent, useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import './musicCard.css';

export default function MusicCard({
  trackId, trackName, previewUrl, handleFavoriteSongs = undefined }: SongType
& { handleFavoriteSongs?: () => void }) {
  const [checked, setChecked] = useState(false);

  const handleChecked = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setChecked(target.checked);
    if (handleFavoriteSongs) {
      handleFavoriteSongs();
    }
  };

  const handleFavoriteSong = () => {
    if (!checked) {
      addSong({
        trackId,
        trackName,
        previewUrl,
      });
    } else {
      removeSong({
        trackId,
        trackName,
        previewUrl,
      });
    }
  };

  useEffect(() => {
    async function getData() {
      const musicasFavoritas = await getFavoriteSongs();
      setChecked(musicasFavoritas.some((song) => song.trackId === trackId));
    }
    getData();
  }, [trackId]);

  return (
    <li key={ trackId }>
      {trackName}
      <div className="audio-like">
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` }>
          <img
            src={ checked ? '/checked_heart.png'
              : '/empty_heart.png' }
            alt="favorite"
          />
          <input
            style={ { width: 0 } }
            type="checkbox"
            name={ trackId.toString() }
            checked={ checked }
            onChange={ (event) => handleChecked(event) }
            onClick={ handleFavoriteSong }
          />
        </label>
      </div>
    </li>
  );
}
