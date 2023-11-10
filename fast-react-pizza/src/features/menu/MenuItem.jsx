import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "../ui/Button";
import MenuQuantity from "./MenuQuantity";
import { addCartItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === id),
  );

  function handleOrder() {
    dispatch(
      addCartItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col justify-start pt-0.5">
        <p className=" text-md font-semibold">{name}</p>
        <p className=" text-sm font-light capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!cartItem ? (
            <Button onClick={handleOrder} type="small" disabled={soldOut}>
              Order Now
            </Button>
          ) : (
            <MenuQuantity id={id} />
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
