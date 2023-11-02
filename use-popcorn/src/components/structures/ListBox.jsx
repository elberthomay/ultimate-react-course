import { useState } from "react";
import ToggleButton from "../ToggleButton";

export default function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleButton
        isOpen={isOpen}
        toggleOpen={() => setIsOpen((open) => !open)}
      />
      {isOpen && children}
    </div>
  );
}
