import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function WarningSnackbar(props) {
    const classes = useStyles2();
    const [open, setOpen] = React.useState(props.open);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        props.resetInput()
    };



    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant="warning"
                message={`Your can withdraw up to ${props.maxWithdrawal}`}
            />
        </Snackbar>
    )

}