import Modal, { useModal } from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function UpdateCabin({ cabin }) {
  const { close } = useModal();
  return (
    <Modal.Window name={"update"}>
      <CreateCabinForm onClose={close} cabinToEdit={cabin} container="modal" />
    </Modal.Window>
  );
}

export default UpdateCabin;
