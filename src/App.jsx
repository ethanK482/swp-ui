import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RouterManagement from "./router";
function App() {
  return (
    <div>
      <ToastContainer />
      <RouterManagement/>
    </div>
  );
}
export default App;
