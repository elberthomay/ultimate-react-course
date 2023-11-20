import { useNavigate } from "react-router";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";

function DeleteBooking({ bookingId }) {
  const navigate = useNavigate();
  const { deleteBookingIsLoading, deleteBooking } = useDeleteBooking(bookingId);
  function handleDelete() {
    deleteBooking({}, { onSuccess: (data) => navigate("/bookings") });
  }
  return (
    <Modal.Window name="deleteBooking">
      <ConfirmDelete
        resourceName="booking"
        onConfirm={handleDelete}
        disabled={deleteBookingIsLoading}
      />
    </Modal.Window>
  );
}

export default DeleteBooking;
