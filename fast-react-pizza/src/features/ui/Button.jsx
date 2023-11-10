import { Link } from "react-router-dom";

function Button({ children, disabled, type, onClick, to, nonForm }) {
  const base =
    "inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-600 ";

  const styles = {
    primary: base + "px-4 py-3 sm:px-6 sm:py-4",
    small: base + " px-3 py-2 md:px-4 md:py-2.5 text-sm",
    secondary:
      "px-4 py-3 sm:px-6 sm:py-4 border-2 border-stone-300 inline-block rounded-full font-semibold uppercase tracking-wide text-stone-400 transition-colors focus:outline-none  disabled:cursor-not-allowed disabled:bg-slate-100 hover:bg-stone-300 hover:text-stone-400 focus:ring-stone-200",
  };
  return (
    <>
      {to ? (
        <Link to={to} className={styles[type]}>
          {children}
        </Link>
      ) : (
        <button
          type={nonForm ? "button" : ""}
          disabled={disabled}
          onClick={onClick}
          className={styles[type]}
        >
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
