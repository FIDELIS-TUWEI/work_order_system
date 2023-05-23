import { DoneAll, Group, ListAlt, Pending, PendingActions, Verified } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

export default function Main() {
  
  return (
    <Box
      sx={{
        display: {xs: 'flex', md: 'grid'},
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column'
      }}
    >
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant="h5">Total Users</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant="h5">Total Tasks</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ListAlt sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant="h5">Completed Tasks</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DoneAll sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant="h5">Pending Tasks</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PendingActions sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{p:3}}>
        <Typography variant="h5">Inspected</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Verified sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">10</Typography>
        </Box>
      </Paper>
    </Box>
  )
}
