import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }));

const Task = () => {
    return ( 
        <>
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Item>1. Door Lock 
                    <Box>
                        <EditIcon color='success' /> 
                        <DeleteIcon color='error' />
                    </Box>
                </Item>
            </Stack>
        </Box>
        </>
     );
}
 
export default Task;