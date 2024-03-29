import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Popup.module.css"

export default function Popup({ok,message}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: '100vw'}}>
      <Collapse in={open}>
        <Alert
            icon={false}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                ok();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
            <p className={styles.para}>{message}</p>
        </Alert>
      </Collapse>
    </Box>
  );
}
