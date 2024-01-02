import PropTypes from "prop-types"
import { Button } from "antd"
import moment from "moment"
import LoadingBox from "./LoadingBox";
import Logo from "../assets/logo.png";

const ViewWorkDetails = ({ workDetails, loading, componentPDF, handlePrint, navigate }) => {
    // Conditional statement to check if dueDate is empty
    if (loading && !workDetails) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
            <LoadingBox />
        </div>
    }

    // Function to convert dueDate values from Object to date string format to YYYY-MM-DD
    const dueDateArray = Array.isArray(workDetails.dueDate) ? workDetails.dueDate : [] 
    const [startDate, endDate] = dueDateArray.map(dateString => moment(dateString).format('YYYY-MM-DD'));

    // Display the assignedTo field as firstName of the assigned employee
    const assignedToName = workDetails.assignedTo
        ? `${workDetails.assignedTo.firstName}`
        : 'Not Assigned';

    // Display the requestedBy field as username of the user who requested the work
    const requestedByUsername = workDetails.requestedBy
        ? `${workDetails.requestedBy.username}`
        : 'Not Requested';

    // Display the reviewedBy field as username of the user who reviewed the work 
    let verifiedByUsername = "Not Reviewed"
        if (workDetails.verifiedBy) {
            verifiedByUsername = workDetails.reviewed
                ? `${workDetails.verifiedBy.username}`
                : 'Not Reviewed';
        }

    // Display review commments
    const verifyComments = workDetails.verifyComments
        ? workDetails.verifyComments : 'No review comments';

  return (
    <>
        <div className="details--card" ref={componentPDF}>
            <div className="company--logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="details--header">
                <div className="details--header1">
                    <h2>Category: {workDetails.category?.categoryTitle}</h2>
                    <p>Service Type: {workDetails?.serviceType}</p>
                    <p>Tracker: {workDetails?.tracker}</p>
                </div>

                <div className="details--header2">
                    <h2>Priority Level: {workDetails?.priority}</h2>
                    <p>Location: {Array.isArray(workDetails.location) && workDetails.location.map((location, index) => 
                        <span key={location._id}>
                            {location.locationTitle}
                            {index < workDetails.location.length - 1 ? ", " : ""}
                        </span>)}
                    </p>
                    <p>Work Status: {workDetails?.status}</p>
                </div>
            </div>
            <hr />
            <div className="details--grid">
                <div className="details">
                    <span>Description:</span>
                    <span>{workDetails?.description}</span>
                </div>

                <div className="details">
                    <span>Date Requested:</span>
                    <span>{moment(workDetails?.Date_Created).format("DD/MM/YYYY, hh:mm a")}</span>
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
                        {workDetails.dateAssigned
                            ? moment(workDetails.dateAssigned).format("DD/MM/YYYY, hh:mm a")
                            : "Work order has not been assigned!"}
                    </span>
                </div>

                <div className="details">
                    <span>Tracking Comments:</span>
                    <span>{workDetails?.trackerMessage}</span>
                </div>

                <div className="details">
                    <span>Date Completed:</span>
                    <span>{workDetails.dateCompleted 
                        ? moment(workDetails.dateCompleted).format("DD/MM/YYYY, hh:mm a")
                        : "Work order has not been completed yet!"}
                    </span>
                </div>

                <div className="details">
                    <span>Supervised By:</span>
                    <span>{workDetails?.supervisedBy}</span>
                </div>

                <div className="details">
                    <span>Comments:</span>
                    <span>{workDetails.comments}</span>
                </div>

                <div className="details">
                    <span>Reviewed:</span>
                    <span>{workDetails.reviewed === true ? "Yes" : "No"}</span>
                </div>

                <div className="details">
                    <span>Verified By:</span>
                    <span>{verifiedByUsername}</span>
                </div>

                <div className="details">
                    <span>Verify Comments:</span>
                    <span>{verifyComments}</span>
                </div>

                <div className="details">
                    <span>Date Verified:</span>
                    <span>{workDetails?.dateVerified ? moment(workDetails.dateVerified).format("DD/MM/YYYY, hh:mm a") : "Not Reviewed"}</span>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={handlePrint}>Print</Button>
        </div>
    </>
  )
};

ViewWorkDetails.propTypes = {
    workDetails: PropTypes.array,
    loading: PropTypes.bool,
    handlePrint: PropTypes.func,
    componentPDF: PropTypes.object,
    navigate: PropTypes.func
};

export default ViewWorkDetails;