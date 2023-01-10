import React from "react";
import 'react-multi-carousel/lib/styles.css';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";
// import Button from 'react-bootstrap/Button';
import {videomodal_close} from '../../actions/model' 
class Videomodal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
         
        }
    }

    handleClose=()=>{
        this.props.dispatch(videomodal_close())
    }


    render() {
        const { videomodalshow , video_url} = this.props;

        return (
            <>


                <Modal show={videomodalshow} 
                 size="lg"
                 aria-labelledby="example-modal-sizes-title-lg"
                 onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <iframe src={video_url} width="100%" height="450px" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                       
                    </Modal.Footer> */}
                </Modal>


            </>
        );
    }
}

function mapStateToProps(state) {
    
    const { videomodalshow , video_url} = state.model;
    return {
        videomodalshow,
        video_url
    };
  }


export default connect(mapStateToProps)(Videomodal)








