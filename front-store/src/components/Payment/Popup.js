import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

function Popup(props) {
    const {children,openPopup,setOpenPopup} = props
    return (
       <Dialog open={openPopup}>
           <DialogTitle>
               <div style={{display:"flex"}}>
               <p style={{flexGrow:"1"}}>Payment</p>
               <p><CloseIcon onClick={()=>setOpenPopup(false)} className="text-danger"/></p>
               </div>
           </DialogTitle>
           <DialogContent>
               {children}
               {/* <button className="btn btn-info " onClick={()=>setOpenPopup(false)}>Submit</button> */}
           </DialogContent>
       </Dialog>
    )
}

export default Popup
