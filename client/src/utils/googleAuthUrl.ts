import {
  VITE_URL_GOOGLE_ACCOUNT,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
} from '../constants';

const getGoogleAuthUrl = () => {
  const url = VITE_URL_GOOGLE_ACCOUNT;
  const query = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    prompt: 'consent',
    access_type: 'offline',
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};
export const googleOAuthUrl = getGoogleAuthUrl();
