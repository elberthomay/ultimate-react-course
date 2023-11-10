import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getCartTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const dispatch = useDispatch();
  const { state } = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = state === "loading";

  const { username, status, position, address, error } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  const cart = useSelector(getCart);
  const pizzaPrice = useSelector(getCartTotalPrice);
  const totalPrice = pizzaPrice * (withPriority ? 1.2 : 1);
  return (
    <div className="px-4 py-6">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let's go!
          </h2>

          <Form method="POST">
            <div className=" mb-12 flex flex-col gap-4 md:grid md:grid-cols-[max-content_1fr] md:items-center ">
              <label className="">First Name</label>
              <input
                className="input"
                type="text"
                defaultValue={username}
                name="customer"
                required
              />

              <label>Phone number</label>
              <input className="input" type="tel" name="phone" required />
              {formErrors?.phone && (
                <p className="col-start-2 ml-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors?.phone}
                </p>
              )}

              <label>Address</label>
              <div className="relative">
                <input
                  className="input"
                  type="text"
                  name="address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  required
                />

                {!position.latitude ? (
                  <div className="absolute right-1 top-[10%]">
                    <Button
                      nonForm={true}
                      type="small"
                      onClick={() => dispatch(fetchAddress())}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Loading" : "Fetch your location"}
                    </Button>
                  </div>
                ) : null}
              </div>
              {status === "error" && (
                <p className="col-start-2 ml-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {error}
                </p>
              )}

              <div className="col-span-2 flex items-center gap-3">
                <input
                  className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                  type="checkbox"
                  name="priority"
                  id="priority"
                  value={withPriority}
                  onChange={(e) => setWithPriority(e.target.checked)}
                />
                <label htmlFor="priority">
                  Want to give your order priority?
                </label>
              </div>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input
                type="hidden"
                name="position"
                value={
                  position.latitude
                    ? `${position.latitude},${position.longitude}`
                    : ""
                }
              />
            </div>
            <div>
              <Button
                type="primary"
                disabled={isSubmitting || status === "loading"}
              >
                {isSubmitting
                  ? "Placing order..."
                  : `Order now for ${formatCurrency(totalPrice)}`}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Phone number is incorrect.";

  if (Object.keys(errors).length !== 0) return errors;
  else {
    const newOrder = await createOrder(order);

    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
  }
}

export default CreateOrder;
