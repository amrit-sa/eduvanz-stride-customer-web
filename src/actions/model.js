export const OPEN_UPLOAD_MANUAL_MODEL  = "OPEN_UPLOAD_MANUAL_MODEL";
export const CLOSE_UPLOAD_MANUAL_MODEL = "CLOSE_UPLOAD_MANUAL_MODEL";
export const OPEN_DIGILOCKER_MODEL  = "OPEN_DIGILOCKER_MODEL";
export const CLOSE_DIGILOCKER_MODEL = "CLOSE_DIGILOCKER_MODEL";
export const OPEN_PDF_MODEL  = "OPEN_PDF_MODEL";
export const CLOSE_PDF_MODEL = "CLOSE_PDF_MODEL";
export const OPEN_VIRTUAL_CARD = "OPEN_VIRTUAL_CARD";
export const CLOSE_VIRTUAL_CARD = "CLOSE_VIRTUAL_CARD"
export const OPEN_DOC_PREVIEW_MODEL  = "OPEN_DOC_PREVIEW_MODEL";
export const CLOSE_DOC_PREVIEW_MODEL = "CLOSE_DOC_PREVIEW_MODEL";
export const OPEN_VIDEO_MODAL = "OPEN_VIDEO_MODAL";
export const CLOSE_VIDEO_MODAL = "CLOSE_VIDEO_MODAL";

export const openDigilockerModel = () => (dispatch) => {
    dispatch({
        type: OPEN_DIGILOCKER_MODEL
    });
}

export const videomodal_open = (video_url) => (dispatch) => {
    dispatch({
        type: OPEN_VIDEO_MODAL,
        payload:video_url
    });
}

export const videomodal_close = () => (dispatch) => {
    dispatch({
        type: CLOSE_VIDEO_MODAL
    });
}

export const closeDigilockerModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_DIGILOCKER_MODEL
    });
}

export const openUploadModel = () => (dispatch) => {
    dispatch({
        type: OPEN_UPLOAD_MANUAL_MODEL
    });
}

export const closeUploadModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_UPLOAD_MANUAL_MODEL
    });
}

export const openPdfModel = (getData) => (dispatch) => {
    dispatch({
        type: OPEN_PDF_MODEL,
        payload: getData
    });
}

export const openVirtualCardModel = () => (dispatch) => {
    dispatch({
        type: OPEN_VIRTUAL_CARD
    });
}

export const closeVirtualCardModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_VIRTUAL_CARD
    });
}

export const closePdfModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_PDF_MODEL
    });
}

export const openDocPreviewModel = (getData) => (dispatch) => {
    dispatch({
        type: OPEN_DOC_PREVIEW_MODEL,
        payload: getData
    });
}

export const closeDocPreviewModel = () => (dispatch) => {
    dispatch({
        type: CLOSE_DOC_PREVIEW_MODEL
    });
}


  