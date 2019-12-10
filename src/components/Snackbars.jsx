import React from 'react';
import {Snackbar} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




export default function Snackbars(props) {


  return (  
    <div className = "snackbar">
      <Snackbar
         open={open}
         autoHideDuration={3000}
         onClose={handleClose}
         ContentProps={{
           'aria-describedby': 'message-id',
         }}
        message={<span id="message-id"> {props.didUpdate? "Successfully updated" : "Update failed. Please try again"} </span>}
        action={[<IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          ><CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}