import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";
import {
  useSetBreakfast,
  useCheckIn,
  useCheckOut,
} from "../bookings/useUpdateBooking";
import { differenceInDays } from "date-fns";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { isLoading: bookingIsLoading, error, booking } = useBooking(bookingId);
  const { isLoading: settingIsLoading, settings } = useSettings();
  const { checkInLoading, checkIn } = useCheckIn(bookingId);
  const { checkOutLoading, checkOut } = useCheckOut(bookingId);
  const { setBreakfastLoading, setBreakfast } = useSetBreakfast(bookingId);

  const isLoading = bookingIsLoading || settingIsLoading;
  const { breakfastPrice } = settings ?? {};

  const {
    status,
    isPaid,
    startDate,
    endDate,
    cabinPrice,
    extraPrice,
    hasBreakfast,
    users: { fullName },
  } = booking ?? { users: {} };

  const [checkboxconfirmPaid, setCheckboxConfirmPaid] = useState(false);
  const [checkboxHasBreakfast, setCheckboxHasBreakfast] = useState(false);

  useEffect(() => {
    setCheckboxConfirmPaid(isPaid ?? false);
  }, [isPaid]);

  const numNights = differenceInDays(new Date(endDate), new Date(startDate));
  const isUnconfirmed = status === "unconfirmed";
  const isCheckedIn = status === "checked-in";
  const isCheckedOut = status === "checked-out";
  const breakfastPaid = isPaid && hasBreakfast;

  const couldCheckOut =
    differenceInDays(new Date(), new Date(endDate)) <= 1 ||
    new Date() > new Date(endDate);

  function handleCheckin() {
    checkIn(
      (data) => navigate("/"),
      hasBreakfast !== checkboxHasBreakfast ? checkboxHasBreakfast : undefined,
      numNights * breakfastPrice
    );
  }

  function handleCheckout() {
    checkOut((data) => navigate("/"));
  }

  async function toggleHasBreakfast() {
    setCheckboxHasBreakfast((checkboxHasBreakfast) => !checkboxHasBreakfast);
    setCheckboxConfirmPaid(false);
  }

  useEffect(() => {
    setCheckboxHasBreakfast(hasBreakfast ?? false);
  }, [hasBreakfast]);

  return (
    <>
      {isLoading && <Spinner />}
      {isLoading && error && <p>Error fetching booking details</p>}
      {!isLoading && !error && (
        <>
          <Row type="horizontal">
            <Heading as="h1">
              Check {isCheckedIn ? "out" : "in"} booking #{bookingId}
            </Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          </Row>

          <BookingDataBox booking={booking} />

          {isUnconfirmed && !breakfastPaid && (
            <Box>
              <Checkbox
                id="breakfast"
                onChange={toggleHasBreakfast}
                checked={checkboxHasBreakfast}
                disabled={setBreakfastLoading || checkInLoading}
              >
                Add breakfast for {formatCurrency(breakfastPrice * numNights)}
              </Checkbox>
            </Box>
          )}

          {isUnconfirmed && (
            <Box>
              <Checkbox
                id="confirm-paid"
                onChange={() =>
                  setCheckboxConfirmPaid(
                    (checkboxconfirmPaid) => !checkboxconfirmPaid
                  )
                }
                checked={checkboxconfirmPaid}
                disabled={checkInLoading}
              >
                I confirm that {fullName} has paid the full amount of{" "}
                {formatCurrency(
                  cabinPrice +
                    (checkboxHasBreakfast ? breakfastPrice * numNights : 0)
                )}
              </Checkbox>
            </Box>
          )}

          <ButtonGroup>
            {isUnconfirmed ? (
              <Button
                disabled={!checkboxconfirmPaid || checkInLoading}
                onClick={handleCheckin}
              >
                {`Check in booking #${bookingId}`}
              </Button>
            ) : (
              <Button
                disabled={isCheckedOut || !couldCheckOut || checkOutLoading}
                onClick={handleCheckout}
              >
                {isCheckedOut
                  ? `#${bookingId} has been checked out`
                  : couldCheckOut
                  ? "Check out"
                  : `could only check out 24 hours before end times`}
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

export default CheckinBooking;
