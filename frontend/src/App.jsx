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

  useEffect(() => {
    // function to check cookie expiry and reload the page
    const checkCookieExpiry = () => {
      const cookieValue = document.cookie;

      // Check if the cookie has expired based on the expiry date
      if (cookieValue === "expired") {
        window.location.reload();
      }
    };

    // set an interval to check for cookie expiry periodically
    const interval = setInterval(checkCookieExpiry, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);

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