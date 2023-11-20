import Spinner from "./Spinner";
import { Navigate } from "react-router";
import useCurrentUser from "../features/authentication/useCurrentUser";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const { isLoading, currentUser } = useCurrentUser();

  return (
    <>
      {isLoading && (
        <FullPage>
          <Spinner />
        </FullPage>
      )}
      {currentUser === null && <Navigate to="/login" />}
      {currentUser && children}
    </>
  );
}

export default ProtectedRoute;
