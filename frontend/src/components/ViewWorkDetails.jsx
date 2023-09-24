import { Button, Card } from "antd"
import moment from "moment"

const ViewWorkDetails = ({ workDetails, loading, componentPDF, handlePrint, navigate }) => {
    if (!workDetails.dueDate || !workDetails.dueDate.length === 0) {
        return null
    }

    const [startDate, endDate] = workDetails.dueDate.map((dateString) => 
    moment(dateString).format("YYYY-MM-DD"));

  return (
    <>
        <Card loading={loading} title="Work Details" style={{ margin: 'auto', width: '500px' }}>
            <div ref={componentPDF}>
                <p>
                    Title: {workDetails && workDetails.title}
                </p>
                
                <p>
                    Work Service Type: {workDetails && workDetails.serviceType}
                </p>
                
                <p>
                    Work Status: {workDetails && workDetails.status}
                </p>
                <p>
                    Requested Date: {moment(workDetails && workDetails.Date_Created).format("DD/MM/YYYY, hh:mm a")}
                </p>
                <p>
                    {workDetails && workDetails.dateCompleted ? (
                        <span>Completed Date: {moment(workDetails && workDetails.dateCompleted).format("DD/MM/YYYY, hh:mm a")}</span>
                    ) : (
                        <span>Work order has not been completed yet!</span>
                    )}
                </p>
                <p>
                    Due Date: {startDate} - {endDate}
                </p>
                <p>
                    Assigned To: {workDetails && workDetails.assignedTo}
                </p>
                <p>
                    {workDetails && workDetails.dateAssigned ? (
                        <span>Assigned Date: {moment(workDetails && workDetails.dateAssigned).format("DD/MM/YYYY, hh:mm a")}</span>
                    ) : (
                        <span>Work order has not been assigned!</span>
                    )}
                </p>
                <p>
                    Reviewed: {workDetails && workDetails.reviewed === true ? "Yes" : "No"}
                </p>
                <p>
                    Reviewed By: {workDetails && workDetails.reviewedBy}
                </p>
                <p>
                    Reviewed Date: {moment(workDetails && workDetails.Date_Updated).format("DD/MM/YYYY, hh:mm a")}
                    
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={handlePrint}>Print</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>Delete</Button>
            </div>
            
        </Card>
    </>
  )
}

export default ViewWorkDetails