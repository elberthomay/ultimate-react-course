import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal, { useModal } from "../../ui/Modal";

function AddCabin() {
  const { close } = useModal();
  return (
    <>
      <Modal.Open name="create">
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window name="create">
        <CreateCabinForm onClose={close} container="modal" />
      </Modal.Window>
    </>
  );
}

export default AddCabin;
