import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function SuccessSnackbar(props) {
    const classes = useStyles2();
    const [open, setOpen] = React.useState(props.open);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.resetUpdated()
        setOpen(false);
    };


    return (
       
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant="success"
                message="Succesfully updated!"
            />
        </Snackbar>
    )

}


