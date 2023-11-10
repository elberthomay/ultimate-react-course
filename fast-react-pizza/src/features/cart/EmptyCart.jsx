import { Link } from "react-router-dom";
import LinkButton from "../ui/LinkButton";

function EmptyCart() {
  return (
    <>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <div className="px-4 py-3">
        {/* <Link to="/menu">&larr; Back to menu</Link> */}

        <p className="mt-7 font-semibold">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      </div>
    </>
  );
}

export default EmptyCart;
