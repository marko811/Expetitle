import {
  FETCH_STAGES,
  FETCH_STAGES_SUCCESS,
  FETCH_STAGES_FAILED,
  FETCH_IMPORTANT_DATES,
  FETCH_IMPORTANT_DATES_SUCCESS,
  FETCH_IMPORTANT_DATES_FAILED,
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILED,
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
  PREVIEW_DOCUMENT,
  PREVIEW_DOCUMENT_SUCCESS,
  PREVIEW_DOCUMENT_FAILED,
  RESET_STATE,
  FETCH_TRANSACTION_DETAILS_SUCCESS,
  FETCH_TRANSACTION_DETAILS_FAILED,
} from './constants';
import {Linking} from 'react-native';
import {ExpApi} from '../../services';

export const FetchTransactionDetails = (id, token) => {
  return dispatch => {
    dispatch({type: FETCH_STAGES});
    ExpApi.FetchTransactionDetails(id, token, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_TRANSACTION_DETAILS_SUCCESS,
            details: response.data.data.transaction,
          });
        } else {
          dispatch({
            type: FETCH_TRANSACTION_DETAILS_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_TRANSACTION_DETAILS_FAILED, message: error});
        console.log(error);
      });
  };
};


export const FetchStages = (id, token) => {
  return dispatch => {
    dispatch({type: FETCH_STAGES});
    ExpApi.FetchStages(id, token, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_STAGES_SUCCESS,
            Stages: response.data.data.stages,
          });
        } else {
          dispatch({type: FETCH_STAGES_FAILED, message: response.data.message});
        }
      })
      .catch(error => {
        dispatch({type: FETCH_STAGES_FAILED, message: error});
        console.log(error);
      });
  };
};

export const FetchImportantDates = (id, token) => {
  return dispatch => {
    dispatch({type: FETCH_IMPORTANT_DATES});
    ExpApi.FetchImportantDates(id, token, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_IMPORTANT_DATES_SUCCESS,
            ImportantDates: response.data.data.dates,
          });
        } else {
          dispatch({
            type: FETCH_IMPORTANT_DATES_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_IMPORTANT_DATES_FAILED, message: error});
        console.log(error);
      });
  };
};

export const FetchDocuments = (id, token, page, prevDocs) => {
  return dispatch => {
    dispatch({type: FETCH_DOCUMENTS});
    ExpApi.FetchDocuments(id, page, token, {})
      .then(response => {
        if (response.status === 200) {
          if (page === 1) {
            dispatch({
              type: FETCH_DOCUMENTS_SUCCESS,
              payload: response.data.data.documents,
            });
          } else {
            response.data.data.documents.map(document => {
              prevDocs.push(document);
            });
            dispatch({
              type: FETCH_DOCUMENTS_SUCCESS,
              payload: prevDocs,
            });
          }
        } else {
          dispatch({
            type: FETCH_DOCUMENTS_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_DOCUMENTS_FAILED, message: error});
        console.log(error);
      });
  };
};

export const FetchContacts = (id, token) => {
  return dispatch => {
    dispatch({type: FETCH_CONTACTS});
    ExpApi.FetchContacts(id, token, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_CONTACTS_SUCCESS,
            Contacts: response.data.data.contact,
          });
        } else {
          dispatch({
            type: FETCH_CONTACTS_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: FETCH_CONTACTS_FAILED, message: error});
        console.log(error);
      });
  };
};

export const PreviewDocument = (id, token, openLink, ViewDocument) => {
  return dispatch => {
    dispatch({type: PREVIEW_DOCUMENT});
    ExpApi.DownloadDocument(id, token, {})
      .then(response => {
        if (response.status === 200) {
          let base = response.config.baseURL.slice(0, -1);
          let url = `${response.config.baseURL}${response.config.url}`;
          dispatch({
            type: PREVIEW_DOCUMENT_SUCCESS,
            url: url,
          });
          ViewDocument(url);
        } else {
          dispatch({
            type: PREVIEW_DOCUMENT_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: PREVIEW_DOCUMENT_FAILED, message: error});
        console.log(error);
      });
  };
};

export const ResetState = () => {
  return dispatch => {
    dispatch({type: RESET_STATE});
  };
};
