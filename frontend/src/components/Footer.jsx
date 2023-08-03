import { Box } from "@mui/material"

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          height: '70px',
          bgcolor: 'green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box component='span' sx={{ color: '#fff' }}>
          &copy; All rights Reserved. Holiday Inn-Nairobi&trade; Work Order System - 2023.
        </Box>
      </Box>
    </>
  )
}

export default Footer