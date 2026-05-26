import css from './Loader.module.css';

export default function Loader() {
  // Показуємо користувачу що фільми завантажуються
  return (
    <p className={css.text}>Loading movies, please wait...</p>
  );
}