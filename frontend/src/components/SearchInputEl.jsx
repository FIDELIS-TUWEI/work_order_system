import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    search: yup
        .string("Enter your search Query")
        .required("this field cannot be empty"),
});


const SearchInputEl = () => {
    const navigate = useNavigate();

    const onSubmit = (value, actions) => {
        // alert(values.search)
        const { search } = values;
    }
  return (
    <div>SearchInputEl</div>
  )
}

export default SearchInputEl