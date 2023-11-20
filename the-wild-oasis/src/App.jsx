import styled from "styled-components";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./styles/DarkModeContext";

const StyledApp = styled.div`
  background-color: var(--color-grey-800);
  padding: 20px;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ReactQueryDevtools />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/booking/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<CheckIn />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 3000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

{
  /* <>
      <GlobalStyle />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The wild oasis</Heading>
            <div className="">
              <Heading as="h2">Check in and out</Heading>
              <Button variation="primary">Check In</Button>
              <Button variation="secondary">Check out</Button>
              <Button size="large" variation="secondary">
                Check out
              </Button>
            </div>
          </Row>
          <div className="">
            <Heading as="h3">Forms</Heading>
            <Input placeholder="Number of quests" type="number" />
            <Input placeholder="Number of quests" type="number" />
          </div>
        </Row>
      </StyledApp>
    </>
  ); */
}

export default App;
