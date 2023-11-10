import { useState } from "react";
import Button from "../ui/Button";
import { setUsername } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function CreateUser() {
  const [usernameInput, setUsernameInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (usernameInput) {
      dispatch(setUsername(usernameInput));
      navigate("/menu");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        className="input mb-8 w-72 "
      />

      {usernameInput !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
