import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useInsertUpdateCabin } from "./useInsertUpdateCabin";
import UpdateCabin from "./UpdateCabin";
import DeleteCabin from "./DeleteCabin";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function CabinRow({ cabin }) {
  const { id, name, image, maxCapacity, regularPrice, discount, description } =
    cabin;

  const { insertUpdateLoading: cloneLoading, insertUpdateCabin: cloneCabin } =
    useInsertUpdateCabin();

  function handleCloneCabin() {
    const { id, ...clonedCabin } = cabin;
    cloneCabin({ ...clonedCabin, name: `Copy of ${name}` });
  }

  return (
    <>
      <Img src={image ?? ""} />
      <Cabin>{name}</Cabin>
      <div className="">{`fits up to ${maxCapacity} guest${
        maxCapacity > 1 ? "s" : ""
      }`}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <div>&mdash;</div>
      )}
      <IconBox>
        <Menus.Toggle id={id}>
          <Menus.Button
            onClick={() => {
              console.log("clone cabin trigger");
              handleCloneCabin();
            }}
            disabled={cloneLoading}
          >
            <HiSquare2Stack />
            Duplicate
          </Menus.Button>

          <Modal.Open name={"update"}>
            <Menus.Button>
              <HiPencil />
              Edit
            </Menus.Button>
          </Modal.Open>

          <Modal.Open name={"delete"}>
            <Menus.Button>
              <HiTrash />
              Delete
            </Menus.Button>
          </Modal.Open>
        </Menus.Toggle>
        <DeleteCabin id={id} />
        <UpdateCabin cabin={cabin} />
      </IconBox>
    </>
  );
}

export default CabinRow;
