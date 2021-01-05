import apisauce from 'apisauce';
// import {API_URL} from 'react-native-dotenv';

// const baseURL = API_URL;
const baseURL = 'https://api.dev.expetitle.com/api/v1';
const api = apisauce.create({
  baseURL,
  headers: {
    // token: COMPANY_TOKEN
  },
  timeout: 1000 * 60,
});
const Base = baseURL + `/documents/download?id=`; //${doc}&preview=true

const Login = body => api.post('/login', body);
const ResetPassword = body => api.post('/password/request', body);
const SearchQuery = (query, headers) =>
  api.get(`/search?q=${query}`, {}, api.setHeader('Authorization', headers));

const GetProfile = headers =>
  api.get(`/users/profile`, {}, api.setHeader('Authorization', headers));
const UpdateProfile = (body, headers) =>
  api.put(`/users/profile`, body, api.setHeader('Authorization', headers));
const ContactUs = (body, headers) =>
  api.post(`/users/contact-us`, body, api.setHeader('Authorization', headers));

const FetchProperties = (page, headers) =>
  api.get(
    `/transactions?page=${page}`,
    {},
    api.setHeader('Authorization', headers),
  );
const FetchStages = (id, headers) =>
  api.get(
    `/transactions/${id}/stages`,
    {},
    api.setHeader('Authorization', headers),
  );

const FetchImportantDates = (id, headers) =>
  api.get(`/dates/${id}`, {}, api.setHeader('Authorization', headers));

const FetchDocuments = (id, page, headers) =>
  api.get(
    `/transactions/${id}/documents?page=${page}`,
    {},
    api.setHeader('Authorization', headers),
  );

const FetchContacts = (id, headers) =>
  api.get(
    `/transactions/${id}/contacts`,
    {},
    api.setHeader('Authorization', headers),
  );

const FetchTransactionDetails = (id, headers) =>
  api.get(`/transactions/${id}`, {}, api.setHeader('Authorization', headers));

const DownloadDocument = (id, headers) =>
  api.get(
    `/documents/download?id=${id}&preview=${true}`,
    {},
    api.setHeader('Authorization', headers),
  );

const ShareUpdate = (transactionId, headers, body) =>
  api.post(
    `/transactions/${transactionId}/shareStatus`,
    body,
    api.setHeader('Authorization', headers),
  );

const VerifyCode = body => api.post(`/password/code`, body);

export default {
  Base,
  Login,
  ResetPassword,
  FetchProperties,
  FetchStages,
  FetchImportantDates,
  FetchDocuments,
  FetchContacts,
  DownloadDocument,
  VerifyCode,
  SearchQuery,
  ShareUpdate,
  GetProfile,
  UpdateProfile,
  ContactUs,
  FetchTransactionDetails
};
