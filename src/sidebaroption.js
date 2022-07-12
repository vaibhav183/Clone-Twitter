import React, { useState,useEffect } from 'react';
import {Link,Redirect} from 'react-router-dom'
import "./sidebaroption.css";
import {useSelector,useDispatch} from "react-redux"
import {setNull,clear,setTokenNumber,setTokenNumber1} from "./actions/index";
import changeToken from './reducers/setToken';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import $ from 'jquery';
import SaveIcon from '@mui/icons-material/Save';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px ridge #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function Sidebaroption({text,Icon,rou_val}) {
    const dispatch = useDispatch();
    const [contained,setContained]=useState(true)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //For SignOut Pop up
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //For deleting local storage and change Store
    const signout=()=>{
        $('#loading').removeClass('loading');
        $('#yesButton').addClass('loading');
        setTimeout(()=>{
            localStorage.removeItem('token');
            localStorage.removeItem('token1');
            dispatch(setNull());
            dispatch(clear());
        },5000)
    }

    if(rou_val=='signout'){
       return(
            <div className="sidebaroption">
                <Icon className="icon" />
                <h2 className="link" onClick={handleOpen}>{text}</h2>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 1000,
                    }}
                >
                    <DialogTitle id="alert-dialog-title" style={{fontSize:'1.5em', fontWeight:600,textAlign:'center'}}>
                    !! Sign Out !!
                    <hr/>
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{color:'#451452',fontSize:'1em'}}>
                        Thanks for visiting our site.Hope you enjoyed it a lot and visit again our site soon.<br/>
                        Do you really want to <b>Sign Out</b>?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Dismiss</Button>
                    <Button variant="contained" id='yesButton' onClick={signout}>Yes</Button>
                    <LoadingButton
                        className="loading"
                        id='loading'
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="outlined"
                        >
                        Signing Out
                    </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
       );
    }
    else{
        return (
            <div className="sidebaroption">
                <Icon className="icon" />
                <h2><Link className="link" to={rou_val}>{text}</Link></h2>
            </div>
        );
    }
}

export default Sidebaroption;
