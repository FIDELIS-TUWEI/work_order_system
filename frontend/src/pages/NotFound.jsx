import ErrorPage from "../assets/images/ErrorPage.jpg";

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={ErrorPage} alt="error page" />
    </div>
  )
};

export default NotFound;