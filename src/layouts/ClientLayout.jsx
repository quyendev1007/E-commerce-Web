import { Outlet } from "react-router";
import Footer from "./clients/Footer";
import HeaderClient from "./clients/Header";

const ClientLayout = () => {
  return (
    <>
      <HeaderClient />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
