import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useSelector } from "react-redux"


const SelectComponent = ({ handleChangeCategory, cat }) => {
    const { taskType } = useSelector(state => state.taskType)
  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="select-label">Category</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={cat}
                label="Category"
                onChange={handleChangeCategory}
            >
                <MenuItem value="">All</MenuItem>
                {
                    taskType && taskType.map(tt => (
                        <MenuItem key={tt._id} value={tt._id}>{tt.taskTypeName}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </Box>
  )
}

export default SelectComponent