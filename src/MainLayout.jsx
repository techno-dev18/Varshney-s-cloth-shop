import HeaderBar from "./Components/HeaderBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default MainLayout;