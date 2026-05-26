import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  // Показуємо користувачу що щось пішло не так
  return (
    <p className={css.text}>There was an error, please try again...</p>
  );
}