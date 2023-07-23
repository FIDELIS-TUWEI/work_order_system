import { Box } from "@mui/material";
import HashLoader from "react-spinners/HashLoader"


const LoadingBox = () => {
  return (
    <>
        <Box
            sx={{
                minHeight: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <HashLoader />
        </Box>
    </>
  )
}

export default LoadingBox