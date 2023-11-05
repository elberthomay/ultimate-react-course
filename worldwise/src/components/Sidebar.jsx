import { Outlet } from "react-router-dom";
import Appnav from "./Appnav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Appnav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
