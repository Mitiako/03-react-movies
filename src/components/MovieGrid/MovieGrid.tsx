import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

// Описуємо пропси компонента MovieGrid — масив фільмів і функцію для обробки вибору фільму
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  // Рендеримо галерею фільмів — наш кінотеатр у мініатюрі. Кожен фільм — це картка з постером і назвою, а кліком по ній ми переходуємо до детального опису фільму.
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}