import PropTypes from "prop-types"
import { Button, message } from "antd"
import moment from "moment"
import LoadingBox from "@/components/LoadingBox";
import Logo from "@/assets/images/logo.png";

const ViewWorkDetails = ({ workDetailsArray, isLoading, error, componentPDF, handlePrint, navigate }) => {
    // Conditional statement to display loading and error messages
    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <LoadingBox />
        </div>;
    };

    if (error) {
        return message.error("Failed to load work details!");
    };

    // Function to convert dueDate values from Object to date string format to YYYY-MM-DD
    const dueDateArray = Array.isArray(workDetailsArray.dueDate) ? workDetailsArray?.dueDate : []
    const [startDate, endDate] = dueDateArray.map(dateString => moment(dateString).format('DD-MM-YYYY, hh:mm A'));

    // Display the assignedTo field as firstName of the assigned employee
    const assignedToName = workDetailsArray.assignedTo
        ? `${workDetailsArray.assignedTo.firstName} ${workDetailsArray.assignedTo.lastName}`
        : 'Not Assigned';

    // Display the requestedBy field as username of the user who requested the work
    const requestedByUsername = workDetailsArray.requestedBy
        ? `${workDetailsArray.requestedBy.username}`
        : 'Not Requested';

    // Display review commments
    const verifyComments = workDetailsArray.verifyComments
        ? workDetailsArray.verifyComments : 'No review comments';

  return (
    <>
        <div className="details--card" ref={componentPDF}>
            <div className="company--logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="work--serial">
                <h3>Order No: {workDetailsArray?.workOrderNumber}</h3>
            </div>
            <div className="details--header">
                <div className="details--header1">
                    <h2>Category: {workDetailsArray.category?.categoryTitle}</h2>
                    <p>Service Type: {workDetailsArray?.serviceType}</p>
                    <p>Tracker: {workDetailsArray?.tracker}</p>
                </div>

                <div className="details--header2">
                    <h2>Priority Level: {workDetailsArray?.priority}</h2>
                    <p>Location: {workDetailsArray.location.map((location, index) => 
                        <span key={location._id}>
                            {location.locationTitle}
                            {index < workDetailsArray.location.length - 1 ? ", " : ""}
                        </span>)}
                    </p>
                    <p>Work Status: {workDetailsArray?.status}</p>
                </div>
            </div>
            <hr />
            <div className="details--grid">
                <div className="details">
                    <span>Description:</span>
                    <span>{workDetailsArray?.description}</span>
                </div>

                <div className="details">
                    <span>Date Requested:</span>
                    <span>{moment(workDetailsArray?.Date_Created).format("DD-MM-YYYY, hh:mm a")}</span>
                </div>

                <div className="details">
                    <span>Requested By:</span>
                    <span>{requestedByUsername}</span>
                </div>

                <div className="details">
                    <span>Due Date:</span>
                    <span>From: {startDate} To: {endDate}</span>
                </div>

                <div className="details">
                    <span>Employee Assigned:</span>
                    <span>{assignedToName}</span>
                </div>

                <div className="details">
                    <span>Date Assigned:</span>
                    <span>
                        {workDetailsArray.dateAssigned
                            ? moment(workDetailsArray.dateAssigned).format("DD-MM-YYYY, hh:mm a")
                            : "Work order has not been assigned!"}
                    </span>
                </div>

                <div className="details">
                    <span>Tracker Message:</span>
                    <span>{workDetailsArray?.trackerMessage}</span>
                </div>

                <div className="details">
                    <span>Date Completed:</span>
                    <span>{workDetailsArray.dateCompleted 
                        ? moment(workDetailsArray.dateCompleted).format("DD-MM-YYYY, hh:mm a")
                        : "Work order has not been completed yet!"}
                    </span>
                </div>

                <div className="details">
                    <span>Supervised By:</span>
                    <span>{workDetailsArray?.supervisedBy}</span>
                </div>

                <div className="details">
                    <span>Comments:</span>
                    <span>{workDetailsArray.comments}</span>
                </div>

                <div className="details">
                    <span>Reviewed:</span>
                    <span>{workDetailsArray.reviewed === true ? "Yes" : "No"}</span>
                </div>

                <div className="details">
                    <span>Verified By:</span>
                    <span>{workDetailsArray?.verifiedByUsername}</span>
                </div>

                <div className="details">
                    <span>Verify Comments:</span>
                    <span>{verifyComments}</span>
                </div>

                <div className="details">
                    <span>Date Verified:</span>
                    <span>{workDetailsArray?.dateVerified ? moment(workDetailsArray.dateVerified).format("DD-MM-YYYY, hh:mm a") : "Not Reviewed"}</span>
                </div>

                <div className="details">
                    <span>Checked By:</span>
                    <span>{workDetailsArray?.checkedBy}</span>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: "20px" }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={handlePrint}>Print</Button>
        </div>
    </>
  )
};

ViewWorkDetails.propTypes = {
    workDetailsArray: PropTypes.object,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    handlePrint: PropTypes.func,
    componentPDF: PropTypes.object,
    navigate: PropTypes.func
};

export default ViewWorkDetails;