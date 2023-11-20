import Button from "../../ui/Button";
import { useCheckOut } from "../bookings/useUpdateBooking";

function CheckoutButton({ bookingId }) {
  const { checkOutLoading, checkOut } = useCheckOut(bookingId);
  return (
    <Button
      onClick={checkOut}
      disabled={checkOutLoading}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
