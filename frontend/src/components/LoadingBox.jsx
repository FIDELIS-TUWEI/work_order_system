import { Paper } from "@mui/material";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader"


const LoadingBox = () => {
  const [color, setColor] = useState("green");
  return (
    <>
    
        <Paper
            sx={{
              height: '100px',
              width: '100px',
              display: 'block',
              margin: 'auto',
            }}
            onChange={e => setColor(e.target.value)}
        >
            <HashLoader color={color} />
          </Paper>
    </>
  )
}

export default LoadingBox