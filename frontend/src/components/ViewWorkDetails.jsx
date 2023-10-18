import { Button, Card } from "antd"
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
        <Card loading={loading} title="Work Details" style={{ margin: 'auto', width: '800px' }}>
            <div ref={componentPDF}>
                <div>
                    <p>
                        Title: {workDetails?.title}
                    </p>
                </div>
                
                <div>
                    <p>
                        Work Service Type: {workDetails?.serviceType}
                    </p>
                </div>

                <div>
                <p>
                    Work Status: {workDetails?.status}
                </p>
                </div>

                <div>
                <p>
                    Requested Date: {moment(workDetails?.Date_Created).format("DD/MM/YYYY, hh:mm a")}
                </p>
                </div>

                <div>
                <p>
                    Requested By: {requestedByUsername}
                </p>
                </div>

                <div>
                <p>
                    {workDetails?.dateCompleted ? (
                        <span>Completed Date: {moment(workDetails?.dateCompleted).format("DD/MM/YYYY, hh:mm a")}</span>
                    ) : (
                        <span>Work order has not been completed yet!</span>
                    )}
                </p>
                </div>

                <div>
                <p>
                    Due Date: {startDate} - {endDate}
                </p>
                </div>

                <div>
                <p>
                    Assigned To: {assignedToName}
                </p>
                </div>

                <div>
                <p>
                    {workDetails?.dateAssigned ? (
                        <span>Assigned Date: {moment(workDetails?.dateAssigned).format("DD/MM/YYYY, hh:mm a")}</span>
                    ) : (
                        <span>Work order has not been assigned!</span>
                    )}
                </p>
                </div>

                <div>
                <p>
                    Reviewed: {workDetails?.reviewed === true ? "Yes" : "No"}
                </p>
                </div>

                <div>
                <p>
                    Reviewed By: {reviewedByUsername} 
                </p>
                </div>

                <div>
                    <p>
                        Reviewed Date: {workDetails?.dateReviewed ? moment(workDetails?.dateReviewed).format("DD/MM/YYYY, hh:mm a") : "Not Reviewed"}    
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={handlePrint}>Print</Button>
            </div>
            
        </Card>
    </>
  )
}

export default ViewWorkDetails;