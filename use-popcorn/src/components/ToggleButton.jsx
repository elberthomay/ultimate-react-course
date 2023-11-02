export default function ToggleButton({ isOpen, toggleOpen }) {
  return (
    <button className="btn-toggle" onClick={toggleOpen}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
