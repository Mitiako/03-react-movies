import { useState } from 'react';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

export default function App() {
  // Зберігаємо список знайдених фільмів
  const [movies, setMovies] = useState<Movie[]>([]);

  // Відстежуємо завантаження даних через useState.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Відстежуємо чи сталась помилка під час запиту.
  const [isError, setIsError] = useState<boolean>(false);

  // Зберігаємо фільм який користувач обрав для перегляду деталей.
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Виконуємо пошук фільмів коли користувач відправляє форму.
  async function handleSearch(query: string) {
    // Очищаємо попередні результати та помилки перед новим пошуком.
    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      // Отримуємо фільми з TMDB API.
      const fetchedMovies = await fetchMovies(query);
      setMovies(fetchedMovies);
    } catch {
      // Показуємо помилку якщо запит не вдався.
      setIsError(true);
    } finally {
      // Лоадер має завжди показуватися після завершення запиту.
      setIsLoading(false);
    }
  }

  // Відкриваємо модалку з обраним фільмом.
  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

  // Закриваємо модалку та очищаємо результати.
  function handleCloseModal() {
    setSelectedMovie(null);
  }

  // Збираємо всі компоненти разом — головна сцена нашого кінотеатру.
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}