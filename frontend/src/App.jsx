import "./App.css";
import "antd/dist/reset.css"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingBox from "./components/LoadingBox";


function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <>
      { loading ? (
        <div className="spinner">
          <LoadingBox loading={loading} />
        </div>
      ) : (
          <div className="App">
            <Outlet />
          </div>

      )}
    </>
  )
}


export default App;