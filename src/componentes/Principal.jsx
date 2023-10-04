import { useEffect, useState } from 'react';
import './principalStyle.css';

function Principal() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?query=Movies&api_key=3602ae7a6ef2bada817d7d0ef720f1c6')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (data && data.results) {
      // Filtrar películas basadas en el término de búsqueda
      const filteredResults = data.results.filter((result) =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredMovies(filteredResults);
    }
  }, [data, searchTerm]);

  const getImageUrl = (path) => {
    if (!path) {
      return ''; // Si no hay ruta de imagen, devuelve una cadena vacía
    }
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el envío del formulario predeterminado
    // Realiza la búsqueda aquí si lo deseas
    // Por ejemplo, puedes agregar una llamada a la API aquí
  };

  return (
    <div className='results'>
      <header>
        <h1>MOVIE ART</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            placeholder='Avengers, star wars, the matrix...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <ul>
          {filteredMovies.map((result) => (
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
          {filteredMovies.length === 0 && <p>No se encontraron películas.</p>}
        </ul>
      </main>
    </div>
  );
}

export default Principal;
