import { Box } from "@mui/material";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader"


const LoadingBox = () => {
  const [color, setColor] = useState("green");
  return (
    <>
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'lightgreen',
            }}
            onChange={e => setColor(e.target.value)}
        >
            <HashLoader color={color} />
        </Box>
    </>
  )
}

export default LoadingBox