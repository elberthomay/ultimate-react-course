import Modal, { useModal } from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";

function DeleteCabin({ id }) {
  const { deleteLoading, deleteCabin } = useDeleteCabin(id);
  const { close } = useModal();
  async function handleConfirm() {
    deleteCabin({}, { onSuccess: (data) => close() });
  }
  return (
    <Modal.Window name={"delete"}>
      <ConfirmDelete
        resourceName="Cabin"
        onConfirm={handleConfirm}
        disabled={deleteLoading}
      />
    </Modal.Window>
  );
}

export default DeleteCabin;
