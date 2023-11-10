import { useDispatch, useSelector } from "react-redux";
import {
  decItemQuantity,
  getCartItemQuantityById,
  incItemQuantity,
} from "../cart/cartSlice";

function MenuQuantity({ id }) {
  const dispatch = useDispatch();
  const quantity = useSelector(getCartItemQuantityById(id));
  const buttonClassname = "h-10 w-10 rounded-[50%] bg-yellow-400";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => dispatch(decItemQuantity(id))}
        disabled={quantity === 0}
        className={buttonClassname}
      >
        -
      </button>
      <p>{quantity}</p>
      <button
        className={buttonClassname}
        onClick={() => dispatch(incItemQuantity(id))}
      >
        +
      </button>
    </div>
  );
}

export default MenuQuantity;
