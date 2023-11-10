import { useFetcher, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher = useFetcher();
  //   async function handlePriority() {
  //     await updateOrder(id, { ...order, priority: true });
  //     navigate(`/order/${id}`);
  //   }
  return (
    <>
      {!priority && (
        <fetcher.Form method="PATCH" className="text-right">
          <Button type="primary">Make priority</Button>
        </fetcher.Form>
      )}
    </>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
