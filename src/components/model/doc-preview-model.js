import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal } from "react-bootstrap"
import { closeDocPreviewModel } from "../../actions/model" 


class DocPreview extends Component {

    constructor(props) {
        super(props)
    }

    closeModel = () => {
        this.props.dispatch(closeDocPreviewModel())
    }

    render() {
        const { doc_preview, doc_type, doc_base } = this.props
        let type = 1;
        let ext = "jpg";
        if(doc_type)
        {
            const getExt = doc_type.split("/");
            ext = getExt[1];
            if(ext ==="pdf" || ext ==="PDF")
            {
                type = 2
            }
        }
        return (
            <>
                <Modal show={doc_preview} className="doc-modal" >
                    <Modal.Body>
                    <button onClick={this.closeModel} variant="secondary" className="cross"><img src="images/icons/icon-close.png" alt=""/></button>
                    <div className="iframesty">
                        {type ===2?(
                            <iframe src={`data:${doc_type};base64,${doc_base}`} />
                        ):(
                            <img src={`data:${doc_type};base64,${doc_base}`} />
                        )}
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
    const { doc_preview, doc_type, doc_base } = state.model;
    return {
        doc_preview,
        doc_type,
        doc_base
    };
  }

export default connect(mapStateToProps)(DocPreview)