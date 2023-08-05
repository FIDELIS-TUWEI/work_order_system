import "./App.css";
import "antd/dist/reset.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";


function App() {

  return (
    <>
      <ToastContainer />
        <div>
          <Outlet />
        </div>
    </>
  );
}


export default App;