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
  RESET_STATE,
  PREVIEW_DOCUMENT,
  PREVIEW_DOCUMENT_SUCCESS,
  PREVIEW_DOCUMENT_FAILED,
  FETCH_TRANSACTION_DETAILS_SUCCESS,
  FETCH_TRANSACTION_DETAILS_FAILED,
} from './constants';

const INITIAL_STATE = {
  error: '',
  loading: false,
  loadingImportantDates: false,
  loadingDocuments: false,
  loadingContacts: false,
  Stages: [],
  ImportantDates: [],
  Documents: [],
  Contacts: [],
  url: '',
  transactionDetails: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STAGES:
      return {...state, error: '', loading: true};
    case FETCH_STAGES_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        Stages: action.Stages,
      };
    case FETCH_STAGES_FAILED:
      return {...state, loading: false, error: action.message};
    case FETCH_IMPORTANT_DATES:
      return {...state, error: '', loadingImportantDates: true};
    case FETCH_IMPORTANT_DATES_SUCCESS:
      return {
        ...state,
        error: '',
        loadingImportantDates: false,
        ImportantDates: action.ImportantDates,
      };
    case FETCH_IMPORTANT_DATES_FAILED:
      return {...state, loadingImportantDates: false, error: action.message};
    case FETCH_DOCUMENTS:
      return {...state, error: '', loading: true};
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        Documents: action.payload,
      };
    case FETCH_DOCUMENTS_FAILED:
      return {...state, loading: false, error: action.message};
    case FETCH_CONTACTS:
      return {...state, error: '', loadingContacts: true};
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        error: '',
        loadingContacts: false,
        Contacts: action.Contacts,
      };
    case FETCH_CONTACTS_FAILED:
      return {...state, loadingContacts: false, error: action.message};
    case RESET_STATE:
      return {
        ...state,
        Stages: [],
        ImportantDates: [],
        Documents: [],
        Contacts: [],
        error: action.message,
      };
    case PREVIEW_DOCUMENT:
      return {...state, error: '', url: '', loading: true};
    case PREVIEW_DOCUMENT_SUCCESS:
      return {
        ...state,
        error: '',
        url: action.url,
        loading: false,
      };
    case PREVIEW_DOCUMENT_FAILED:
      return {...state, loading: false, url: '', error: action.message};

      case FETCH_TRANSACTION_DETAILS_SUCCESS:
      return {...state, loading: false, transactionDetails: action.details};
    case FETCH_TRANSACTION_DETAILS_FAILED:
      return {...state, loading: false, error: action.message};
      
    default:
      return state;
  }
};
