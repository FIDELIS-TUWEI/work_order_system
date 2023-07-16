import * as yup from "yup";

// Validation Schema
export const validationSchema = yup.object({
    title: yup
        .string("Enter Task Title")
        .required("Task Title is required"),
    location: yup
        .string("Enter a Location")
        .required("Location is required"),
    priority: yup
        .string("Enter a Priority Level")
        .required("Priority Level is required"),
    category: yup
        .string("Enter Task Category")
        .required("Task Category is required"),
    taskType: yup
        .string("Enter Task Type")
        .required("Task Type is Required"),
    assignedTo: yup
        .string("Enter employee name")
        .required("Employee name is required"),
    assignedBy: yup
        .string("Enter your name")
        .required("Supervisor's name is required"),
    //status: yup
    //    .string("Enter Task Status")
    //    .required("Task Status is required"),
    date: yup
        .string("Enter Date Task was assigned")
        .required("Date is required"),
  });
  