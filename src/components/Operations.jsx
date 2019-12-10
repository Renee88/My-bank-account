import React, { Component } from 'react';
import DatePickerDialog from './DatePickerDialog';
import { Button, Snackbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));


function Operations(props) {

    const classes = useStyles();
    const [transition, setTransition] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const handleClick = Transition => () => {
        setTransition(() => Transition);
        setOpen(true);
    };



    const withdraw = () => {
        props.withdraw(props.newTransaction)
    }

    const deposit = () => {
        props.deposit(props.newTransaction)
    }

    const updateNewTransaction = (e) => {
        props.updateNewTransaction(e)
    }

    return (
        <div id="new-expense">
            <div id="inputs">
                <input type="text" name="amount" placeholder="Insert amount" onChange={updateNewTransaction}></input>
                <input type="text" name="vendor" placeholder="Insert vendor" onChange={updateNewTransaction}></input>
                <input type="text" name="category" placeholder="Insert category" onChange={updateNewTransaction}></input>
            </div>

            <div id="date"><DatePickerDialog updateDate={props.updateDate} /></div>

            <div id="buttons">

            </div>
            <Button onClick={handleClick(TransitionUp)}> <div id="deposit" className="button" onClick={deposit}>Deposit</div> </Button>
            <Button onClick={handleClick(TransitionUp)}> <div id="withdraw" className="button" onClick={withdraw}>Withdraw</div> </Button>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id"> {props.didUpdate ? "Successfully updated" : "Update failed. Please try again"} </span>}
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

export default Operations;