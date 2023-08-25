import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = (alertProp) => {
  return (
        <Snackbar open={alertProp.open} anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000} onClose={alertProp.handleClose}>
          <Alert onClose={alertProp.handleClose} severity={alertProp.successful ? 'success' : 'error'} sx={{ width: '100%' }}>
            {alertProp.message}
          </Alert>
        </Snackbar>
  );
};

export default App;