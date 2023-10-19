import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import Loading from '../Loading';
import './search.css';

export default function Search() {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState<string>('');
  const [results, setResult] = useState<AlbumType[]>();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearch(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setArtist(search);
    const response = await searchAlbumsAPI(search);
    setSearch('');
    setResult(response);
    setLoading(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString().substring(0, 10);
  };

  return (
    <div className="search-container">
      {!loading && (
        <form onSubmit={ handleSubmit }>
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            value={ search }
            placeholder="Nome do Artista"
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ search.length < 2 }
          >
            Pesquisar
          </button>
        </form>
      )}
      {results && (
        <h3 className="results">
          Resultado de álbuns de:
          {' '}
          <span>
            {artist}
          </span>
        </h3>
      )}
      <div className="album-search">
        {results && results.length === 0 && <p>Nenhum álbum foi encontrado</p>}
        {results && results.length !== 0 && results
          .map(({ collectionId,
            artworkUrl100, artistName, collectionName, releaseDate }) => (
              <div key={ collectionId } className="preview-album">
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <h4
                    className="name-album"
                    title={ collectionName }
                  >
                    {collectionName}
                  </h4>
                  <p className="name-artist" title={ artistName }>{artistName}</p>
                  <span className="date">{`Lançado em: ${formatDate(releaseDate)}`}</span>
                </Link>
              </div>
          ))}
      </div>
      {loading && <Loading colors="#c0c0c0" />}
    </div>
  );
}
