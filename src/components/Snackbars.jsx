import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SuccessSnackbar from './SuccessSnackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { useEffect } from 'react';
import ErrorSnackbar from './ErrorSnackbar';
import InfoSnackbar from './InfoSnackbar';
import WarningSnackbar from './WarningSnackbar';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));


export default function Snackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [updated, didUpdate] = React.useState(false)

  useEffect(() => {
    didUpdate(props.didUpdate)
  })



  const deposit = async () => {
    await props.deposit()
    setOpen(true);
    didUpdate(updated)
  }

  const withdraw = async () => {
    await props.withdraw()
    setOpen(true);
    didUpdate(updated)
  }



  return (
    <div id="buttons">
      <Button id="deposit"
        onClick={deposit}> Deposit</Button>
      
      <Button id="withdraw"
        onClick={withdraw}> Withdraw </Button>

      {updated && updated !== "404" && updated !== "418" && updated !== "400" ? <SuccessSnackbar open={open} resetUpdated = {props.resetUpdated}/>
        : updated == '400' ? <ErrorSnackbar open={open} resetUpdated = {props.resetUpdated}/>
          : updated == '404' ? <InfoSnackbar open={open} resetUpdated = {props.resetUpdated}/>
            : updated == '418' ? <WarningSnackbar open={open} resetUpdated = {props.resetUpdated} /> : null}
    </div>
  );
}