import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "../ui/Button";
import { deleteCartItem } from "./cartSlice";
import MenuQuantity from "../menu/MenuQuantity";
function CartItem({ item }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, unitPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="font-bold">{formatCurrency(unitPrice * quantity)}</p>
        <MenuQuantity id={pizzaId} />
        <Button onClick={() => dispatch(deleteCartItem(pizzaId))} type="small">
          🗑️
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
