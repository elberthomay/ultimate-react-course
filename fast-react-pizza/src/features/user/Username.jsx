import { useSelector } from "react-redux";

function Username() {
  const { username } = useSelector((state) => state.user);
  return username ? (
    <p className="hidden text-sm font-semibold md:block">{username}</p>
  ) : null;
}

export default Username;
