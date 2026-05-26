import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

// Описуємо пропси компонента MovieModal — об'єкт фільму і функцію для закриття модалки.
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

// Відкриваємо модальне вікно.
export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    // Забороняємо скролінг сторінки поки модалка відкрита
    document.body.style.overflow = 'hidden';

    // Закриваємо модалку при натисканні клавіші ESC
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    // Додаємо слухач події для клавіші ESC
    window.addEventListener('keydown', handleKeyDown);

    // Прибираємо все що додали коли модалка закривається
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Закриваємо модалку при кліку на backdrop (темний фон)
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  // Рендеримо модалку поза межами основного дерева компонентів через портал. Вона містить зображення, назву, опис, дату релізу і рейтинг фільму. Клік по темному фону закриває модалку.
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}