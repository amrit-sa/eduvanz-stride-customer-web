import React from 'react'
import { Link } from 'react-router-dom'
import { asset } from './assets'
import { login, clearAuthMessage, updateMobile } from "../actions/auth";
import { sendAppUrl } from '../actions/user';
import $ from 'jquery'

export class GetOurApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      mobileNumber: "",
      subsMsg:'',
      errorMsg:'',
      isValid: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  clear = () =>{
    this.setState( { 
    mobileNumber:'',
    });
  }

  handleChange = (e) => {
    // this.setState({
    //  [e.target.name]:e.target.value
    // }); 
    this.setState({ subsMsg: "" });
    this.setState({ errorMsg: "" });
    const reg = /^[0]?[6789]\d{9}$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    //this.props.dispatch(clearAuthMessage());
    if (e.target.value !== '') {
      if (!pattern.test(e.target.value)) {
        this.setState({ isValid: false, errorMsg: "Please enter only number.", mobileNumber: "" });
        document.getElementById('mobile-number').value = "";
      } else if (e.target.value.length === 11) {
        console.log(reg.test(e.target.value)+ "ashutosh kumar");
        if (reg.test(e.target.value)) {
          this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
        } else {
          this.setState({ isValid: false, errorMsg: "Please enter valid mobile number.", mobileNumber: e.target.value });
        }
      } else {
        this.setState({ isValid: true, errorMsg: "", mobileNumber: e.target.value });
      }
    } else {
      this.setState({ isValid: false, errorMsg: "", mobileNumber: e.target.value });
    }
  }

  modalClose=(e)=>{
    e.preventDefault();
    console.log('techmatrix');
    window.$('#updatemodal').modal('hide')
  }


  handleSubmit = (event) => {
    const { mobileNumber } = this.state;
    this.setState({ isValid: false });
    this.setState({ errorMsg: "" });
    event.preventDefault(); 
    const { sfid } = this.props;
    let givenData = {
                     mobile: mobileNumber,
                    } ;

                  this.props.dispatch(sendAppUrl(givenData)).then(
                    (response)=>{
                      console.log(response);
                        if(response.status=='success')
                        {
                          this.clear();
                           this.setState({subsMsg:response.message});
                           
                        }                    
                 })
    
  }
  render() {
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    return (
      <>
        
         <ul className="text_icons">
            <li><Link to="" className="getappsty" data-toggle="modal" data-target="#updatemodal" 
                    >
                    Get our App <img src={asset+"images/icons/app-icon.png"} />
                    </Link>
                </li>
                {/* onClick = {(e)=>{
                     e.preventDefault()
                     window.open("https://play.google.com/store/apps/details?id=com.eduvanzapplication&hl=en_IN&gl=US", '_blank')
                    }} */}
                     <li>
                   <Link to="/support" className="getappsty">
                         Help <img src={asset+"images/icons/qustionmark.png"} />
                    </Link>
            </li>
        </ul>




               <div className="modal fade qr" id="updatemodal" tabIndex="-1" role="dialog" aria-labelledby="writetous_before_loginTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered qr__popup" role="document">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
               
                <div className="modal-body qrPopup">
                 
                <h3><img src="images/icons/icon_Otp.svg" />Download Stride App</h3>

<div className='bottom p-0 col-sm-12 d-flex'>

  <div className='qrCol'>

      <img src="images/icons/qr-code.png" />

      <p className='text-center'  >For iPhone App</p>
      
  </div>

  <div className='qrCol'>

      <img src="images/icons/qr-code.png" />

      <p className='text-center'  >For Android App</p>
      
  </div>

  <span>OR</span>
  <form onSubmit={this.handleSubmit}>
  <div className='qrInput'>
 { this.state.mobileNumber.length === 10 && this.state.isValid === false ? (
      <div className="form-group">
        <div className="alert alert-danger" role="alert">
          {this.state.errorMsg}
        </div>
      </div>
    ) : ''}

    {
      this.state.subsMsg && this.state.subsMsg !=='' ? (
      <div className="form-group">
        <div className="alert text-success p-0" role="alert">
          {this.state.subsMsg}
        </div>
      </div>
    ) : ''
    }

      <input type="text" name="mobileNumber" 
       value={this.state.mobileNumber}
       onChange={this.handleChange} 
       placeholder="Enter Mobile Number"
       maxLength="10"
       id="mobile-number"
      required
        />

      <button type="submit" disabled={this.state.mobileNumber.length === 10 && this.state.mobileNumber != '' && this.state.isValid === true ? false : true} 
      class="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300" 
      style={this.state.mobileNumber.length === 10 && this.state.isValid === true ? styles : {}}
      >Text Me</button>
  </div>
  </form>
</div>

                </div>
                
              </div>
            </div>
          </div>
      </>
    )
  }
}

export default GetOurApp