import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DeleteTask() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // navigate
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={handleOpen}>Click here to delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Are you sure you want to delete?</h2>
          <Button>Yes</Button>
          <Button onClick={() => navigate("/alltasks")}>Go back</Button>
        </Box>
      </Modal>
    </div>
  );
}