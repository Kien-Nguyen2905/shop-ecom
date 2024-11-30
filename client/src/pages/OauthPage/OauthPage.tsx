import { Navigate, useLocation } from 'react-router-dom';
import { ADMIN_PATHS, CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { showToast } from '../../libs';

const OauthPage = () => {
  const { search } = useLocation();
  // Extract query parameters from the URL using URLSearchParams
  const urlParams = new URLSearchParams(search);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');
  const role = urlParams.get('role');
  if (accessToken && refreshToken && role) {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(LOCAL_STORAGE.ROLE, role);
  } else {
    showToast({
      type: 'error',
      message: 'Failed',
    });
  }
  return (
    <Navigate to={role === '0' ? ADMIN_PATHS.ROOT : CUSTOMER_PATHS.ROOT} />
  );
};

export default OauthPage;
