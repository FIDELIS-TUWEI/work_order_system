import { Box, useTheme } from "@mui/material"

const Footer = () => {
  const { palette } = useTheme();
  return (
    <>
      <Box
        sx={{
          height: '70px',
          bgcolor: palette.secondary.midNightBlue,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box component='span' sx={{ color: palette.primary.main }}>
          &copy; All rights Reserved. Holiday Inn-Nairobi&trade; WORK ORDER - 2023.
        </Box>
      </Box>
    </>
  )
}

export default Footer