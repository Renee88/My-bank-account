import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SuccessSnackbar from './SuccessSnackbar';
import { useEffect } from 'react';
import ErrorSnackbar from './ErrorSnackbar';
import InfoSnackbar from './InfoSnackbar';
import WarningSnackbar from './WarningSnackbar';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function FadeTransition(props) {
  return <Fade {...props} />;
}

export default function Snackbars(props) {
  const [state, setState] = React.useReducer((state, newState) => ({ ...state, ...newState }),{
    open: false,
    Transition: Fade,
    maxWithdrawal: props.maxWithdrawal
  });

  const [updated, didUpdate] = React.useState(false)

  const handleClick = Transition => () => {
    setState({
      open: true,
      Transition,
    });
  };

  useEffect(() => {
    didUpdate(props.didUpdate)
  })


  const deposit = async () => {
    await props.deposit()
    let open = true
    setState({open});
    didUpdate(updated)
    handleClick(FadeTransition)
  }

  const withdraw = async () => {
    await props.withdraw()
    let open = true
    setState({open});
    didUpdate(updated)
    handleClick(FadeTransition)
  }


  return (
    <div id="buttons">
      <Button id="deposit"
        onClick={deposit}> Deposit</Button>
      
      <Button id="withdraw"
        onClick={withdraw}> Withdraw </Button>

      {updated && updated !== '404' && updated !== "418" && updated !== "400" ? <SuccessSnackbar open={state.open} resetInput = {props.resetInput}/>
        : updated == '400' ? <ErrorSnackbar open={state.open} resetInput = {props.resetInput}/>
          : updated == '404' ? <InfoSnackbar open={state.open} resetInput = {props.resetInput}/>
            : updated == '418' ? <WarningSnackbar open={state.open} resetInput = {props.resetInput} maxWithdrawal = {state.maxWithdrawal} /> : null}
    </div>
  );
}