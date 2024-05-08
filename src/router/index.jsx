import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages";
import HomePage from "../pages/home";

const RouterManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<HomePage />}>
          
        </Route>
      </Route>
    </Routes>
  );
};
export default RouterManagement;
