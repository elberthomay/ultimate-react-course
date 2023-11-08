import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <>
      {isLoading && <Loader />}
      <div className="grid h-screen grid-rows-layout">
        <Header />
        <div className="overflow-y-scroll">
          <main className="mx-auto max-w-3xl">
            <Outlet />
          </main>
        </div>
        <CartOverview />
      </div>
    </>
  );
}

export default AppLayout;
