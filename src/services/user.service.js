import axios from "axios";
import $ from 'jquery';
import authHeader, { sfHeader } from "./auth-header";
import { CROSS_URL, UPLOAD_URL } from "./api";

const API_URL = process.env.REACT_APP_API_URI;
const token = localStorage.getItem('token');
if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// const API_URL = process.env.REACT_APP_PUBLIC_DEV_URL;
class UserService {

  get(Url) {
    return axios
      .get(API_URL + Url)
      .then((response) => {
        return response.data;
      });
  }

  post(getdata, Url) {
    let config = {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwMjUsImlhdCI6MTY2NjA5Njc2MiwiZXhwIjoxNjY2MTgzMTYyfQ.0lRrpeyD7WHMc9wqq3CMpiGW9h6Q9nm_AZVZoi8yAmk`
      }
    }
    return axios
      .post(API_URL + Url, getdata )
      .then((response) => {
        return response.data;
      });
  }

  uploadFile(getdata,Url,) {
    return axios.post(API_URL + Url, getdata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': true,
      }}).then((response) => {
      return response.data;
    });
  }

  uploadPhoto(getdata,Url,) {
    return axios.post(API_URL + Url, getdata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': true,
      }}).then((response) => {
      return response.data;
    });
  }

  ocrUploadFile(getdata,Url,) {
    return axios.post('http://localhost:3000/api/orc_verification', getdata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': true,
      }}).then((response) => {
      return response.data;
    });
  }

  uploadBankStatement(statement) {
    try{
      var formdata = new FormData();
      formdata.append("file", statement);
      formdata.append('metadata', `{ "password": "", "bank":"", "name":"" }\n}`);
      return axios.post("/uploadpdf", formdata, {
        mode: 'no-cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': true,
          'channel_id': 'MOB',
          'transaction_id': 'asdasd',
          'client_id': '918e4acddf60379f8ef62a1a07ee4a14d807ab7e',
          'client_secret': 'e448ec974f91c73a23cf1d672b8ba548b34ec182'
        },
        mode: 'cors' }).then((response) => {
        return response.data;
      });
    } catch (e){
      return  { status: "error", message: e.message ? e.message : e }
    }
  }

  upload(Url, getdata, onUploadProgress) {
    const { token, parent_id, fname, base64, doctype, basetype, id, statement,docVerified } = getdata
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": "Bank Statement",
      "catType": "Income Proof",
      "is_doc_verified" : docVerified
    }
    return axios.post(API_URL+"heroku_upload", data, {
      headers: sfHeader(token),
      onUploadProgress,
    }).then(async (response) => {
      const getData = response.data;
      let resObj = response.data;
      if(getData && getData.status !== undefined && getData.status === "success")
      {
        const resData = getData.data?getData.data:null;
        var formdata = new FormData();
        formdata.append("files", statement);
        formdata.append("user_sfid", parent_id);
        const getRes = await this.uploadFile(formdata, "bankstatement_upload");
        if(getRes && getRes.status && getRes.status =="Submitted")
        {
            let fileObj = { 
                document_id : resData.DocumentId?resData.DocumentId:null,
                document_type: doctype,
                doc__type: basetype,
                user_sfid: parent_id
             }
             let analiseObj = {
              user_sfid: parent_id,
                doc_id: getRes.docId
             }
             await this.post(fileObj, "upload_document");
            //  const ansData = await this.post(analiseObj, "bank_statent_upload");
            //  if(ansData && ansData.status =="success")
            //  {
            //     const downData = ansData.data;
            //     resObj.file_status = downData.isvalid;
            //     resObj.doc_message = downData.message ;
            //     resObj.limit = downData.limit ;
            //  }
        }
      }
      return resObj;
    });
  }
  async uploadBank(Url, getdata, onUploadProgress) {
    const { token, parent_id, fname, base64, doctype, basetype, id, statement,docVerified } = getdata
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": "Bank Statement",
      "catType": "Income Proof",
      "is_doc_verified" : docVerified
    }
    // return axios.post(API_URL+"heroku_upload", data, {
    //   headers: sfHeader(token),
    //   onUploadProgress,
    // }).then(async (response) => {
    //   const getData = response.data;
    //   let resObj = response.data;
    //   if(getData && getData.status !== undefined && getData.status === "success")
    //   {
        // const resData = getData.data?getData.data:null;
        var formdata = new FormData();
        formdata.append("files", statement);
        formdata.append("user_sfid", parent_id);
        const getRes = await this.uploadFile(formdata, "bankstatement_upload");
        if(getRes && getRes.status && getRes.status =="Submitted")
        {
            let fileObj = { 
                document_id : getRes.docId?getRes.docId:null,
                document_type: doctype,
                doc__type: basetype,
                user_sfid: parent_id
             }
             let analiseObj = {
              user_sfid: parent_id,
                doc_id: getRes.docId
             }
             await this.post(fileObj, "upload_document");
            //  const ansData = await this.post(analiseObj, "bank_statent_upload");
            //  if(ansData && ansData.status =="success")
            //  {
            //     const downData = ansData.data;
            //     resObj.file_status = downData.isvalid;
            //     resObj.doc_message = downData.message ;
            //     resObj.limit = downData.limit ;
            //  }
        }
      // }
      return getRes;
    // });
  }

  uploadEnach(Url, getdata, onUploadProgress) {
    const { token, parent_id, fname, base64, doctype, basetype, id, statement } = getdata
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": "ENACH FORM"
    }
    return axios.post(API_URL+"heroku_upload", data, {
      headers: sfHeader(token),
      onUploadProgress,
    }).then(async (response) => {
      const getData = response.data;
      let resObj = response.data;
      if(getData && getData.status !== undefined && getData.status === "success")
      {
        const resData = getData.data?getData.data:null;
            let fileObj = { 
                document_id : resData.DocumentId?resData.DocumentId:null,
                document_type: doctype,
                doc__type: basetype,
                id: id
             }
            
         //    await this.post(fileObj, "upload_document");
            
      }
      return resObj;
    });
  }

  statementAfterUpload(Url, getdata, onUploadProgress) {
    const { token, parent_id, fname, base64, doctype, basetype, id, statement } = getdata
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": "Bank Statement",
      "catType": "Income Proof"
    }
    return axios.post(API_URL+"heroku_upload", data, {
      headers: sfHeader(token),
      onUploadProgress,
    }).then(async (response) => {
      const getData = response.data;
      let resObj = response.data;
      if(getData && getData.status !== undefined && getData.status === "success")
      {
        const resData = getData.data?getData.data:null;
        var formdata = new FormData();
        formdata.append("files", statement);
        formdata.append("user_id", id);
        const getRes = await this.uploadFile(formdata, "bankstatement_upload");
        if(getRes && getRes.status && getRes.status =="Submitted")
        {
            let fileObj = { 
                document_id : resData.DocumentId?resData.DocumentId:null,
                document_type: doctype,
                doc__type: basetype,
                id: id
             }
             let analiseObj = {
                user_id: id,
                doc_id: getRes.docId
             }
          //   await this.post(fileObj, "upload_document");
             const ansData = await this.post(analiseObj, "after_bank_statement");
             if(ansData && ansData.status =="success")
             {
                const downData = ansData.data;
                resObj.file_status = downData.isvalid;
                resObj.doc_message = downData.message ;
                resObj.limit = downData.limit ;
             }
        }
      }
      return resObj;
    });
  }

  documentAfterUpload(URL, getdata, onUploadProgress) {
    const { token, parent_id, fname, base64, doctype, basetype, id, statement } = getdata
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": doctype,
      "catType": doctype =="Bank Statement"?"Income Proof":"Bank Account Proof"
    }
    //console.log("data", data);return;
    return axios.post(API_URL+"heroku_upload", data, {
      headers: sfHeader(token),
      onUploadProgress,
    }).then(async (response) => {
      const getData = response.data;
      let resObj = response.data;
      return resObj;
    });
  }

  async uploadProfile(givenData)
  {
    const { id, parent_id, fname, base64, doctype, token, livenessScore, isLive,docVerified } = givenData;
    let data = {
      "parent_id": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": doctype,
      "catType": "Photo",
      "is_doc_verified" : docVerified

    }
    localStorage.setItem("userBase", base64);
    const getdata = await this.post(data, 'heroku_upload')
        .then((response) => {
            return response;
        });
        console.log("getdata", getdata);
    if (getdata && getdata.status !== undefined && getdata.status === "success")
      {
          const resData = getdata.data?getdata.data:null;
            let docData = {
                user_sfid: parent_id,
                document_id: resData.DocumentId?resData.DocumentId:null,
                livenessScore: livenessScore,
                isLive: isLive,
            }
          return  await this.post(docData, 'upload_profile');
      } else {
          return { status: "error", message: getdata };
      }
  }

  async uploadDocument(givenData)
  {
    const { parent_id, fname, base64, doctype, token } = givenData;
    let data = {
      "parentId": parent_id,
      "fname": fname,
      "base64": base64,
      "doctype": doctype
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer  " + token);
    myHeaders.append("content-type", "application/json ");
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };
    return await fetch("api", requestOptions).then((response) => response.json())
        .then((response) => {
            return response;
        });
  }

  async uploadEduDocuments(getdata)
  {
    const { base64, doctype, basetype, parent_id, id, token, fileType, catType,is_doc_verified } = getdata;
    console.log('base64base64base64',is_doc_verified)
    if(Array.isArray(base64) && Array.isArray(doctype) && base64.length > 0)
    {
      await Promise.all(base64.map(async (item, index) =>
        {   
            let type;
            let ext = "jpg";
            if(basetype && basetype[index] !=undefined )
            {
                type = basetype[index];
                const getExt = type.split("/");
                ext = getExt[1];
            }
            const d = new Date()
            const time = d.getTime()
            let data = {
                parent_id: parent_id, 
                fname: `eduvan-${time}.${ext}`, 
                base64: item, 
                doctype: fileType[index], 
                catType: catType,
                token: token,
                is_doc_verified : is_doc_verified[index]
            }
            
            const getData =  await this.post(data, 'heroku_upload');
            if(getData && getData.status !== undefined && getData.status === "success")
            {
              const resData = getData.data?getData.data:null;
              let objData = {
                  document_id: resData.DocumentId?resData.DocumentId:null,
                  document_type: doctype[index],
                  doc__type: type?type:'',
                  id: id
              }
            //  await this.post(objData, 'upload_document');
            }
        }));
        return {  status:"success", "message":"Success"}
    }else{
      // this.props.history.push("/ed_doc_pan");

        return {  status:"success", "message":"Success"}
    }
  }
  
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
