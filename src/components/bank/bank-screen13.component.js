import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import UserService from "../../services/user.service";
import { openDocPreviewModel } from "../../actions/model"; 
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen13 extends Component {

    constructor() {
        super()
        this.state = {
            progressInfos: [],
            photoFile: null,
            photoUrl: null,
            files: [],
            message: [],
            isDrag: false,
        }
        this.upload = this.upload.bind(this)
        this.fileDrop = this.fileDrop.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this)
    }

    handleFileSelect = async (e) =>{
        e.preventDefault();
        const files = e.target.files;
        await this.setState({files:files,progressInfos:[]});
        this.uploadFiles();
       // console.log("files", files);
    }

    dragOver = (e) => {
        e.preventDefault();
        this.setState({ isDrag: true});
    }
  
    dragEnter = (e) => {
        e.preventDefault();
       this.setState({ isDrag: true});
    }
  
    dragLeave = (e) => {
        e.preventDefault();
        this.setState({ isDrag: false});
    }
  
    fileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        await this.setState({isDrag: false,files:files, progressInfos:[]});
        this.uploadFiles();
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
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
            let DataType = "Bank-Statement";
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
                "id": parseInt(this.props.user)
            }
            _progressInfos[idx].base64 = mappedFiles[0];
            _progressInfos[idx].baseType = DocType;
            this.setState({
                _progressInfos,
            });
            UserService.upload('upload_document', data, (event) => {
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
            const getData = response.data?response.data:'';
            if(getData && getData.Status =="Success")
            {
                let docId = getData.DocumentId?getData.DocumentId:'';
                _progressInfos[idx].status = 1;
                _progressInfos[idx].percentage = 100;
                _progressInfos[idx].docID  = docId;
                _progressInfos[idx].base64 = mappedFiles[0];
                _progressInfos[idx].baseType = DocType;
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
        let obj = {
            id: id
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


    render() {
        const { files, progressInfos, message } = this.state;
        let inputRef;
        return (
            <>
            <Helmet>
                <title>Bank Screen 13</title>
            </Helmet>
     
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                    <div className="kyc_leftbar bg-3">
                        {/* <h4 className="mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div> */}

                        <LogoSideBar sideTitle="Back" backLink='' />    

                        <h4 className="mtext-105 cl6">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w justify-content-center">
                    <div className="form_width_1 ext10">
                    <div className="form_details mb-5">
                        <h4 className="bg-2 text-center imgaligned">Upload Bank Statement </h4>
                        <ul className="horizontal_list">
                            <li> Max file size 5 MB </li>
                            <li> File should be pdf, JPEG, PNG </li>
                            <li> Image should be clear </li>
                        </ul>
                        <form  className="otpform otpform-others fullwidth">
                        <div className="col-md-12">
                            <div className="form_spacing d-flex flex-col-m mn_height_3">
                                <div className={`upload_box boxstyle_2 d-block ${this.state.isDrag?"drag-area drag-enter":""}`}
                                     onDragOver={this.dragOver}
                                     onDragEnter={this.dragEnter}
                                     onDragLeave={this.dragLeave}
                                     onDrop={this.fileDrop}
                                >
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <img src={asset+'images/upload-data.png'} alt="" />
                                                <h3><span className="d-block">Drag and drop you image here </span>
                                                </h3>
                                                <input
                                                    type="file"
                                                    style={{display: 'none'}}
                                                    ref={refParam => inputRef = refParam}
                                                    onChange={this.handleFileSelect}
                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                                                    multiple
                                                />
                                                <button onClick={() => inputRef.click()} type="button" className={"btn btn-upload"}>
                                                Upload Photo
                                            </button> 
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
                                                    <div className="left d-flex align-items-center up_doc">
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
                                                    <div className="left d-flex align-items-center up_doc">
                                                        <div className='col-sm-6 d-flex align-items-center'>
                                                            <div>
                                                                <img src={asset+"images/statement.png"} alt="Vector-13"  className='img-fluid'/>
                                                            </div>
                                                            <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5>
                                                        </div>
                                                        <div className='col-sm-6 d-flex justify-content-end pr-4'>
                                                            <p className='mb-0'>{progressInfo.message?progressInfo.message:'Network Error'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="right">
                                                        <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                            <button type='button' className='wrong'>
                                                                <img src={asset+"images/s_c.png"} alt=""  className='img-fluid'/>
                                                            </button>
                                                            <button type='button' className='delete_btn'>
                                                                <img src={asset+"images/Vector-12.png"} alt=""  className='img-fluid'/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ):''}
                                            
                                            
                                        </div>
                                        ))}  

                                        <div className='mb-4'>&nbsp;</div>                               
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <div className="col-sm-6">
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="pos_abs">
                              <GetOurApp 
                  dispatch={this.props.dispatch}
                />                  
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
    const { salesForceToken, sfid, user, isLoading } = state.auth;
    return {
        salesForceToken,
        sfid,
        user,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen13)