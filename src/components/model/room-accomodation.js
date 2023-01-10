import React, { useState, useEffect } from 'react'
import { connect} from 'react-redux'
import { asset } from "../../common/assets";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import "./room-accomodation.css";
import { data } from 'jquery';



export const mapStateToProps = (state) => {
    const { user, sfid } = state.auth;
    const { loan_amount } = state.user;
    const { plans } = state.payment;
    return {
        currentUser: state.currentUser,
        user,
        sfid,
        loan_amount,
        plans,

    }
}

const RoomAccomodation = (props) => {

    const [open, setOpen] = useState(props.isOpen);

    const [imgindex,setimgindex]=useState(0)
    const handleClose = () => {
        setOpen(false)
        props.onClose()
        
    };

const previous =() =>{
    if(imgindex>0){
    setimgindex(imgindex-1)
    }
}

const next =() =>{
    if(imgindex<props.data.length-1){
        setimgindex(imgindex+1)
    }
    
}
    return (
        <>
            <Dialog className='MuiDialog-paperWidthSm' open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ "height": "30rem", "maxWidth": "60rem !important" }}>
                <DialogContent>

                    <div className='container'>
                        <div className='col-2 text-right'>
                            <img src={asset + "images/icons/cross3.png"} alt="crosicon" onClick={handleClose} style={{ "marginLeft": "500px" }} />
                        </div>
                        <div className='row'>
                            <div className='d-flex'>
                                <img src={asset + "images/icons/previous.png"} alt="previous" className='previous-icon' onClick={previous} />
                                <img className='img-size text-center'
                                    src={props.data[imgindex]}
                                    alt="upgard"
                                />
                                <img src={asset + "images/icons/next.png"} alt="next" className='next-icon' onClick={next} />
                            </div>
                        </div>
                        <div className='row'>
                            {props.data.map((item)=>(
                                <img className='room-img text-center'
                                src={item}
                                alt="upgard"
                            />
                            ))}
                            
                            {/* <img className='room-img text-center'
                                src={asset + 'images/dd5.png'}
                                alt="upgard"
                            />
                            <img className='room-img text-center'
                                src={asset + 'images/dd5.png'}
                                alt="upgard"
                            />
                            <img className='room-img text-center'
                                src={asset + 'images/dd5.png'}
                                alt="upgard"
                            /> */}

                        </div>

                        <div className='d-flex'>
                            <h6>Norman House</h6>
                            <span>#20, 20th B Cross, near Rama Temple , Sri Ram temple road, Ejipura</span>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>

        </>
    )
}

export default connect(mapStateToProps)(RoomAccomodation)