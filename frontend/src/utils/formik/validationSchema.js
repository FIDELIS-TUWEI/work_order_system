import * as yup from "yup";

// Validation Schema
export const validationSchemaTasks = yup.object({
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
    date: yup
        .string("Enter Date Task was assigned")
        .required("Date is required"),
  });

 // Validation Schema 
export const validationSchemaUsers = yup.object({
    name: yup
        .string("Enter Fullname")
        .required("Fullname is required"),
    username: yup
        .string("Enter a username")
        .required("Username is required"),
    password: yup
        .string("Enter you password")
        .min(8, "Password should be of minimum 8 characters long")
        .required("Password is required"),
    date: yup
        .string("Enter date")
        .required("Today's date is required")
  
  });
  