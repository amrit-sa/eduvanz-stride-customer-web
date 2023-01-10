import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import UserService from "../../services/user.service";
import { openDocPreviewModel } from "../../actions/model";
import { updateLimit, isStatementUpload, getDocumentByType } from "../../actions/user";
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen7 extends Component {

    constructor() {
        super()
        this.state = {
            progressInfos: [],
            photoFile: null,
            photoUrl: null,
            haveLimit: false,
            files: [],
            message: [],
            isDrag: false,
            isLoading: false,
            isdisabled: true,
            showPdf: true,
            error: false
        }
        this.upload = this.upload.bind(this)
        this.fileDrop = this.fileDrop.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this)
    }
    componentDidMount = () => {
        let data = {
            "sfid": localStorage.getItem('sfid'),
            "doc_type": "Financial"
        }
        // this.props.dispatch(getDocumentByType(data)).then(res=>{
        //     if(res.status =='success'){
        //         let progressInfos = this.state.progressInfos
        //         progressInfos.push({status : 1})
        //         progressInfos.push({fileName : res && res.imageData[0] && res.imageData[0].title})
        //         this.setState({
        //             pdfImage : res && res.imageData[0] && res.imageData[0].base64 && res.imageData[0].base64.base64,
        //             progressInfos
        //         })
        //     }

        // })
    }
    handleFileSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        await this.setState({ files: files, progressInfos: [] });
        this.uploadFiles();
        // console.log("files", files);
    }
    handleFileDelete = () => {
        this.setState({ progressInfos: [] }, () => {
            window.location.reload(false)
        })
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
        var re = /(\.PDF|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            _progressInfos[idx].status = 2;
            if (fileError === 1) {
                this.setState({ error: true })
                _progressInfos[idx].message = "Unsupported File Type";
            } else if (sizeError === 1) {
                this.setState({ error: true })
                _progressInfos[idx].message = "Max file size should be 5 MB";
            }
            this.setState({
                _progressInfos,
            });
        } else {
            let DataType = "Bank-Statement";
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
                "id": this.props.sfid,
                "statement": file,
                docVerified: true
            }
            _progressInfos[idx].base64 = mappedFiles[0];
            _progressInfos[idx].baseType = DocType;
            this.setState({
                _progressInfos,
            });
            UserService.uploadBank('upload_document', data, (event) => {
            })
                .then((response) => {
                    _progressInfos[idx].percentage = Math.round((90));
                    this.setState({
                        _progressInfos,
                    });
                    this.setState((prev) => {
                        this.setState({ error: false })
                        let nextMessage = [...prev.message, "Uploaded the file successfully"];
                        return {
                            message: nextMessage
                        };
                    });
                    const getData = response ? response : '';
                    console.log('getDatagetDatagetData', JSON.stringify(getData))
                    if (getData && getData.status == "Submitted") {
                        const resData = getData ? getData : null;
                        if (!getData.file_status) {
                            let docId = resData.docId ? resData.docId : '';
                            _progressInfos[idx].status = 1;
                            _progressInfos[idx].message = 'File uploaded successfully';
                            _progressInfos[idx].percentage = 100;
                            _progressInfos[idx].docID = docId;
                            _progressInfos[idx].base64 = mappedFiles[0];
                            _progressInfos[idx].baseType = DocType;
                            this.setState({ isdisabled: false });
                            this.setState({ error: false })

                        } else {
                            let docId = resData.DocumentId ? resData.DocumentId : '';
                            _progressInfos[idx].status = 1;
                            _progressInfos[idx].percentage = 100;
                            _progressInfos[idx].docID = docId;
                            _progressInfos[idx].base64 = mappedFiles[0];
                            _progressInfos[idx].baseType = DocType;
                            this.setState({ haveLimit: true });
                            this.setState({ isdisabled: false });
                            /*  if(getData.limit)
                             {
                                 console.log("Limit", getData.limit);
                                 this.setState({haveLimit: true});
                             } */
                        }
                        console.log("getData", getData);
                        this.setState({ _progressInfos, });
                    }
                })
                .catch((error) => {
                    _progressInfos[idx].percentage = 0;
                    _progressInfos[idx].status = 2;
                    this.setState((prev) => {
                        this.setState({ error: true })
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
            _progressInfos.push({ percentage: 90, fileName: selectedFiles[i].name, id: i + 1, docID: 0, base64: '', baseType: '', status: 0, message: '' });
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
        this.setState({ progressInfos: arr }, () => {
            window.location.reload(false)
        });
    }

    openFile = (base64, baseType) => {
        this.setState({ showPdf: !this.state.showPdf })

        //  const { dispatch } = this.props
        //  let data = {
        //     base64: base64,
        //     baseType: baseType
        //  }
        //  dispatch(openDocPreviewModel(data));
    }

    updateLimit = async () => {
        const { dispatch, history, user, sfid } = this.props
        let sfids = localStorage.getItem('sfid')
        dispatch(isStatementUpload({ user_sfid: sfids, isStatementUpload: true,is_force_verification :false }))
        let limit = localStorage.getItem('limit_Available')
        if (!limit) {
            history.push("/ed_doc");
        } else {
            let data = {
                user_sfid: sfid
            }
            //    await dispatch(updateLimit(data)).then((response)=>{
            // });
            history.push("/ed_doc");
        }
    }
    base64toBlob = (data) => {
        let url = "data:application/pdf;base64," + data;
        return url;
    }

    render() {
        const { progressInfos } = this.state;
        console.log('progressInfosprogressInfosprogressInfos', JSON.stringify(this.state.progressInfos && this.state.progressInfos.length))
        const { history, isLoading } = this.props
        let inputRef;
        const btnStyle = {
            background: '#1F1F2D',
            borderRadius: '10px',
            color: '#ffffff'
        }
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Bank Statement </title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages bank_page">
                    <div className="container-zero">
                        <div className="flex-w flex-tr">
                            <div className="kyc_leftbar login-bg">
                                {/* <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div> */}

                                <LogoSideBar sideTitle="Back" backLink='' />

                                <h4 className="mtext-105 cl6 whiteText">Bank Statement</h4>

                            </div>
                            <div className="kyc_rightbar flex-w justify-content-center">
                                <div className="form_width_1 ext10">
                                    <div className="form_details mb-5">
                                        <h4 className="bg-2 text-center imgaligned">Upload Bank Statement Manually </h4>
                                        <ul className="horizontal_list">
                                            <li> Max file size 5 MB </li>
                                            <li> File should be PDF </li>
                                            <li> Image should be clear </li>
                                        </ul>
                                        <form className="otpform otpform-others fullwidth">
                                            <div className="col-md-12">
                                                <div className="form_spacing d-flex flex-col-m mn_height_3">
                                                    <div className={`uploadboxht bankstatement boxstyle_2 d-block ${this.state.isDrag ? "drag-area drag-enter" : ""}`}
                                                        onDragOver={this.dragOver}
                                                        onDragEnter={this.dragEnter}
                                                        onDragLeave={this.dragLeave}
                                                        onDrop={this.fileDrop}
                                                    >
                                                        {this.state.showPdf ? <><div className="row">
                                                            <div className="col-sm-12 text-center">
                                                                <img src={asset + 'images/upload-data.png'} alt="" className='img-fluid' />
                                                                <h3><span className="d-block">Drag and drop you image here </span>
                                                                </h3>

                                                                <input
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => inputRef = refParam}
                                                                    onChange={this.handleFileSelect}
                                                                    accept="application/pdf"
                                                                // multiple
                                                                />
                                                                {this.state.progressInfos && this.state.progressInfos.length >= 1 ? "" : <button onClick={() => inputRef.click()} type="button" className={"btn btn-upload"}>
                                                                    Upload Photo
                                                                </button>}
                                                            </div>
                                                            <p style={{ textAlign: "center" }}>
                                                                {/* <span >Only past 3/6 months statements reflecting regular income </span> */}
                                                                <span >Upload past 3-6 months bank statements to show your income</span>

                                                            </p>

                                                        </div><br /> </> : <div className="docimgs">
                                                            {/* <iframe style={{ display: 'block', height: '100%', width: '100%' }} src={this.base64toBlob(progressInfos && progressInfos[0].base64)} /> */}
                                                            {/* <img src={this.base64toBlob(item.base64.base64)}/>  */}
                                                        </div>}
                                                        {progressInfos &&
                                                            progressInfos.map((progressInfo, index) => (
                                                                <div key={`item-${index}`} className='uploading_row d-flex'>
                                                                    {console.log('progressInfo.percentage', progressInfo.percentage)}
                                                                    {progressInfo.status === 0 ? (
                                                                        <>
                                                                            <div className="left">
                                                                                <div className='upload_progress_wrapper'>
                                                                                    <div className='upload_progress' style={{ "width": `${progressInfo.percentage}%` }}>
                                                                                        <h5 className='m-0 mb-2'>Uploading</h5>
                                                                                        <p className='m-0 mb-2'></p>
                                                                                        <div className='u_p_b'></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="right">
                                                                                <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                                                    <div>
                                                                                        {/* <button type='button' className='pause_btn'>
                                                                <img src={asset+"images/image74.png"} alt="image74"  className='img-fluid'/>
                                                            </button> */}
                                                                                        <button className='d-none'></button>
                                                                                    </div>
                                                                                    <button onClick={() => this.removeFile(index, progressInfo.docID)} type="button" className='cancel_btn'>
                                                                                        <img src={asset + "images/cross.png"} alt="cross" className='img-fluid' />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : progressInfo.status === 1 ? (
                                                                        <>
                                                                            <div className="left d-flex align-items-center up_doc 333">
                                                                                <div className='col-sm-6 d-flex align-items-center'>
                                                                                    <div style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#iframeModal">
                                                                                        <div className='statementsec'>
                                                                                            <span className='iconbg'><i className="fa fa-eye" aria-hidden="true"></i></span>
                                                                                            <img src={asset + "images/statement.png"} alt="Vector-13" className='img-fluid' />
                                                                                        </div>
                                                                                    </div>
                                                                                    <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5>
                                                                                </div>
                                                                                {/*  <div className='col-sm-6 d-flex justify-content-end pr-4'>
                                                            <p className='mb-0'>4MB</p>
                                                        </div> */}
                                                                                <div className="modal fade" id="iframeModal" role="dialog">
                                                                                    <div data-dismiss="modal"><i class="fa fa-close closeicon" aria-hidden="true"></i></div>
                                                                                    <div className="modal-dialog modal-lg">
                                                                                        <div className="modal-content">
                                                                                            <div className='modalIfram'>
                                                                                                <iframe style={{ display: 'block', height: '100%', width: '100%' }} src={this.base64toBlob(progressInfos && progressInfos[0].base64)} />
                                                                                            </div>

                                                                                        </div>

                                                                                    </div>
                                                                                </div>



                                                                            </div>
                                                                            <div className="right">
                                                                                <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                                                    <button onClick={() => this.removeFile(index, progressInfo.docID)} type="button" className='delete_btn'>
                                                                                        <img src={asset + "images/Vector-13.png"} alt="Vector-13" className='img-fluid' />
                                                                                    </button>
                                                                                    <button type='button' className='tick_btn'>
                                                                                        <img src={asset + "images/tick-white.png"} alt="image 74" className='img-fluid' />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : progressInfo.status === 2 ? (
                                                                        <>
                                                                            <div className="left d-flex align-items-center up_doc ">
                                                                                <div className='col-sm-6 d-flex align-items-center'>
                                                                                    <div>
                                                                                        <img src={asset + "images/statement.png"} alt="Vector-13" className='img-fluid' />
                                                                                    </div>
                                                                                    <h5 className='m-0 ml-3'>{progressInfo.fileName}</h5><br />
                                                                                </div>
                                                                                <div className='col-sm-6 d-flex justify-content-end pr-4'>

                                                                                    <div className='d-flex align-items-center'>

                                                                                        <div className="right ml-3">
                                                                                            <div className='d-flex py-4 btn_set_last btnsec'>
                                                                                                <button type="button" onClick={() => this.handleFileDelete()} className="btn_delete"><img src={asset + "images/Vector-delete.svg"} /></button>
                                                                                                <button type='button' className='wrong'>
                                                                                                    <img src={asset + "images/s_c.png"} alt="" className='img-fluid' />
                                                                                                </button>
                                                                                                {/* <button type='button' className='delete_btn'>
                                                                <img src={asset+"images/Vector-12.png"} alt=""  className='img-fluid'/>hiii
                                                            </button> */}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : ''}


                                                                </div>
                                                            ))}

                                                        {progressInfos && progressInfos.length > 0 && progressInfos[0].message.length> 0 && 
                                                            <>
                                                                {this.state.error ?
                                                                    <div className="alert alert-danger">{progressInfos[0].message }</div>
                                                                    :
                                                                    <div className="alert text-success">{progressInfos[0].message }</div>
                                                                }
                                                            </>
                                                        }
                                                        {/* <p className='mb-0 errormsg'>{progressInfos && progressInfos.length>0?progressInfos[0].message:''}</p> */}
                                                        {/* <h1>frfrtgttgt</h1> */}
                                                        {/* <div className='mb-4'>&nbsp;</div>    */}



                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 d-flex justify-content-center">
                                                    <div className="col-sm-6">
                                                        {/* {this.state.progressInfos && this.state.progressInfos.length>=1 && (
                                    <button type="button" onClick={this.updateLimit} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal"} style={progressInfos && progressInfos.length>0 && progressInfos[0].message ? {} :btnStyle} disabled={progressInfos && progressInfos.length>0 && progressInfos[0].message ? true :false}>
                                         Continue
                                    </button>
                                         )} */}
                                                        {this.state.progressInfos && this.state.progressInfos.length >= 1 && (
                                                            <button type="button" onClick={this.updateLimit} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal"} style={this.state.isdisabled ? {} : btnStyle} disabled={this.state.isdisabled}>
                                                                Continue
                                                            </button>
                                                        )}
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

export default connect(mapStateToProps)(BankScreen7)