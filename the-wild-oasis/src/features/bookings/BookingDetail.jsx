import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import DeleteBooking from "./DeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { isLoading, error, booking } = useBooking(bookingId);

  const { status } = booking ?? { users: {}, cabins: {} };
  const isUnconfirmed = status === "unconfirmed";

  const isNotFoundError = error?.code === "PGRST116";
  console.log(error);

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && isNotFoundError ? (
        <Empty resource="Booking" />
      ) : (
        <p>Error fetching booking details</p>
      )}
      {!isLoading && !error && (
        <>
          <Row type="horizontal">
            <HeadingGroup>
              <Heading as="h1">Booking #{bookingId}</Heading>
              <Tag type={statusToTagName[status]}>
                {status.replace("-", " ")}
              </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </Row>

          <BookingDataBox booking={booking} />

          <ButtonGroup>
            {isUnconfirmed && (
              <Modal>
                <Modal.Open name="deleteBooking">
                  <Button variation="danger">Delete</Button>
                </Modal.Open>
                <DeleteBooking bookingId={bookingId} />
              </Modal>
            )}
            {status !== "checked-out" && (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                Check {isUnconfirmed ? "In" : "Out"}
              </Button>
            )}
            <Button variation="secondary" onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
}

export default BookingDetail;
