import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap"
import { closeUploadModel } from "../../actions/model" 


class Digilocker extends Component {

    constructor() {
        super()
        this.state = {
            isFileSelected: false,
            isDragg: false,
            content: '',
            documents: []
        }
    }

    closeModel = () => {
        this.props.dispatch(closeUploadModel())
    }

    async componentDidUpdate(prevProps)
    {
        if(prevProps.digilocker_show !==this.props.digilocker_show)
        {
            let digilocker_link = this.props.digilocker_link;
            console.log("Props Changed");
            var myHeaders = new Headers();
            myHeaders.append("X-Frame-Options", "sameorigin");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            const getDocdata = await fetch(digilocker_link, requestOptions).then((response) => response.text())
                .then((response) => {
                    return response;
                });
            this.setState({content: getDocdata});
        }
    }

    render() {
        const { digilocker_show, digilocker_link } = this.props
        return (
            <>
                <Modal show={digilocker_show} >
                    <Modal.Body>
                        <div className="col-md-12" dangerouslySetInnerHTML={{ __html: `<iframe src='https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=C2C4CE03&redirect_uri=https://testapi.karza.in/v3/digilocker/get-token&state=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDQyOTc3NjUsInJlcXVlc3RJZCI6ImY1ZmE3MjBlLWM2OGYtNGViZi05NTU0LWIwOThmMDhkMzY1YyJ9.hWLKpM8RWNpeS7Bdj2yXkX5o5ZMoMbbmzeeLcOOR1so' />`}} >
                           {/*  <iframe name="iframe1" src={digilocker_link+'?:embed=yes'} target="_parent" frameBorder="0" allowFullScreen></iframe> */}
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { digilocker_link } = state.user;
    const { digilocker_show } = state.model;
    return {
        digilocker_link,
        digilocker_show
    };
  }

export default connect(mapStateToProps)(Digilocker)