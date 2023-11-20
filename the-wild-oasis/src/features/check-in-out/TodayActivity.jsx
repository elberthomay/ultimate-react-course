import styled from "styled-components";

import Heading from "../../ui/Heading";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function Today({ todayActivity }) {
  console.log(todayActivity.length);
  return (
    <StyledToday>
      <Heading as="h2">Today's Activity</Heading>
      {/* <Row type="horizontal"> */}
      <TodayList>
        {todayActivity.length === 0 ? (
          <NoActivity>No Activity today!</NoActivity>
        ) : (
          <>
            {todayActivity.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </>
        )}
      </TodayList>
      {/* </Row> */}
    </StyledToday>
  );
}

export default Today;
