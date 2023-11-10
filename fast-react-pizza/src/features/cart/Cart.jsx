import { Link } from "react-router-dom";
import LinkButton from "../ui/LinkButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <LinkButton to="/menu">&larr; Back to menu</LinkButton>
          <h2 className="text-xl font-bold">Your cart, {username}</h2>
          <ul className=" mt-3divide-y divide-stone-200 border-b border-b-stone-200">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>
          <div className="mt-6 space-x-2">
            <Button type="primary" to="/order/new">
              Order pizzas
            </Button>
            <Button onClick={() => dispatch(clearCart())} type="secondary">
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
