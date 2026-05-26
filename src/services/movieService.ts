import axios from 'axios';
import type { Movie } from '../types/movie';

// Описуємо структуру відповіді від TMDB API
interface MovieSearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

// Функція для пошуку фільмів за ключовим словом
export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieSearchResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        // Запит який користувач вводить лапками щоб шукати фільми
        query: query,
      },
      headers: {
        // "Привіт! Я маю право робити запити — ось мій "СЕКРЕТНИЙ" токен як доказ!"
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  // Повертаємо масив фільмів з respond.
  return response.data.results;
}