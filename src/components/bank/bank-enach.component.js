import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { getEnachStatus, updateEnachDownload } from "../../actions/user";
import UserService from "../../services/user.service";
import { openDocPreviewModel } from "../../actions/model"; 
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';


class BankEnach extends Component {

    constructor(props) {
        super(props)
        this.changeDownloadStatus = this.changeDownloadStatus.bind(this);
        this.upload = this.upload.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.state = {
            status: 0,
            isUploaded: false,
            progressInfos: [],
            photoFile: null,
            photoUrl: null,
            haveLimit: false,
            files: [],
            message: [],
        }
    }


    async componentDidMount(){
        const { dispatch, user } = this.props;
        let obj = {
            id: user
        }
        await dispatch(getEnachStatus(obj));
        $('.label input').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
            })

           
    }

    componentDidUpdate(){
        $('.error-close').click(function(){
           
            $(this).siblings('input').removeClass('filled')
        })
    }


    handleFileSelect = async (e) =>{
        e.preventDefault();
        const files = e.target.files;
        await this.setState({files:files,progressInfos:[]});
        this.uploadFiles();
       // console.log("files", files);
    }

    toBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    };

    upload = async (idx, file) => {
        let _progressInfos = [...this.state.progressInfos];
        const d = new Date()
        const time = d.getTime()
        const filePathsPromises = []
        let sizeError = 0;
        let fileError = 0;
        let fileSize = file.size / 1024 / 1024;
        let fname    = file.name;
        var re = /(\.PDF|\.pdf)$/i;
        if(fileSize > 5)
        {
            sizeError = 1;
        }
        if(!re.exec(fname))
        {
            fileError = 1;
        }
        if(fileError === 1 || sizeError === 1)
        {
            _progressInfos[idx].status = 2;
            if(fileError === 1)
            {
                _progressInfos[idx].message = "Unsupported File Type";
            }else if(sizeError === 1){
                _progressInfos[idx].message = "Max file size should be 5 MB";
            }
            this.setState({
                _progressInfos,
            });
        }else{
            let DataType = "ENACH FORM";
            let DocType = file.type
            let type = file.type
            let ext = "jpg";
            if(type)
            {
                const getExt = type.split("/");
                ext = getExt[1];
            }
            filePathsPromises.push(this.toBase64(file))
            const filePaths = await Promise.all(filePathsPromises);
            let mappedFiles = filePaths.map((base64File) => (base64File.replace(`data:${type};base64,`, "")));
            let data = {
                "token": this.props.salesForceToken,
                "parent_id": this.props.sfid,
                "fname": "eduvan-web-"+time+'.'+ext,
                "base64": mappedFiles[0],
                "doctype": DataType,
                "basetype": DocType,
                "id": parseInt(this.props.user),
                "statement": file
            }
            _progressInfos[idx].base64 = mappedFiles[0];
            _progressInfos[idx].baseType = DocType;
            this.setState({
                _progressInfos,
            });
            UserService.uploadEnach('upload_document', data, (event) => {
            _progressInfos[idx].percentage = Math.round((90 * event.loaded) / event.total);
            this.setState({
                _progressInfos,
            });
            })
            .then((response) => {
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Uploaded the file successfully"];
                    return {
                    message: nextMessage
                    };
                });
                const getData = response?response:'';
                if(getData && getData.status =="success")
                {
                    const resData = getData.data?getData.data:null;
                    if(!getData.file_status)
                    {
                        let docId = resData.DocumentId?resData.DocumentId:'';
                        _progressInfos[idx].status = 2;
                        _progressInfos[idx].message = getData.doc_message;
                        _progressInfos[idx].percentage = 100;
                        _progressInfos[idx].docID  = docId;
                        _progressInfos[idx].base64 = mappedFiles[0];
                        _progressInfos[idx].baseType = DocType;
                    }else{
                        let docId = resData.DocumentId?resData.DocumentId:'';
                        _progressInfos[idx].status = 1;
                        _progressInfos[idx].percentage = 100;
                        _progressInfos[idx].docID  = docId;
                        _progressInfos[idx].base64 = mappedFiles[0];
                        _progressInfos[idx].baseType = DocType;
                        if(getData.limit)
                        {
                            console.log("Limit", getData.limit);
                            this.setState({haveLimit: true});
                        }
                        this.setState({isUploaded: true});
                    }
                    console.log("getData", getData);
                    this.setState({ _progressInfos, });
                }
            })
            .catch((error) => {
                _progressInfos[idx].percentage = 0;
                _progressInfos[idx].status = 2;
                this.setState((prev) => {
                    let nextMessage = [...prev.message, "Could not upload the file"];
                    return {
                    progressInfos: _progressInfos,
                    message: nextMessage
                    };
                });
            });
        }
    }

    uploadFiles() {
        const { files } = this.state
        const selectedFiles = files;
        let _progressInfos = [];
    
        for (let i = 0; i < selectedFiles.length; i++) {
          _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name, id: i+1, docID: 0, base64:'', baseType:'', status: 0, message: '' });
        }
    
        this.setState(
          {
            progressInfos: _progressInfos,
            message: [],
          },
          () => {
            for (let i = 0; i < selectedFiles.length; i++) {
              this.upload(i, selectedFiles[i]);
            }
          }
        );
      }

      removeFile = (row, id) => {
        const { salesForceToken } = this.props;
        let obj = {
            id: id,
            token: salesForceToken
        }
        UserService.post(obj, 'removeDocument');
        let arr = this.state.progressInfos;
        arr = arr.slice(0);
        arr.splice(row, 1);
        this.setState({progressInfos: arr});
     }

     openFile = (base64, baseType) => {
         const { dispatch } = this.props
         let data = {
            base64: base64,
            baseType: baseType
         }
         dispatch(openDocPreviewModel(data));
     }



  changeDownloadStatus = async () => {
    const { dispatch, user } = this.props;
    let obj = {
        id: user
    }
    await dispatch(updateEnachDownload(obj));
  }
  
  
    render() {
            const { isLoading, senach, denach, history } = this.props
            const { progressInfos } = this.state;
            const btnStyle = {
                background: '#1F1F2D',
                borderRadius: '10px',
                color: '#ffffff'
              }
            let inputRef;          
        return (
            <>
            <Helmet>
                <title>Enach</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
                  <section className='bg-light'>
                    <div className='container-fluid'>
                        <div className='row justify-content-center'>
                        <div className='col-sm-3 bg-enach px-lg-5'>
                        {/* <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                            <ul className="breadcrumps">
                                <li className="b_back"><Link to="/ed_doc_others">Back</Link></li>
                            </ul>
                        </div> */}

                    <LogoSideBar sideTitle="Back" backLink='/ed_doc_others' />

                        <ul className="kyc_timeline">
                            <li className="complete">Registration</li>
                            <li className="complete">Limit Approval</li>
                            <li className="complete">Identity Verifcation</li>
                            <li className="has_child ongoing">AutoPay
                            <span className="sheading">Set up AutoPay & your account is automatically debited on due date </span>
                            <ul className="sub_timeline">
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="active">Bank Account</li>
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} >NACH</li>
                            </ul>
                            </li>
                            <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                        </ul>
                    </div>
                  
                 
                    <div className='col-sm-9 mt-5 px-lg-6 py-lg-3'>
                    <div className='w-100 mb-5 c_p_m_b pb-4'>
                        <div className='form_header px-3 py-4'>
                            <h4 className='text-center m-0 form_header_h4'>AutoPay</h4>
                        </div>
                        <div  className='d-flex align-items-center justify-content-center pt-3'>
                            <div className='d-flex align-items-center mx-3 stext-111'>
                            Set up AutoPay & your account is automatically debited on due date 
                            </div>
                         </div>
                        <div className='hr-line my-3'></div>
                        <div className='d-flex justify-content-center'>
                        Account Number: *******9098
IFSC code: SBIN000003
                        </div>
                        
                    
                        <div className='row justify-content-center py-4'>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <div className='col-12'>
                                    After clicking on continue:
01
Download the physical NACH form
02
Fill and sign the printed copy of the form
03
Scan the signed copy and upload the file here
                                                </div>
                                </div>
                                <div className='row pt-4 pb-lg-5 pb-4'>
                                    <div className='col-lg-6'>
                                    Click on the below button to download NACH mandate
                                    </div>
                                </div>
                                    
                             
                                <div className='row mb-4'>
                                    <div className='col-lg-6 d-flex justify-content-center'>
                                    <a href="assets/A220325570_nach.pdf" download={"enach.pdf"}><button onClick={this.changeDownloadStatus} disabled={senach && senach.download_status===1} className='continue-btn'>Download Form</button></a>
                                    </div>
                                    <div className='col-lg-6 d-flex justify-content-center'>
                                                <input
                                                    type="file"
                                                    style={{display: 'none'}}
                                                    ref={refParam => inputRef = refParam}
                                                    onChange={this.handleFileSelect}
                                                    accept="application/pdf"
                                                />
                                        <button onClick={() => inputRef.click()} type="button" className='continue-btn'>Upload Form</button>
                                    </div>
                                </div>

                                {progressInfos &&
                                        progressInfos.map((progressInfo, index) => (
                                        <div key={`item-${index}`} className='uploading_row mb-3 d-flex'>
                                            {progressInfo.status ===0?(
                                                <>
                                                <div className="left">
                                                    <div className='upload_progress_wrapper'>
                                                        <div className='upload_progress' style={{"width":`${progressInfo.percentage}%`}}>
                                                            <h5 className='m-0 mb-2'>Uploading</h5>
                                                            <p className='m-0 mb-2'>{progressInfo.percentage}% 5 Second left</p>
                                                            <div className='u_p_b'></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                        <div>
                                                            <button type='button' className='pause_btn'>
                                                                <img src={asset+"images/image74.png"} alt="image74"  className='img-fluid'/>
                                                            </button>
                                                            <button className='d-none'></button>
                                                        </div>
                                                        <button onClick={()=>this.removeFile(index, progressInfo.docID)} type="button" className='cancel_btn'>
                                                            <img src={asset+"images/cross.png"} alt="cross"  className='img-fluid'/>
                                                        </button>
                                                    </div>
                                                </div>
                                                </>
                                            ):progressInfo.status ===1?(
                                                <>
                                                    <div className="left d-flex align-items-center up_doc 333">
                                                        <div className='col-sm-6 d-flex align-items-center'>
                                                            <div style={{cursor:'pointer'}} onClick={() => this.openFile(progressInfo.base64, progressInfo.baseType)}>
                                                                <img src={asset+"images/statement.png"} alt="Vector-13"  className='img-fluid'/>
                                                            </div>
                                                            <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5>
                                                        </div>
                                                       {/*  <div className='col-sm-6 d-flex justify-content-end pr-4'>
                                                            <p className='mb-0'>4MB</p>
                                                        </div> */}
                                                    </div>
                                                    <div className="right">
                                                        <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                            <button onClick={()=>this.removeFile(index, progressInfo.docID)} type="button" className='delete_btn'>
                                                                <img src={asset+"images/Vector-13.png"} alt="Vector-13"  className='img-fluid'/>
                                                            </button>
                                                            <button type='button' className='tick_btn'>
                                                                <img src={asset+"images/tick-white.png"} alt="image 74"  className='img-fluid'/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ):progressInfo.status ===2?(
                                                <>
                                                    <div className="left d-flex align-items-center up_doc ">
                                                        <div className='col-sm-6 d-flex align-items-center'>
                                                            <div>
                                                                <img src={asset+"images/statement.png"} alt="Vector-13"  className='img-fluid'/>
                                                            </div>
                                                            <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5>
                                                        </div>
                                                        <div className='col-sm-6 d-flex justify-content-end pr-4'>

                                                    <div className='d-flex align-items-center'>
                                                            <p className='mb-0'>{progressInfo.message?progressInfo.message:'Network Error'}</p>

                                                    <div className="right ml-3">
                                                        <div className='d-flex justify-content-between py-4 btn_set_last'>
                                                            <button type='button' className='wrong'>
                                                                <img src={asset+"images/s_c.png"} alt=""  className='img-fluid'/>
                                                            </button>
                                                            <button type='button' className='delete_btn'>
                                                                <img src={asset+"images/Vector-12.png"} alt=""  className='img-fluid'/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                   
                                                </>
                                            ):''}
                                            
                                            
                                        </div>
                                        ))}  

                                        <div className="row">
                                            <div className="col-sm-12 d-flex justify-content-center">
                                                <div className="col-sm-6">
                                                    {this.state.isUploaded && (
                                                <button type="button" onClick={() => this.props.history.push("/home")} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal"} style={btnStyle} >
                                                    Continue
                                                </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                               
                            </div>
                        </div>
                     
                        <div className='enach-footer p-3 pr-5 shadow'>
                              <div className='d-flex justify-content-lg-end justify-content-center'>
                                {/* <div className='d-flex align-items-center'>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Get our App <span className='ml-2'><img src={asset+"images/icons/app-icon.png"} alt="app" /></span></div>
                                    <div className="s-l" style={{"height":"27px"}}></div>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Help <span className='help-icon ml-2'>?</span></div>
                                </div> */}
                                  <GetOurApp 
                  dispatch={this.props.dispatch}
                />
                              </div>
                            </div>
                    </div>
                    </div>
                   
                </div>
                </div>
            </section>

            </>
        )
    }
}

function mapStateToProps(state) {
    const { senach, denach } = state.user;
    const { user, isLoading, salesForceToken, sfid } = state.auth;
    return {
        isLoading,
        user,
        senach,
        denach,
        salesForceToken,
        sfid
    };
}

export default connect(mapStateToProps)(BankEnach);