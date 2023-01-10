import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap"
import { closePdfModel } from "../../actions/model" 


class PdfView extends Component {

    constructor() {
        super()
        this.state = {
           
        }
    }

    closeModel = () => {
        this.props.dispatch(closePdfModel())
    }

    render() {
        const { pdf_show, previewData } = this.props
        return (
            <>
                <Modal show={pdf_show} className="doc-modal" >
                    <Modal.Body>
                    <button onClick={this.closeModel} variant="secondary" className="cross"><img src="images/icons/icon-close.png" alt=""/></button>
                    <div className="iframesty">
                    <iframe src={previewData} />
                    </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        
                    </Modal.Footer> */}
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { pdf_show, previewData } = state.model;
    return {
        pdf_show,
        previewData
    };
  }

export default connect(mapStateToProps)(PdfView)