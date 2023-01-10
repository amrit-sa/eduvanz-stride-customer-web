
const initialState = {
  upload_manual_show: false,
  digilocker_show: false,
  previewData: '',
  doc_type: '',
  doc_base: '',
  doc_preview: false,
  pdf_show: false,
  videomodalshow:false,
  video_url:'',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_VIDEO_MODAL':
      return {
        ...state,
        videomodalshow:true,
        video_url:payload
      };
    case 'CLOSE_VIDEO_MODAL':
      return {
        ...state,
        videomodalshow:false,
        video_url:""      
      };
    case 'OPEN_DOC_PREVIEW_MODEL':
      return {
        ...state,
        doc_preview: true,
        doc_type: payload.baseType,
        doc_base: payload.base64
      };
    case 'CLOSE_DOC_PREVIEW_MODEL':
      return {
        ...state,
        doc_preview: false,
        doc_type: '',
        doc_base: '',
      };
    case 'OPEN_DIGILOCKER_MODEL':
      return {
        ...state,
        digilocker_show: true
      };
    case 'CLOSE_DIGILOCKER_MODEL':
      return {
        ...state,
        digilocker_show: false
      };
    case 'OPEN_UPLOAD_MANUAL_MODEL':
      return {
        ...state,
        upload_manual_show: true
      };
    case 'CLOSE_UPLOAD_MANUAL_MODEL':
      return {
        ...state,
        upload_manual_show: false
      };
    case 'OPEN_PDF_MODEL':
      return {
        ...state,
        pdf_show: true,
        previewData: payload
      };
    case 'CLOSE_PDF_MODEL':
      return {
        ...state,
        pdf_show: false,
        previewData: ''
      };

    case 'OPEN_VIRTUAL_CARD':
      return {
        virtual_card_show: true
      };

    case 'CLOSE_VIRTUAL_CARD':
      return {
        virtual_card_show: false
      };
    default:
      return state;
  }
}
