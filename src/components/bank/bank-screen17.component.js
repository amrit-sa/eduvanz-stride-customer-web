import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { asset } from "../../common/assets";
import UserService from "../../services/user.service";
import {uploadBankStatement,uploadCheque} from "../../actions/user"
import { openDocPreviewModel } from "../../actions/model";
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen17 extends Component {

    constructor() {
        super()
        this.state = {
            progressInfos: [],
            photoFile: null,
            photoUrl: null,
            isSuccess: null,
            files: [],
            message: [],
            isDrag: false,
            documentType: "Cancelled Cheque"
        }
        this.upload = this.upload.bind(this)
        this.fileDrop = this.fileDrop.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this)
    }

    componentDidMount() {
        $('.tab_content').eq(0).show();

        $('.b_c_a_tabs button').on('click', function () {
            var tab_id = $(this).attr('data-target');

            $('.tab_content').hide();

            console.log(tab_id);
            $(this).addClass('active');
            $(this).parent().siblings().find('button').removeClass('active');
            $("#" + tab_id).show();
        })
    }

    replaceMiddle(string, n) {
        let str;
        if (n > 0) {
            str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g, "$1****$2");
        } else {
            str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g, "$1XXXXXX$2");
        }
        return str
    }

    handleFileSelect = async (e) => {
        
        e.preventDefault();
        const files = e.target.files;
        await this.setState({ files: files, progressInfos: [],filesUpload : files[0] });
        this.uploadFiles();
        // console.log("files", files);
    }

    dragOver = (e) => {
        e.preventDefault();
        this.setState({ isDrag: true });
    }

    dragEnter = (e) => {
        e.preventDefault();
        this.setState({ isDrag: true });
    }

    dragLeave = (e) => {
        e.preventDefault();
        this.setState({ isDrag: false });
    }

    fileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        await this.setState({ isDrag: false, files: files, progressInfos: [] });
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
        let fname = file.name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            _progressInfos[idx].status = 2;
            if (fileError === 1) {
                _progressInfos[idx].message = "Unsupported File Type";
            } else if (sizeError === 1) {
                _progressInfos[idx].message = "This file is too big!";
            }
            this.setState({
                _progressInfos,
            });
        } else {
            let DataType = this.state.documentType;
            let DocType = file.type
            let type = file.type
            let ext = "jpg";
            if (type) {
                const getExt = type.split("/");
                ext = getExt[1];
            }
            filePathsPromises.push(this.toBase64(file))
            const filePaths = await Promise.all(filePathsPromises);
            let mappedFiles = filePaths.map((base64File) => (base64File.replace(`data:${type};base64,`, "")));
            let data = {
                "token": this.props.salesForceToken,
                "parent_id": this.props.sfid,
                "fname": "eduvan-web-" + time + '.' + ext,
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
            UserService.documentAfterUpload('upload_document', data, (event) => {
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
                    const getData = response.data ? response.data : '';
                    if (getData && getData.Status == "Success") {
                        let docId = getData.DocumentId ? getData.DocumentId : '';
                        _progressInfos[idx].status = 1;
                        _progressInfos[idx].percentage = 100;
                        _progressInfos[idx].docID = docId;
                        _progressInfos[idx].base64 = mappedFiles[0];
                        _progressInfos[idx].baseType = DocType;
                        this.setState({ _progressInfos, });
                        this.setState({ isSuccess: true});
                    } else {
                        _progressInfos[idx].percentage = 0;
                        _progressInfos[idx].status = 2;
                        this.setState((prev) => {
                            let nextMessage = [...prev.message, "Could not upload the file"];
                            return {
                                progressInfos: _progressInfos,
                                message: nextMessage
                            };
                        });
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
                var FormData = require('form-data');
                var bankData = new FormData();
                bankData.append('file', this.state.filesUpload);
                bankData.append('user_sfid', localStorage.getItem('sfid'));
                this.props.dispatch(uploadCheque(bankData))
        }
    }

    uploadFiles() {
        const { files } = this.state
        const selectedFiles = files;
        let _progressInfos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            _progressInfos.push({ fileSize:  selectedFiles[i].size, percentage: 0, fileName: selectedFiles[i].name, id: i + 1, docID: 0, base64: '', baseType: '', status: 0, message: '' });
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
        // const sizeInMB = (this.state.progressInfos.fileSize / (1024*1024)).toFixed(2);
         console.log(this.state.progressInfos);
        // console.log(sizeInMB)
    }

    removeFile = (row, id) => {
        let obj = {
            id: id
        }
        UserService.post(obj, 'removeDocument');
        let arr = this.state.progressInfos;
        arr = arr.slice(0);
        arr.splice(row, 1);
        this.setState({ progressInfos: arr });
    }

    openFile = (base64, baseType) => {
        const { dispatch } = this.props
        let data = {
            base64: base64,
            baseType: baseType
        }
        dispatch(openDocPreviewModel(data));
    }

    handleTab = (value) => {
        this.setState({ documentType: value });
    }

    render() {
        const { files, progressInfos, documentType, message } = this.state;
        const { selectedBank, accountNo } = this.props;
        let inputRef;
        let accNumber = '';
        const btnStyle = {
            background: '#1F1F2D',
            borderRadius: '10px',
            color: '#ffffff'
          }
        if (accountNo) {
            accNumber = this.replaceMiddle(accountNo, 0);
        }

        return (
            <>
                <Helmet>
                    <title> Bank screen 17 </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <section className='bank_details_wrapper pt-0'>
                    <div className='container-zero'>
                        <div className='flex-w flex-tr vh_height'>
                            <div className='col-sm-3 login-bg'>
                                {/* <h4 onClick={() => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                                <div className="navigations">
                                    <ul className="breadcrumps">
                                        <li className="b_back cursor-point"><a href={void(0)} onClick={()=> this.props.history.goBack()} >Back</a></li>
                                    </ul>
                                </div> */}

                                <LogoSideBar sideTitle="Back" backLink='' historyGoBack="goBack" history={this.props.history} />  

                                <ul className="kyc_timeline pl-0 mt-1">
                                    <li className="complete">Registration</li>
                                    <li className="complete">Limit Approval</li>
                                    <li className="complete">Identity Verifcation</li>
                                    <li className="has_child ongoing">AutoPay

                                        <span className="sheading">Set up auto-pay and we automatically debit your account on due dates </span>
                                        <ul className="sub_timeline pl-0">
                                            <li style={{ cursor: 'pointer' }}  className="active">Bank Account</li>
                                            {/* <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_digilocker')} >NACH</li> */}
                                        </ul>
                                    </li>
                                    <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                                </ul>
                            </div>
                            <div className='col-sm-9 mt-4'>
                                <div className='w-100 mb-5 c_p_m_b pb-4 proofForm'>
                                    <div className='form_header px-3 py-4'>
                                        <h4 className='text-center m-0 form_header_h4'>Bank account proof</h4>
                                    </div>
                                    <p className='text-center mt-3 line_grey'>We are unable to verify your account, please upload bank statement to verify manually</p>
                                    <div class="bankProofBox">
                                 
                                        <div className='bank_customer_activity_wrapper'>
                                            <div className='d-flex justify-content-between py-2 px-3 bank_name_box'>
                                                <div className='d-flex align-items-center'>
                                                    <span style={{ "width": "170px" }} className="d-inline-block mr-1"><img src={selectedBank ? `${selectedBank.icon}` : ''} alt="state-bank" className='img-fluid' /></span>
                                                    {selectedBank ? selectedBank.name : ''}
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p className='m-0'>Account Number <span>{accNumber ? accNumber : '*******0000'}</span></p>
                                                    <button>
                                                        <span style={{ "width": "10px" }} className="d-inline-block ml-1"><img src={asset+"images/icons/icon_Edit.png"} alt="icon_Edit" className='img-fluid' />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='b_c_a_tabs_conteiner'>
                                            


                                            <div className='b_c_a_tabs mt-3'>
                                                <div className='row'>
                                                    <div className='col-lg-4'>
                                                        <button type='button' onClick={() => this.handleTab('Cancelled Cheque')} className={`${documentType == "Cancelled Cheque" ? "active" : ""}`} data-target="cc">Cancelled Cheque</button>
                                                    </div>
                                                    {/* <div className='col-lg-4'>
                                                        <button type='button' onClick={() => this.handleTab('Bank Passbook')} className={`${documentType == "Bank Passbook" ? "active" : ""}`} data-target="bp">Bank Passbook</button>
                                                    </div>
                                                    <div className='col-lg-4'>
                                                        <button type='button' onClick={() => this.handleTab('Bank Statement')} className={`${documentType == "Bank Statement" ? "active" : ""}`} data-target="bs">Bank Statement</button>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <div className='b_c_a_tabs_conteiner'>
                                                <div className={`drag_box text-center ${this.state.isDrag ? "drag-area drag-enter" : ""}`}
                                                    onDragOver={this.dragOver}
                                                    onDragEnter={this.dragEnter}
                                                    onDragLeave={this.dragLeave}
                                                    onDrop={this.fileDrop}
                                                >
                                                    <span className='d-block m-auto' style={{ "width": "210px" }}>
                                                        <img src={asset+"images/icons/drag_drop.png"} alt="mc" className='img-fluid' />
                                                    </span>
                                                    <input
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        ref={refParam => inputRef = refParam}
                                                        onChange={this.handleFileSelect}
                                                        accept="image/x-png,image/jpeg,image/jpg,application/pdf"
                                                        multiple
                                                    />
                                                    <label>Drag and Drop</label>
                                                    <button onClick={() => inputRef.click()} type="button" className='file-upload'><img src={asset+"images/icons/upload.png"} alt="mc" className='img-fluid' />  Upload Doc</button>
                                                    <p className='file-upload-size mt-3'>File should be PDF, Max file size 5 MB</p>
                                                    <p className="document-txt mt-4 mb-4 mt-4"><img src={asset+"images/icons/icon-ind.png"} alt="icon-ind2" className="img-fluid" /> Please ensure that document shows account number and IFSC code</p>
                                                </div>
                                                {progressInfos &&
                                                    progressInfos.map((progressInfo, index) => (
                                                        <div key={`item-${index}`} className='uploading_row mb-3 d-flex'>
                                                            {progressInfo.status === 0 ? (
                                                                <>
                                                                    <div className="left">
                                                                        <div className='upload_progress_wrapper'>
                                                                            <div className='upload_progress' style={{ "width": `${progressInfo.percentage}%` }}>
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
                                                                                    <img src={asset+"images/image74.png"} alt="image74" className='img-fluid' />
                                                                                </button>
                                                                                <button className='d-none'></button>
                                                                            </div>
                                                                            <button onClick={() => this.removeFile(index, progressInfo.docID)} type="button" className='cancel_btn'>
                                                                                <img src={asset+"images/cross.png"} alt="cross" className='img-fluid' />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : progressInfo.status === 1 ? (
                                                                <>
                                                                    <div className="left d-flex align-items-center up_doc">
                                                                        <div className='col-sm-6 d-flex align-items-center'>
                                                                            <div style={{ cursor: 'pointer' }} onClick={() => this.openFile(progressInfo.base64, progressInfo.baseType)}>
                                                                                <img src={asset+"images/statement.png"} alt="Vector-13" className='img-fluid' />
                                                                            </div>
                                                                            <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5>
                                                                        </div>
                                                                        {/*  <div className='col-sm-6 d-flex justify-content-end pr-4'>
                                                                <p className='mb-0'>4MB</p>
                                                            </div> */}
                                                                    </div>
                                                                    <div className="right">
                                                                        <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                                            <button onClick={() => this.removeFile(index, progressInfo.docID)} type="button" className='delete_btn'>
                                                                                <img src={asset+"images/Vector-13.png"} alt="Vector-13" className='img-fluid' />
                                                                            </button>
                                                                            <button type='button' className='tick_btn'>
                                                                                <img src={asset+"images/tick-white.png"} alt="image 74" className='img-fluid' />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : progressInfo.status === 2 ? (
                                                                <>
                                                                    <div className="left d-flex align-items-center up_doc">
                                                                        <div className='col-sm-6 d-flex align-items-center'>
                                                                            <div>
                                                                                <img src={asset+"images/statement.png"} alt="Vector-13" className='img-fluid' />
                                                                            </div>
                                                                            {/* <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5> */}
                                                                            <h5 className='m-0 ml-3'>{progressInfo.message}</h5>
                                                                        </div>
                                                                        <div className='col-sm-6 d-flex justify-content-end pr-4'>
                                                                            {/* <p className='mb-0'>{progressInfo.message ? progressInfo.message : 'Network Error'}</p> */}
                                                                            <p className='mb-0'>Max file size should be 5 MB</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="right">
                                                                        <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                                            <button type='button' className='wrong'>
                                                                                <img src={asset+"images/s_c.png"} alt="" className='img-fluid' />
                                                                            </button>
                                                                            <button type='button' className='delete_btn'>
                                                                                <img src={asset+"images/Vector-12.png"} alt="" className='img-fluid' />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : ''}

                                                        </div>
                                                    ))}
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-sm-12 d-flex justify-content-center">
                                                    <div className="col-sm-6">
                                                        {this.state.isSuccess && (
                                                            <button type="button" onClick={() => this.props.history.push("/home")} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal"} style={btnStyle} >
                                                                Continue
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
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
    const { selectedBank, accountNo } = state.user;
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    return {
        salesForceToken,
        selectedBank,
        isLoading,
        accountNo,
        sfid,
        user
    };
}

export default connect(mapStateToProps)(BankScreen17)