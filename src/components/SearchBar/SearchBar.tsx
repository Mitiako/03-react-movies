import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

// Описуємо пропси компонента SearchBar
interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Обробка відправки форми через Form Actions 
  function handleSubmit(formData: FormData) {
    // Отримуємо значення з поля вводу і видаляємо зайві пробіли
    const query = (formData.get('query') as string).trim();

    // Якщо поле порожнє — показуємо сповіщення і не виконуємо пошук
    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    // Передаємо пошуковий запит в батьківський компонент 
    onSubmit(query);
  }

  // Форма пошуку — вхідні двері до світу кіно.
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
          </div>
      
      {/* Контейнер для сповіщень */}
    </header>
  );
}