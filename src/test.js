import React from 'react'
import ReactDom from "react-dom"

function Test() {
    return ReactDom.createPortal(
        <div style={{position:'absolute',backgroundColor:'blue',width:'19em',height:'19em',zIndex:10,marginTop:'5%',marginLeft:'40%',marginRight:'auto'}}><h1 style={{color:'white'}}>Hello</h1></div>,
        document.getElementById('portal')
    )
}

export default Test;
{/* <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={1000}>
                        <Test />
                    </Fade>
                    )}
                </Popper>
 const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    //When Click on Signout
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      }; */}
