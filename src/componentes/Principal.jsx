import { useEffect, useState } from 'react';
import './principalStyle.css';

function Principal() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?query=Movies&api_key=3602ae7a6ef2bada817d7d0ef720f1c6')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

    const getImageUrl = (path) => {
      if (!path) {
        return ''; // Si no hay ruta de imagen, devuelve una cadena vacía
      }
      return `https://image.tmdb.org/t/p/w500${path}`;
    };
  
  return (
    <div className='results'>
      <header>
        <h1>MOVIE ART</h1>
        <form className='form'>
          <input placeholder='Avengers, star wars, the matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <ul>
          {data?.results?.map((result) => (
            <div key={result.id}>
              {/* Verificar si poster_path existe */}
              {result.poster_path && (
                <img src={getImageUrl(result.poster_path)} alt={result.title} />
              )}

              {/* Verificar si title existe */}
              {result.title && <h2>{result.title}</h2>}

              {/* Verificar si release_date existe */}
              {result.release_date && <p>{result.release_date}</p>}
            </div>
          ))}

          {/* Manejo de resultados vacíos */}
          {data?.results?.length === 0 && <p>No se encontraron películas.</p>}
        </ul>
      </main>
    </div>
  );
}

export default Principal;
