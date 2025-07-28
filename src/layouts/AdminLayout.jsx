import { Outlet } from "react-router";
import AdminHeader from "../admin/AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
