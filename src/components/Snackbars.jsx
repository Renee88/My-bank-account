import React from 'react';
import {Button, Snackbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));


function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Snackbars(props) {

  const classes = useStyles();
  const [transition, setTransition] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const handleClick = Transition => () => {
    setTransition(() => Transition);
    setOpen(true);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div id="buttons">
      <Button onClick={handleClick(TransitionUp)}> <div id="deposit" className = "button" onClick={props.deposit}>Deposit</div> </Button>
      <Button onClick={handleClick(TransitionUp)}> <div id="withdraw" className = "button" onClick={props.withdraw}>Withdraw</div> </Button>
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