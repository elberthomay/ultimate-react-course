import { Link } from "react-router-dom";

function Button({ children, disabled, onClick, to }) {
  const className =
    "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-600 sm:px-6 sm:py-4";
  return (
    <>
      {to ? (
        <Link to={to} className={className}>
          {children}
        </Link>
      ) : (
        <button disabled={disabled} onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </>
  );
}

export default Button;
