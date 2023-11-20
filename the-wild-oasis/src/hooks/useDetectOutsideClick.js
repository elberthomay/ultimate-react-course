import { useEffect, useRef } from "react";

function useDetectOutsideClick(onClickOutside, element) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside]);
  return { ref };
}

export default useDetectOutsideClick;
