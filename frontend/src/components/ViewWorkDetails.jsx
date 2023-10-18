import { Button } from "antd"
import moment from "moment"
import LoadingBox from "./LoadingBox";

const ViewWorkDetails = ({ workDetails, loading, componentPDF, handlePrint, navigate }) => {
    // Conditional statement to check if dueDate is empty
    if (!workDetails.dueDate || !workDetails.dueDate.length === 0) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px' }}>
            <LoadingBox />
        </div>
    }

    // Function to convert dueDate values from Object to date string format to YYYY-MM-DD
    const [startDate, endDate] = workDetails.dueDate.map((dateString) => 
    moment(dateString).format("YYYY-MM-DD"));

    // Display the assignedTo field as firstName of the assigned employee
    const assignedToName = workDetails.assignedTo
        ? `${workDetails.assignedTo.firstName}`
        : 'Not Assigned';

    // Display the requestedBy field as username of the user who requested the work
    const requestedByUsername = workDetails.requestedBy
        ? `${workDetails.requestedBy.username}`
        : 'Not Requested';

    // Display the reviewedBy field as username of the user who reviewed the work 
    const reviewedByUsername = workDetails.reviewedBy
        ? (workDetails.reviewed ? `${workDetails.reviewedBy.username}` : 'Not Reviewed')
        : 'Not Reviewed';

  return (
    <>
        <div className="work--details--card" ref={componentPDF}>
            <div className="work--details--header">
                <h2>Work Description: {workDetails?.title}</h2>
                <p>Service Type: {workDetails?.serviceType}</p>
            </div>
            <hr />
            <div className="work--details--grid">
                <div className="work--detail">
                    <span>Work Status:</span>
                    <span>{workDetails?.status}</span>
                </div>

                <div className="work--detail">
                    <span>Date Requested:</span>
                    <span>{moment(workDetails?.Date_Created).format("DD/MM/YYYY, hh:mm a")}</span>
                </div>

                <div className="work--detail">
                    <span>Requested By:</span>
                    <span>{requestedByUsername}</span>
                </div>

                <div className="work--detail">
                    <span>Date Completed:</span>
                    <span>{workDetails.dateCompleted 
                        ? moment(workDetails.dateCompleted).format("DD/MM/YYYY, hh:mm a")
                        : "Work order has not been completed yet!"}
                    </span>
                </div>

                <div className="work--detail">
                    <span>Due Date:</span>
                    <span>From: {startDate} To: {endDate}</span>
                </div>

                <div className="work--detail">
                    <span>Employee Assigned:</span>
                    <span>{assignedToName}</span>
                </div>

                <div className="work--detail">
                    <span>Date Assigned:</span>
                    <span>
                        {workDetails.dateAssigned
                            ? moment(workDetails.dateAssigned).format("DD/MM/YYYY, hh:mm a")
                            : "Work order has not been assigned!"}
                    </span>
                </div>

                <div className="work--detail">
                    <span>Reviewed:</span>
                    <span>{workDetails.reviewed === true ? "Yes" : "No"}</span>
                </div>

                <div className="work--detail">
                    <span>Reviewed By:</span>
                    <span>{reviewedByUsername}</span>
                </div>

                <div className="work--detail">
                    <span>Date Reviewed:</span>
                    <span>{workDetails?.dateReviewed ? moment(workDetails.dateReviewed).format("DD/MM/YYYY, hh:mm a") : "Not Reviewed"}</span>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={handlePrint}>Print</Button>
        </div>
    </>
  )
}

export default ViewWorkDetails;