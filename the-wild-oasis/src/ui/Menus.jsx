import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useDetectOutsideClick from "../hooks/useDetectOutsideClick";

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  width: max-content;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: 0;
  top: 100%;
  z-index: 5;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const toggle = (id) => (id === openId ? setOpenId("") : setOpenId(id));
  const close = () => setOpenId("");
  return (
    <MenusContext.Provider value={{ openId, toggle, close }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, open, children }) {
  const { openId, toggle } = useMenus();

  const isOpen = openId === id;
  function handleClick(e) {
    e.stopPropagation();
    toggle(id);
  }
  return (
    <>
      <StyledMenu>
        <StyledToggle onClick={handleClick}>
          <HiEllipsisVertical />
        </StyledToggle>
        {isOpen && <List>{children}</List>}
      </StyledMenu>
    </>
  );
}

function Button({ children, onClick, disabled }) {
  return (
    <li>
      <StyledButton onClick={onClick} disabled={disabled}>
        {children}
      </StyledButton>
    </li>
  );
}

function List({ children }) {
  const { close } = useMenus();
  const { ref } = useDetectOutsideClick(close);
  return (
    <StyledList onClick={close} ref={ref}>
      {children}
    </StyledList>
  );
}
function useMenus() {
  const value = useContext(MenusContext);
  if (value === undefined)
    throw new Error("Menus Context called outside scope");
  else return value;
}

Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
