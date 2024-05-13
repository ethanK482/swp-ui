import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages";
import HomePage from "../pages/home";
import SignUpScreen from "../pages/Signup";
import VerifyNotification from "../pages/verify";
import SignInScreen from "../pages/SignIn";
import ForgotpasswordScreen from "../pages/forgot-password";
import ChangePassword from "../pages/changePassword";
import ProfileScreen from "../pages/profile";

const RouterManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/register" element={<SignUpScreen />}></Route>
        <Route path="/login" element={<SignInScreen />}></Route>
        <Route path="/verify" element={<VerifyNotification />}></Route>
        <Route path="/forgot-password" element={<ForgotpasswordScreen />}></Route>
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
        
      </Route>
    </Routes>
  );
};
export default RouterManagement;
